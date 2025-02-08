import React, { useState } from 'react';
import './css/fqa.css'; // Import CSS file

const FAQ = () => {
  const faqData = [
    { question: 'How accurate is the HTML code generated from my hand-drawn sketches?', answer: 'Our advanced AI technology is designed to accurately interpret and convert your sketches into clean HTML code. While the accuracy is generally high, we provide customization options allowing you to fine-tune the generated code to perfectly match your needs.' },
    { question: 'What types of elements can I draw and convert to HTML?', answer: 'You can sketch a wide variety of HTML elements including buttons, forms, divs, headers, footers, menus, and more. If you have a specific design in mind, our tool is flexible enough to handle it.' },
    { question: 'Is my data secure when I upload sketches?', answer: 'Yes, your data security is our top priority. We use advanced encryption and security measures to ensure that your sketches and generated code are protected and kept private.' },
    { question: 'Can I edit the generated HTML code?', answer: 'Absolutely! Once your sketch is converted to HTML, you can edit and customize the code directly on our platform. This allows you to make any necessary adjustments to ensure the code meets your specific requirements.' },
    { question: 'What if the generated code doesn’t match my expectations?', answer: "We strive for high accuracy, but if the generated code doesn't fully meet your expectations, you can manually adjust it using our built-in editor. Additionally, our support team is available to assist you with any issues or adjustments needed to perfect your design." }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <h2>Frequently Asked Questions</h2><br></br><br></br>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <h3 className="question" onClick={() => handleClick(index)}>
              {`${index + 1}. ${item.question}`}
            </h3>
            <p className="answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
