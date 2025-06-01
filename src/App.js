// Responsive Portfolio App with 3D Carousel
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';

const carouselImages = ["/raso.png", "/chingu.png", "/linkedin.png", "/ww.png"];

const urls = [
  { href: "https://drive.google.com/file/d/1ovHVmMd_KzrpOUTDHHNLinjGCxAuEXr4/view?usp=drive_link", text: "Rasotsav", label: "Packaging Design" },
  { href: "https://drive.google.com/file/d/1smoCwsgsfOwxwbtr66sgXPV3fz9DLn_H/view", text: "Chingu", label: "Visual Identity Design" },
  { href: "https://drive.google.com/file/d/1J3GYr3fJaAQF8o1JdInRNzHHk4KnSbeY/view", text: "UI/UX Project", label: "LinkedIn App Redesign" },
  { href: "https://drive.google.com/file/d/1rV9u6ylwYNec1Qs6vBzVVNgHv12Y1WDN/view?usp=sharing", text: "Whisker Wheaties", label: "Food Branding Project" },
];

const radius = 250;
const slideCount = carouselImages.length;

const App = () => {
  const swiperRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [angle, setAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = carouselImages.length;
  const theta = 360 / total;

  const normalizeAngle = (angle) => {
    let a = angle % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    const slides = swiperRef.current.slides;

    for (let i = 0; i < slides.length; i++) {
      const baseAngle = (360 / slideCount) * i;
      const relativeAngle = normalizeAngle(baseAngle + rotationY);
      const scale = 0.7 + (1 - Math.abs(relativeAngle) / 180) * 0.3;
      const adjustedRadius = radius - Math.abs(relativeAngle) * 0.7;
      const opacity = 0.2 + (1 - Math.abs(relativeAngle) / 180) * 0.8;

      Object.assign(slides[i].style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "300px",
        height: "200px",
        margin: "-100px 0 0 -150px",
        backfaceVisibility: "hidden",
        transition: "transform 0.5s ease, opacity 0.5s ease",
        opacity,
        transform: `rotateY(${baseAngle}deg) translateZ(${adjustedRadius}px) scale(${scale})`,
        zIndex: Math.round(scale * 100),
        pointerEvents: scale > 0.85 ? "auto" : "none",
      });
    }

    Object.assign(swiperRef.current.wrapperEl.style, {
      transform: `translateZ(-${radius}px) rotateY(${rotationY}deg)`,
      transformStyle: "preserve-3d",
      transition: "transform 0.5s ease",
    });
  }, [slideCount, rotationY]);

  const goToIndex = (index) => {
    const newAngle = -theta * index;
    setAngle(newAngle);
    setCurrentIndex(index);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="title">
          <h1>Dnyaneshwari Mandape</h1>
          <p>Graphic Designer | Product Designer | Visual Communication</p>
        </div>
        <div className="icons" style={{display: "flex"}}>
          <a href="https://www.linkedin.com/in/dnyaneshwari-mandape-939015244/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
          <a href="mailto:sydnyaneshwari@gmail.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EA3323"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
        </div>
      </header>

      <section className="hero">
        <img src="https://cdn.dribbble.com/userupload/28117148/file/original-c0db2041822a946b9529b5ae1fdf08e8.gif" alt="Hero" />
      </section>

      <section className="projects">
        <h2>Design Projects</h2>
        <ul className="project-list">
          {urls.map((item, idx) => (
            <li key={idx} className="project-item">
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>
              <p style={{fontSize: "Larger"}}>- {item.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="carousel">
        <div className="carousel-wrapper" style={{ transform: `translateZ(-300px) rotateY(${angle}deg)` }}>
          {carouselImages.map((src, idx) => (
            <div
              key={idx}
              className="carousel-slide"
              style={{ transform: `rotateY(${idx * theta}deg) translateZ(300px)` }}
              onClick={() => window.open(urls[idx].href, "_blank")}
            >
              <img src={src} alt={`Slide ${idx}`} />
            </div>
          ))}
        </div>
        <div className="dots">
          {carouselImages.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => goToIndex(idx)}
            ></div>
          ))}
        </div>
      </section>

      <section className="footer">
        <div className="grid">
          <div>
            <h3>Education</h3>
            <p><strong>B.Design & Fashion Technology</strong><br />NSUT | 2021-2025</p>
            <p><strong>Higher Secondary</strong><br />KV School | 2019-2021</p>
            <p><strong>Primary & Middle</strong><br />KV School | 2007-2019</p>
          </div>
          <div>
            <h3>Experience</h3>
            <p><strong>Digit Insurance</strong><br />Bangalore | 5 months</p>
            <p><strong>Between Boxes</strong><br />Gurgaon | 2 months</p>
            <p><strong>Sanjh</strong><br />Gurgaon | 2 months</p>
          </div>
          <div>
            <h3>Design Skills</h3>
            <ul>
              <li>Photoshop</li>
              <li>Illustrator</li>
              <li>Figma</li>
              <li>Blender</li>
              <li>Animate</li>
              <li>Branding</li>
              <li>Storytelling</li>
            </ul>
          </div>
          <div>
            <h3>Associations</h3>
            <p><strong>Ashwamedh</strong><br />Production Designer</p>
            <p><strong>Kabaddi</strong><br />Gold at IIT BHU</p>
            <p><strong>TnP Cell</strong><br />Coordinator</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .app-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #fff;
          background: #fff;
          padding: 0 1rem;
          max-width: 1200px;
          margin: auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1.5px solid #ff91c8;
        }
        .title h1 { color: #ff91c8; font-size: 2rem; margin: 0; }
        .title p { font-size: 1.1rem; color: black; }
        .icons a { margin-left: 1rem; font-size: 1.5rem; text-decoration: none; }

        .hero img { width: 100%; max-height: 600px; object-fit: cover; margin-top: 30px; }

        .projects {
          background: url('/bg.jpeg') center/cover;
          padding: 3rem 1rem;
          border-radius: 8px;
          color: white;
          position: relative;
        }
        .projects::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(18, 18, 18, 0.85);
          border-radius: 8px;
        }
        .projects h2 {
          position: relative;
          color: #ff91c8;
          font-size: 2rem;
          text-align: center;
          z-index: 1;
        }
        .project-list {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          justify-content: center;
          align-items: center;
          gap: 1rem 10rem;
          list-style: none;
        }
        .project-item a {
          background: #222;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: #ff91c8;
          text-decoration: none;
          transition: 0.3s;
          font-size: Larger;
        }
        .project-item a:hover {
          background: #333;
          transform: scale(1.03);
        }
        .carousel {
          margin: 2rem auto;
          perspective: 800px;
          width: 100%;
          max-width: 600px;
        }
        .carousel-wrapper {
          width: 100%;
          height: 400px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s;
        }
        .carousel-slide {
          position: absolute;
          width: 280px;
          height: 220px;
          top: 50%;
          left: 50%;
          transform-origin: center;
          margin: -90px 0 0 -140px;
          transition: transform 1s;
          cursor: pointer;
        }
        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #888;
          cursor: pointer;
        }
        .dot.active {
          background: #000000;
        }

        .footer {
          // background: url('/bg.jpeg');
          background-color: rgba(18, 18, 18, 0.85);
          padding: 2rem 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }
        .footer h3 {
          color: #ff91c8;
          margin-bottom: 0.5rem;
        }
        .footer ul {
          list-style: none;
          padding: 0;
        }
        @media (max-width: 768px) {
          .title h1 { font-size: 1.5rem; }
          .hero img { height: auto; }
          .carousel-wrapper { height: 300px; }
          .carousel-slide { width: 250px; height: 150px; }
        }
      `}</style>
    </div>
  );
};

export default App;
