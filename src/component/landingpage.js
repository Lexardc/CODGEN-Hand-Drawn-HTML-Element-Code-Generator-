import React, { useEffect, useRef, useState } from 'react'; // Removed `negative` from import
import emailjs from 'emailjs-com';
import './css/LandingPage.css'; // Import CSS for styling
import image1 from "./imageforweb/img1.jpg"
import image2 from "./imageforweb/img2.webp"
import image3 from "./imageforweb/img3.jpg"
import image4 from "./imageforweb/fb.png"
import image5 from "./imageforweb/twitter.png"
import image6 from "./imageforweb/in.webp"
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FAQ from './faq';
function TypewriterEffect() {
    return (
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 90,
          strings: [
            "DISCOVER THE UTIMATE TOOL FOR WEB DEVELOPERS!",
            "A SERVICE THAT BRIDGES THE GAP B/W YOUR CREATIVITY & CODING SKILLS",
          ],
        }}
      />
    );
  }
  
const LandingPage = () => {
    const form = useRef();

    const [scrollDirection, setScrollDirection] = useState('down');
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navigate = useNavigate(); // Fix here
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
       
        
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
             
             
              infinite: true,
              dots: true,
            }
          },
        ]
      };
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > prevScrollY) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
  
        setPrevScrollY(currentScrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);
  
 

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = {
            to_name: 'Huzaifa', // Replace this with the actual recipient name if needed
            from_name: e.target.user_name.value,
            message: e.target.message.value,
        };

        emailjs.send("service_huzaifa", 'template_kbl872f', formData, '7_Dxx_PEinpbvdnRt')
            .then((result) => {
                console.log(result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                alert('An error occurred, please try again.');
            });

        e.target.reset();
    }; 
const nextpage =()=>{
navigate("/signin") // Fix here
}
 const handleNextPage=()=>{
    navigate("/about") 
 }
    return (
        <div className="landing-page">
        

        <div className="slider-wrapper">
       
        <Slider {...settings}>
            
          <div>
            <img src={image1} alt="Slide 1" className="slider-image" />
          </div>
          <div>
            <img src={image3} alt="Slide 2" className="slider-image" />
          </div>
          <div>
            <img src={image2} alt="Slide 3" className="slider-image" />
          </div>
          {/* <div>
            <img src="/images/p12.jpg" alt="Slide 4" className="slider-image" />
          </div> */}
        </Slider>
       
      </div>
      <div className="contntwraper">
      <nav className="navbar" >
                <ul>
                    <li className='logon'>ℂ𝕆𝔻𝔾𝔼ℕ</li>
                    <li><button className='btn1' onClick={() => scrollToSection('features') } >Features</button></li>
                    <li><button className='btn1'  onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
                    <li><button className='btn1' onClick={() => scrollToSection('faq')}>FAQ</button></li>
                    <li><button className='btn1' onClick={() => scrollToSection('about')}>About us</button></li>
                    <li><button className='btn1' onClick={() => scrollToSection('contact')}>Contact</button></li>
                </ul>
            </nav>
      </div>
      
      <div className="content-wrapper">
     
        <h1 className="text-center md:text-left md:ml-11" style={{ color: 'white', marginBottom: '10px' }}>
          WELCOME TO CODGEN
        </h1>
        <h2 className="text-center md:text-left md:ml-11" style={{ color: 'white', marginTop: '0px' }}>
          <TypewriterEffect />
        </h2><br></br>
        <button className="button" onClick={nextpage}><span>Get Started</span></button>
      </div>

            <main>
            <section id="features" className="features-section">
    <h2>Features</h2><br></br><br></br><br></br>
    <div className="features">
        <div className="feature">
            <img src={image1} alt="Feature 1" />
            <h3>Easy to Use:</h3>
            <p>Convert images to code with just a few clicks.</p>
        </div>
        <div className="feature">
            <img src={image2} style={{height:"200px"}}  alt="Feature 2" />
            <h3>Customizable Output:</h3>
            <p>Adjust settings to generate code that suits your needs.</p>
        </div>
        <div className="feature">
            <img src={image3} style={{height:"200px"}} alt="Feature 3" />
            <h3>Responsive Design:</h3>
            <p>Generated code is responsive and adapts to various 
              screen sizes.</p>
        </div>
    </div>
</section>
<hr ></hr>







                <section id="testimonials" class="testimonials-section">
                <br></br><br></br>
                    <h2><b>Testimonials</b></h2><br></br><br></br><br></br><br></br><br></br><br></br>
                    <div class="testimonials-wrapper">
                        <div class="testimonials">
                            <div class="testimonial">
                                <div class="testimonial-card">
                                    <p>"This tool saved me so much time!"</p><br></br>
                                    <h4>- Fahad</h4>
                                </div>
                            </div>
                            <div class="testimonial">
                                <div class="testimonial-card">
                                    <p>"Highly recommend for anyone needing quick code generation."</p>
                                    <h4>- Haider</h4>
                                </div>
                            </div>
                            <div class="testimonial">
                                <div class="testimonial-card">
                                    <p>"The responsive design feature is a game-changer."</p>
                                    <h4>- Huzaifa</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr></hr>
                <setion id="faq"><FAQ/></setion>

               
            </main>
            <section id="about" className="about-section">
            <hr></hr><br></br>
                <div className="about-content">
                   <h2>About Us</h2>
                     <p>
                        <strong>Transform Your Hand-Drawn Designs into Stunning HTML Code</strong><br/>
            Welcome to <em>CodGen</em>, the ultimate tool for web designers and developers! Have you ever found yourself sketching out website elements on a piece of paper, only to struggle when converting those ideas into actual code? We understand the pain, and that's why we've created a revolutionary service that bridges the gap between your creativity and coding skills.
        </p>
        <button onClick={handleNextPage} className="read-more-button">Read More...</button><br></br><br></br><br></br><br></br>
    </div>
</section>
<br></br><br></br><br></br><br></br><br></br>
<section id="contact" className="contact-section">
                  <h2>Contact Us</h2>
                    
                    <div className='contct'>
                     <h4>EMAIL: </h4><a href='https://mail.google.com/mail'>haiderali3647@gmail.com</a><hr></hr>
                   <h4>DEV Address:</h4>  <a href='https://case.edu.pk/'>Sir Syed CASE Institute of Technology</a><hr></hr>
                    <h4>PHONE:</h4> <a href='#'>+92 317 577 9587</a><hr></hr>
                    <a href='https://www.facebook.com/'><img src={image4} alt="Sl" className="logo" /></a>
                    <a href='https://www.twitter.com/'><img src={image5} alt="Sl" className="logo" /></a>
                    <a href='https://www.linkedin.com/'><img src={image6} alt="Sl" className="logo1" /></a>
                    </div>
                    <div class="vl"></div>
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>

                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="user_name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="user_email" required />
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                        <button type="submit" className="cta-button">Send Message</button>
                    </form>
                </section>

            <footer>
                <p>&copy; 2024 Image to Code Generator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
