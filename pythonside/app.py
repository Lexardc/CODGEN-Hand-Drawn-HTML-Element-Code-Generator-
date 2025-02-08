from flask import Flask, request
from flask_cors import CORS
from PIL import Image, ImageOps
import numpy as np
import yaml
import io
import cv2
from ultralytics import YOLO
import easyocr

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO("./src/model/best.pt")

# Load the labels from YAML file
with open("./src/model/data.yaml", "r") as file:
    data = yaml.safe_load(file)
class_names = data['names']

# Initialize EasyOCR
reader = easyocr.Reader(['en'])

# Define HTML elements
html_elements = {
    'button': '<button>Click me</button>',
    'checkbox': '<input type="checkbox" id="checkbox"><label for="checkbox">Checkbox</label>',
    'icon-button': '<button class="icon-button"><i class="fas fa-icon"></i></button>',
    'image': '<img src="image.jpg" alt="Description of the image">',
    'input': '<input type="text" placeholder="Enter text here">',
    'label': '<label for="input">Text</label><input type="text" id="input">',
    'link': '<a href="https://example.com">Link text</a>',
    'number-input': '<input type="number" placeholder="Enter a number">',
    'slider': '<input type="range" min="0" max="100" value="50">',
    'table': '<table border="1"><tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td><td>Row 1, Cell 3</td><td>Row 1, Cell 4</td></tr><tr><td>Row 2, Cell 1</td><td>Row 2, Cell 2</td><td>Row 2, Cell 3</td><td>Row 2, Cell 4</td></tr><tr><td>Row 3, Cell 1</td><td>Row 3, Cell 2</td><td>Row 3, Cell 3</td><td>Row 3, Cell 4</td></tr><tr><td>Row 4, Cell 1</td><td>Row 4, Cell 2</td><td>Row 4, Cell 3</td><td>Row 4, Cell 4</td></tr></table>',
}

# Define the default HTML template
default_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Output</title>
</head>
<body>
    <div>
        <h1>Output</h1>
        {detected_objects}
        {detected_text}
    </div>
</body>
</html>
"""

@app.route('/detect_objects', methods=['POST'])
def detect_objects_and_text():
    # Get the image from the request
    image_data = request.files['image']
    image = Image.open(io.BytesIO(image_data.read()))

    # Resizing the image to fit the model's input requirements
    size = (640, 640)  # YOLOv8 default size
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # Convert PIL image to OpenCV format
    image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # Object detection using YOLOv8
    results = model(image_cv)

    # Text recognition using EasyOCR
    detected_text = reader.readtext(np.array(image))

    # Prepare object detection results
    detected_objects = []
    html_codes = []

    for result in results:
        for det in result.boxes.data:
            x1, y1, x2, y2, confidence, class_id = det[:6]
            confidence = float(confidence)

            # Skip detections with confidence score less than 75%
            if confidence < 0.75:
                continue

            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            class_id = int(class_id)
            class_name = class_names[class_id].strip()

            # Check if the detected class name is in the list of HTML elements
            html_code = html_elements.get(class_name, "")

            # Append detected object to results
            detected_objects.append({
                'class': class_name,
                'confidence': confidence,
                'bbox': [x1, y1, x2, y2],
                'html_code': html_code
            })

            # Collect all HTML codes
            if html_code:
                html_codes.append(html_code)

    # Prepare text recognition results
    detected_text_output = []
    for text in detected_text:
        detected_text_output.append(text[1])

    # Populate default template with detected objects' HTML codes and detected text
    detected_objects_html = '\n'.join(html_codes)
    detected_text_html = '\n'.join(['<p>{}</p>'.format(text) for text in detected_text_output])

    # Combine object detection and text recognition results in sequence
    combined_response = detected_objects_html + detected_text_html

    # Populate default template with combined response
    html_response = default_template.format(detected_objects=combined_response, detected_text="")

    return html_response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)  # Run the Flask app
