import React from 'react';
import { 
  WordReveal, 
  CharReveal, 
  FadeSlide, 
  ScaleReveal, 
  ClipReveal,
  AdvancedTextReveal 
} from '../components/TextReveal';
import './GSAPDemo.css';

const GSAPDemo = () => {
  return (
    <div className="gsap-demo">
      {/* Hero Section */}
      <section className="demo-section hero-demo">
        <div className="container">
          <CharReveal 
            stagger={0.03}
            duration={1}
            ease="power4.out"
          >
            <h1 className="demo-title">GSAP Text Reveal</h1>
          </CharReveal>
          <WordReveal 
            stagger={0.08}
            duration={0.8}
            start="top 80%"
          >
            <p className="demo-subtitle">Advanced scroll-based text animations for your e-commerce store</p>
          </WordReveal>
        </div>
      </section>

      {/* Character Reveal Demo */}
      <section className="demo-section">
        <div className="container">
          <h2 className="section-title">Character-by-Character Reveal</h2>
          <CharReveal 
            className="demo-text large-text"
            stagger={0.02}
            duration={0.8}
            start="top 75%"
          >
            Character reveals add dramatic flair to your headings
          </CharReveal>
        </div>
      </section>

      {/* Word Reveal Demo */}
      <section className="demo-section">
        <div className="container">
          <h2 className="section-title">Word-by-Word Reveal</h2>
          <WordReveal 
            className="demo-text"
            stagger={0.06}
            duration={1}
            start="top 75%"
          >
            <h3>Premium quality products delivered with excellence and care</h3>
          </WordReveal>
        </div>
      </section>

      {/* Fade Slide Demo */}
      <section className="demo-section">
        <div className="container">
          <h2 className="section-title">Fade & Slide Animations</h2>
          
          <FadeSlide 
            direction="up" 
            distance={60} 
            duration={1}
            start="top 80%"
          >
            <div className="demo-card">
              <h3>Slide from Bottom</h3>
              <p>Content fades in while sliding upward smoothly</p>
            </div>
          </FadeSlide>

          <FadeSlide 
            direction="left" 
            distance={80} 
            duration={1}
            start="top 80%"
          >
            <div className="demo-card">
              <h3>Slide from Right</h3>
              <p>Elements enter from the right side of the screen</p>
            </div>
          </FadeSlide>

          <FadeSlide 
            direction="down" 
            distance={60} 
            duration={1}
            start="top 80%"
          >
            <div className="demo-card">
              <h3>Slide from Top</h3>
              <p>Components descend gracefully into view</p>
            </div>
          </FadeSlide>
        </div>
      </section>

      {/* Scale Reveal Demo */}
      <section className="demo-section dark-section">
        <div className="container">
          <WordReveal 
            stagger={0.05}
            duration={0.8}
          >
            <h2 className="section-title">Scale Reveal Animations</h2>
          </WordReveal>
          
          <ScaleReveal 
            scale={0.6} 
            duration={1.2} 
            stagger={0.15}
            ease="back.out(2)"
            start="top 80%"
          >
            <div className="demo-grid">
              <div className="demo-box">
                <div className="icon">🚀</div>
                <h3>Fast</h3>
                <p>Lightning-fast animations</p>
              </div>
              <div className="demo-box">
                <div className="icon">🎨</div>
                <h3>Beautiful</h3>
                <p>Stunning visual effects</p>
              </div>
              <div className="demo-box">
                <div className="icon">⚡</div>
                <h3>Smooth</h3>
                <p>Buttery smooth performance</p>
              </div>
              <div className="demo-box">
                <div className="icon">✨</div>
                <h3>Modern</h3>
                <p>Contemporary design patterns</p>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </section>

      {/* Clip Reveal Demo */}
      <section className="demo-section">
        <div className="container">
          <h2 className="section-title">Clip Path Reveals</h2>
          
          <ClipReveal 
            direction="left" 
            duration={1.5}
            ease="power4.inOut"
            start="top 75%"
          >
            <div className="clip-demo-box clip-left">
              <h3>Left to Right Reveal</h3>
              <p>Content unveils from left to right using clip-path animation</p>
            </div>
          </ClipReveal>

          <ClipReveal 
            direction="right" 
            duration={1.5}
            ease="power4.inOut"
            start="top 75%"
          >
            <div className="clip-demo-box clip-right">
              <h3>Right to Left Reveal</h3>
              <p>Elements appear from right to left with smooth clipping</p>
            </div>
          </ClipReveal>

          <ClipReveal 
            direction="top" 
            duration={1.5}
            ease="power4.inOut"
            start="top 75%"
          >
            <div className="clip-demo-box clip-top">
              <h3>Top to Bottom Reveal</h3>
              <p>Components slide down revealing from top</p>
            </div>
          </ClipReveal>

          <ClipReveal 
            direction="bottom" 
            duration={1.5}
            ease="power4.inOut"
            start="top 75%"
          >
            <div className="clip-demo-box clip-bottom">
              <h3>Bottom to Top Reveal</h3>
              <p>Content rises up revealing from bottom</p>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Combined Effects */}
      <section className="demo-section combined-section">
        <div className="container">
          <ClipReveal 
            direction="left" 
            duration={1.2}
            start="top 70%"
          >
            <div className="combined-box">
              <WordReveal 
                stagger={0.05}
                duration={1}
              >
                <h2>Combined Animations</h2>
              </WordReveal>
              <FadeSlide 
                direction="up" 
                distance={30} 
                duration={0.8}
              >
                <p>Mix and match different animation types for unique effects</p>
              </FadeSlide>
              <ScaleReveal 
                scale={0.8} 
                duration={0.6}
                stagger={0.1}
              >
                <div className="button-group">
                  <button className="demo-btn primary">Get Started</button>
                  <button className="demo-btn secondary">Learn More</button>
                </div>
              </ScaleReveal>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="demo-section cta-demo">
        <div className="container">
          <FadeSlide 
            direction="up" 
            distance={50} 
            duration={1.2}
          >
            <CharReveal 
              stagger={0.02}
              duration={1}
            >
              <h2 className="cta-title">Ready to Enhance Your Store?</h2>
            </CharReveal>
            <WordReveal 
              stagger={0.06}
              duration={0.8}
            >
              <p className="cta-text">Implement these animations in your e-commerce site today</p>
            </WordReveal>
            <ScaleReveal 
              scale={0.9} 
              duration={0.6}
            >
              <button className="cta-button">Start Building</button>
            </ScaleReveal>
          </FadeSlide>
        </div>
      </section>
    </div>
  );
};

export default GSAPDemo;
