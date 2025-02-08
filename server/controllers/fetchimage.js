import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && (
        <div>
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
