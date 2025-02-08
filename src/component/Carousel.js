import React, { useState, useEffect } from 'react';
import './css/Carousel.css';
import slide1 from './imageforweb/sss.webp';
import slide2 from './imageforweb/html4.jpg';
import slide3 from './imageforweb/html3.jpg';
import slide4 from './imageforweb/image55.jpg';
import slide5 from './imageforweb/image44.webp';

const images = [
  { src: slide1, caption: "Slide 1 Caption" },
  { src: slide2, caption: "Slide 2 Caption" },
  { src: slide3, caption: "Slide 3 Caption" },
  { src: slide4, caption: "Slide 4 Caption" },
  { src: slide5, caption: "Slide 5 Caption" }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [isPaused]);

  useEffect(() => {
    console.log("Current Index:", currentIndex); // Debug statement to check currentIndex changes
  }, [currentIndex]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-content">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image.src} alt={`Slide ${index}`} className="carousel-image" />
            <div className="carousel-text">
              <h2>{image.caption}</h2>
              <div className="cta-container">
                <button className="button">
                  <span>Get Started</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
