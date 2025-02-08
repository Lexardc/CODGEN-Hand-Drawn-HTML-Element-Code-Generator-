// About.js
import React from 'react';
import './css/about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate= useNavigate();
    const nextpage =()=>{
        navigate("/signin")
    }
  return (
    <div className="about-secton">
      <div className="content">
        <h1>Transform Your Hand-Drawn Designs into Stunning HTML Code</h1>
        <p>
          Welcome to <span className="highlight">Sketch2HTML</span>, the ultimate tool for web designers and developers! Have you ever found yourself sketching out website elements on a piece of paper, only to struggle when converting those ideas into actual code? We understand the pain, and that's why we've created a revolutionary service that bridges the gap between your creativity and coding skills.
        </p>

        <h2>How It Works</h2>
        <p>
          <strong>Sketch2HTML</strong> seamlessly transforms your hand-drawn HTML elements into fully functional HTML code. Here’s how simple it is:
        </p>
        <ul>
          <li><strong>Draw Your Elements</strong>: Sketch out the HTML elements you need—buttons, forms, divs, headers, footers, and more—on paper or digitally.</li>
          <li><strong>Upload Your Sketch</strong>: Take a photo of your hand-drawn elements or upload your digital drawing to our platform.</li>
          <li><strong>Get Instant HTML Code</strong>: Our advanced AI technology analyzes your sketches and generates clean, responsive HTML code in seconds.</li>
        </ul>

        <h2>Features</h2>
        <ul>
          <li><strong>Intuitive Interface</strong>: Our user-friendly platform ensures you can upload and manage your sketches effortlessly.</li>
          <li><strong>Accurate Code Generation</strong>: Leveraging cutting-edge AI, we provide precise HTML code that mirrors your designs perfectly.</li>
          <li><strong>Customization Options</strong>: Edit and fine-tune the generated code directly on our platform to suit your exact needs.</li>
          <li><strong>Responsive Designs</strong>: All code generated is optimized for responsiveness, ensuring your elements look great on any device.</li>
          <li><strong>Secure and Private</strong>: Your designs are important to us. We ensure top-notch security and privacy for all uploaded sketches and generated code.</li>
        </ul>

        <h2>Why Choose Sketch2HTML?</h2>
        <ul>
          <li><strong>Save Time</strong>: Eliminate the tedious process of manual coding from sketches.</li>
          <li><strong>Boost Productivity</strong>: Focus more on creativity and less on coding.</li>
          <li><strong>Enhance Creativity</strong>: Easily bring your innovative designs to life.</li>
          <li><strong>Perfect for All Skill Levels</strong>: Whether you’re a seasoned developer or a newbie, our service is designed to assist you at every step.</li>
        </ul>

        <h2>Get Started Today</h2>
        <p>
          Transform your sketches into stunning, functional web elements with <strong>Sketch2HTML</strong>. Sign up now and experience the future of web design and development!
        </p>

        <p>
          Ready to turn your hand-drawn dreams into digital reality? Visit our <a href="#sign-up">Sign-Up Page</a> to get started! If you have any questions or need assistance, our support team is here to help.
        </p>

        <p>
          <strong>Sketch2HTML</strong> – Bridging Creativity and Code, One Sketch at a Time.
        </p>

        <button className="cta-button" onClick={nextpage}>Get Started</button>
      </div>
    </div>
  );
};

export default About;
