import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductStory.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProductStory Component
 * Cinematic product storytelling with GSAP pinning and sequential animations
 * Apple-style product reveal experience
 */

const ProductStory = ({ product }) => {
  const storyRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Scene 1: Product Introduction (0-25%)
      tl.from(imageRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(backgroundRef.current, {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        duration: 0.5,
      }, '-=0.4');

      // Scene 2: Product Rotation & Zoom (25-50%)
      tl.to(imageRef.current, {
        scale: 1.3,
        rotation: 5,
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
      }, '-=0.8');

      // Scene 3: Features Sequential Reveal (50-100%)
      product.features.forEach((feature, index) => {
        const featureEl = featuresRef.current[index];
        if (!featureEl) return;

        // Feature entrance
        tl.from(featureEl, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })
        // Image transform for each feature
        .to(imageRef.current, {
          scale: 1.2 + (index * 0.1),
          rotation: index % 2 === 0 ? -3 : 3,
          duration: 0.4,
          ease: 'power2.inOut',
        }, '-=0.4')
        // Background color transition
        .to(backgroundRef.current, {
          background: `linear-gradient(135deg, ${getFeatureColor(index)} 0%, ${getFeatureColor(index + 1)} 100%)`,
          duration: 0.3,
        }, '-=0.3')
        // Feature exit (except last)
        if (index < product.features.length - 1) {
          tl.to(featureEl, {
            opacity: 0,
            scale: 0.9,
            y: -30,
            duration: 0.4,
          });
        }
      });

      // Scene 4: Final CTA (100%)
      tl.to(imageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .to('.story-cta', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');

    }, storyRef);

    return () => ctx.revert();
  }, [product]);

  // Helper function for background colors
  const getFeatureColor = (index) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#4facfe', 
      '#43e97b', '#fa709a', '#ffd89b', '#667eea'
    ];
    return colors[index % colors.length];
  };

  return (
    <div ref={storyRef} className="product-story">
      <div ref={containerRef} className="story-container">
        <div ref={backgroundRef} className="story-background"></div>

        {/* Product Image */}
        <div className="story-image-wrapper">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className="story-image"
          />
        </div>

        {/* Product Title */}
        <div ref={titleRef} className="story-title-wrapper">
          <h1 className="story-title">{product.name}</h1>
          <p className="story-subtitle">{product.tagline}</p>
        </div>

        {/* Features - Sequential Reveals */}
        <div className="story-features">
          {product.features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRef.current[index] = el)}
              className="story-feature"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="story-cta">
          <h2>Experience {product.name}</h2>
          <p className="cta-price">${product.price}</p>
          <button className="cta-button" aria-label={`Buy ${product.name}`}>
            <span>Buy Now</span>
            <span className="button-arrow">→</span>
          </button>
          <p className="cta-subtext">Free shipping • 2-year warranty</p>
        </div>
      </div>
    </div>
  );
};

/**
 * ProductStorySection Component
 * Multiple product stories in sequence
 */
export const ProductStorySection = ({ products }) => {
  return (
    <div className="product-stories">
      {products.map((product) => (
        <ProductStory key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductStory;
