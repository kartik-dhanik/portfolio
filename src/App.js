import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";

const carouselImages = [
  "/raso.png",
  "/chingu.png",
  "/linkedin.png",
  "/ww.png",
];

const urls = [
  {
    href: "https://drive.google.com/file/d/1ovHVmMd_KzrpOUTDHHNLinjGCxAuEXr4/view?usp=drive_link",
    text: "Rasotsav",
    label: "Packaging Design"
  },
  {
    href: "https://drive.google.com/file/d/1smoCwsgsfOwxwbtr66sgXPV3fz9DLn_H/view",
    text: "Chingu",
    label: "Visual Identity Design"
  },
  {
    href: "https://drive.google.com/file/d/1J3GYr3fJaAQF8o1JdInRNzHHk4KnSbeY/view",
    text: "UI/UX Project",
    label: "LinkedIn App Redesign"
  },
  {
    href: "https://drive.google.com/file/d/1rV9u6ylwYNec1Qs6vBzVVNgHv12Y1WDN/view?usp=sharing",
    text: "Whisker Wheaties",
    label: "Food Branding Project"
  },
]

const radius = 250;
const slideCount = carouselImages.length;

const App = () => {
  const swiperRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);

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

      slides[i].style.position = "absolute";
      slides[i].style.top = "50%";
      slides[i].style.left = "50%";
      slides[i].style.width = "300px";
      slides[i].style.height = "200px";
      slides[i].style.margin = "-100px 0 0 -150px";
      slides[i].style.backfaceVisibility = "hidden";
      slides[i].style.transition = "transform 0.5s ease, opacity 0.5s ease";
      slides[i].style.opacity = opacity;
      slides[i].style.transform = `
        rotateY(${baseAngle}deg)
        translateZ(${adjustedRadius}px)
        scale(${scale})
      `;
      slides[i].style.zIndex = Math.round(scale * 100);
      slides[i].style.pointerEvents = scale > 0.85 ? "auto" : "none";
    }

    swiperRef.current.wrapperEl.style.transform = `translateZ(-${radius}px) rotateY(${rotationY}deg)`;
    swiperRef.current.wrapperEl.style.transformStyle = "preserve-3d";
    swiperRef.current.wrapperEl.style.transition = "transform 0.5s ease";
  }, [slideCount, rotationY]);

  const [angle, setAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = carouselImages.length;
  const theta = 360 / total;

  const goToIndex = (index) => {
    const newAngle = -theta * index;
    setAngle(newAngle);
    setCurrentIndex(index);
  };
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff",
        backgroundColor: "#fff",
        padding: "0 1rem",
        maxWidth: 1200,
        margin: "auto",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 0",
          alignItems: "center",
          borderBottom: "1.5px solid #ff91c8", // soft pink border for style
          marginBottom: "1.5rem", // optional spacing after header
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2rem", color: "#ff91c8" }}>
            Dnyaneshwari Mandape
          </h1>
          <p style={{fontFamily: "Poppins", fontSize: "21px", color: "black", marginTop: "-12px" }}>Graphic Designer | Product Designer | Visual Communication</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="https://www.linkedin.com/in/dnyaneshwari-mandape-939015244/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
              fill="#0077b5"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 
         5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
         19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 
         1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 
         1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 
         0-2.16 1.46-2.16 2.96v5.7h-3v-10h2.88v1.36h.04c.4-.75 
         1.38-1.54 2.84-1.54 3.03 0 3.59 1.99 3.59 
         4.58v5.6z"/>
            </svg>
          </a>
          <a
            href="mailto:sydnyaneshwari@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email via Gmail"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              fill="#D93025"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </header>


      {/* Hero Section */}
      <section style={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}>
        <img
          src="https://cdn.dribbble.com/userupload/28117148/file/original-c0db2041822a946b9529b5ae1fdf08e8.gif"
          alt="Hero Animation"
          style={{ width: "100%", height: "650px" }}
        />
      </section>

      {/* Projects Section */}
      <section
        style={{
          // backgroundColor: "#121212",
          backgroundImage: "url('/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "3rem 1rem",
          borderRadius: 8,
          height: "360px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Optional dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(18, 18, 18, 0.85)", // adjusts brightness
            borderRadius: 8,
            zIndex: 2,
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 3 }}>
          <h2
            style={{
              color: "#ff91c8",
              fontWeight: "bold",
              fontSize: "2.6rem",
              marginBottom: 24,
              textAlign: "center",
              marginTop: "-10px",
            }}
          >
            Design Projects
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: 62,
              flexWrap: "wrap",
            }}
          >
            <div>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  color: "#fff",
                  fontSize: "1.6rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3rem 20rem",
                }}
              >
                {urls.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ff91c8",
                        textDecoration: "none",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#222",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "row",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#333";
                        e.currentTarget.style.transform = "scale(1.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#222";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {item.text}
                    </a>
                    <p
                      style={{
                        marginTop: "0px",
                        fontSize: "1.6rem",
                        fontWeight: "500",
                        color: "#f0f0f0",
                        letterSpacing: "0.5px",
                        marginBottom: "0.5rem",
                        lineHeight: "1.4",
                      }}
                    >
                      - {item.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <div style={{display: "flex", width: "100%"}}>
        <img src="/jury.png"></img>
      </div> */}
      {/* 3D Styled Carousel Section */}

      <section style={{ marginTop: -36, marginBottom: 48 }}>
        <div
          style={{
            width: "600px",
            height: "400px",
            margin: "auto",
            perspective: "1260px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `translateZ(-300px) rotateY(${angle}deg)`,
              transition: "transform 1s",
            }}
          >
            {carouselImages.map((src, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "110px",
                  width: "380px",
                  height: "300px",
                  transform: `rotateY(${idx * theta}deg) translateZ(300px)`,
                  transition: "transform 1s",
                }}
                onClick={() => window.open(`${urls[idx].href}`, "_blank")}
              >
                <img
                  src={src}
                  alt={`Slide ${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    userSelect: "none",
                    pointerEvents: "none",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Dot Navigation */}
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
            }}
          >
            {carouselImages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => goToIndex(idx)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: currentIndex === idx ? "#ff91c8" : "#888",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <br />
      {/* Footer / Info Section */}
      <section style={{
        borderTop: "1px solid #444",
        // padding: "2rem 1rem",
        // backgroundColor: "#000",
        backgroundImage: "url('/bg.jpeg')",
        // backgroundColor: "rgba(18, 18, 18, 0.85)", // adjusts brightness
      }}>
        <div style={styles.infoGrid}>
          {/* Education */}
          <div style={{ paddingLeft: "16px" }}>
            <h3 style={styles.infoHeading}>Education</h3>
            <p>
              <strong>B.Design & Fashion Technology</strong>
              <br />
              Netaji Subhash University of Technology | 2021-2025
            </p>
            <p>
              <strong>Higher Secondary</strong> (Science)
              <br />
              Kendriya Vidyalaya School | 2019-2021
            </p>
            <p>
              <strong>Primary & Middle School</strong>
              <br />
              Kendriya Vidyalaya School | 2007-2019
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 style={styles.infoHeading}>Experience</h3>
            <p>
              <strong>Digit Insurance</strong> (branding, marketing)
              <br />
              Bangalore (in office) | 5 months
            </p>
            <p>
              <strong>Between Boxes</strong> (product design)
              <br />
              Gurgaon | 2 months
            </p>
            <p>
              <strong>Sanjh</strong> (design intern)
              <br />
              Gurgaon | 2 months
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 style={styles.infoHeading}>Design Skills</h3>
            <ul style={{
              listStyleType: "none",
              paddingLeft: 0,
              color: "#fff",
              fontSize: "1rem",
            }}>
              <li>Adobe Photoshop</li>
              <li>Adobe Illustrator</li>
              <li>Figma</li>
              <li>Blender</li>
              <li>Adobe Animate</li>
              <li>Brand identity design</li>
              <li>Digital storytelling</li>
              <li>Adobe Creative Suite</li>
              <li>Graphic illustration</li>
              <li>Branding and logo design</li>
            </ul>
          </div>

          {/* Associations */}
          <div>
            <h3 style={styles.infoHeading}>Associations</h3>
            <p>
              <strong>Ashwamedh</strong> (Dramatics Society)
              <br />
              Production Designer
            </p>
            <p>
              <strong>Kabaddi</strong> (Sports)
              <br />
              Gold Medalist at IIT BHU
            </p>
            <p>
              <strong>Training & Placement Cell</strong> (TnP)
              <br />
              Placement Coordinator
            </p>
          </div>

          {/* Languages, Competitions, More of Me */}
          {/* <div>
            <h3 style={styles.infoHeading}>Languages</h3>
            <p>English | Marathi | Hindi</p>
            <h3 style={styles.infoHeading}>Competitions</h3>
            <p>
              <strong>IIT Delhi</strong> (Rendevous)
              <br />
              Placed 3rd | Graphic Design Marathon
            </p>
            <p>
              <strong>LSR</strong> (Tarang)
              <br />
              Placed 2nd | Digital Art Competition
            </p>
            <p>
              <strong>Heritage</strong> (Youthopia)
              <br />
              Placed 1st | Ad-Making Competition
            </p>
            <h3 style={styles.infoHeading}>More of Me</h3>
            <p>Art | Photography | Kathak</p>
          </div> */}
        </div>
      </section>
    </div>)
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    backgroundColor: "#fff",
    padding: "0 1rem",
    maxWidth: 1200,
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#ff91c8",
  },
  socialIcons: {
    display: "flex",
    gap: 16,
  },
  iconLink: {
    color: "#000",
    fontSize: "1.3rem",
    textDecoration: "none",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 32,
    // backgroundColor: "#000"

    backgroundColor: "rgba(18, 18, 18, 0.85)", // adjusts brightness

  },
  infoHeading: {
    color: "#ff91c8",
    fontWeight: "700",
    marginBottom: 12,
  },
};

export default App
