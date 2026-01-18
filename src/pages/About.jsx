import { WordReveal, FadeSlide, ScaleReveal, ClipReveal } from '../components/TextReveal'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <FadeSlide 
          direction="up" 
          distance={60} 
          duration={1.2}
          start="top 70%"
        >
          <div className="about-hero">
            <WordReveal 
              stagger={0.08}
              duration={1}
              ease="power4.out"
            >
              <h1>About PremiumStore</h1>
            </WordReveal>
            <p className="hero-subtitle">Your trusted destination for premium products</p>
          </div>
        </FadeSlide>

        <section className="about-section">
          <ClipReveal 
            direction="left" 
            duration={1.2}
            start="top 75%"
          >
            <div className="about-content">
              <WordReveal 
                stagger={0.04}
                duration={0.8}
              >
                <h2>Our Story</h2>
              </WordReveal>
              <FadeSlide 
                direction="up" 
                distance={30} 
                duration={0.9}
                stagger={0.3}
              >
                <p>
                  PremiumStore was founded with a simple mission: to bring you the finest products 
                  that combine quality, style, and innovation. We curate every item in our collection 
                  to ensure it meets our high standards of excellence.
                </p>
                <p>
                  Since our inception, we've been committed to providing an exceptional shopping 
                  experience. From cutting-edge electronics to premium accessories, we carefully 
                  select products that enhance your lifestyle and exceed your expectations.
                </p>
              </FadeSlide>
            </div>
          </ClipReveal>
        </section>

        <section className="values-section">
          <FadeSlide 
            direction="up" 
            distance={40} 
            duration={1}
          >
            <WordReveal 
              stagger={0.06}
              duration={0.8}
            >
              <h2>Our Values</h2>
            </WordReveal>
          </FadeSlide>
          <ScaleReveal 
            scale={0.7} 
            duration={1} 
            stagger={0.15}
            ease="back.out(1.5)"
            start="top 80%"
          >
            <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality First</h3>
              <p>We never compromise on quality. Every product is carefully vetted to ensure it meets our premium standards.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority. We're committed to providing exceptional service and support.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We stay ahead of trends to bring you the latest and greatest products in the market.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We're committed to sustainable practices and partner with eco-conscious brands.</p>
            </div>
          </div>
          </ScaleReveal>
        </section>

        <section className="stats-section">
          <ScaleReveal 
            scale={0.5} 
            duration={1.2} 
            stagger={0.2}
            ease="back.out(2)"
            start="top 80%"
          >
            <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Premium Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
          </ScaleReveal>
        </section>

        <section className="team-section">
          <FadeSlide 
            direction="up" 
            distance={40} 
            duration={1}
          >
            <WordReveal 
              stagger={0.06}
              duration={0.8}
            >
              <h2>Why Choose Us?</h2>
            </WordReveal>
          </FadeSlide>
          <FadeSlide 
            direction="up" 
            distance={30} 
            duration={0.8}
            stagger={0.12}
            start="top 85%"
          >
            <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>Curated Selection</h3>
                <p>Every product is handpicked by our team of experts</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>Fast Shipping</h3>
                <p>Free shipping on orders over $100, delivered to your door</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>Easy Returns</h3>
                <p>30-day hassle-free return policy on all products</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>24/7 Support</h3>
                <p>Our customer service team is always here to help</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>Secure Payment</h3>
                <p>Your payment information is always protected</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <h3>Warranty Included</h3>
                <p>All products come with manufacturer warranty</p>
              </div>
            </div>
          </div>
          </FadeSlide>
        </section>
      </div>
    </div>
  )
}

export default About

