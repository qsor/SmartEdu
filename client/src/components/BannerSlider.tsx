import React, { useState, useEffect } from "react";
import styles from "../styles/BannerSlider.module.css";

interface Slide {
  title: string;
  subtitle: string;
}

interface BannerSliderProps {
  logoUrl: string;
  slides: Slide[];
  interval?: number;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ logoUrl, slides, interval = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerVisualContent} key={currentSlide}>
        <img src={logoUrl} alt="Logo" className={styles.bannerLogo} />
        <div className={styles.bannerTextContainer}>
          <h2 className={styles.bannerMainTitle}>
            {slides[currentSlide].title}
          </h2>
          <p className={styles.bannerSubTitle}>
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>
      
      <div className={styles.bannerDots}>
        {slides.map((_, index) => (
          <span 
            key={index}
            className={index === currentSlide ? styles.dotActive : styles.dot}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;