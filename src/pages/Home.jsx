import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { WordReveal, FadeSlide, ScaleReveal, ClipReveal } from '../components/TextReveal'
import './Home.css'

const Home = () => {
  const { addToCart } = useCart()
  const featuredProducts = products.slice(0, 8)

  const handleQuickAdd = (e, product) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <WordReveal 
              className="hero-title" 
              stagger={0.08}
              duration={1}
              ease="power4.out"
              start="top 70%"
            >
              <h1>
                Welcome to <span className="gradient-text">PremiumStore</span>
              </h1>
            </WordReveal>
            <FadeSlide 
              direction="up" 
              distance={50} 
              duration={1.2}
              start="top 75%"
            >
              <p className="hero-subtitle">
                Discover premium products that elevate your lifestyle. Quality, style, and excellence in every purchase.
              </p>
            </FadeSlide>
            <ScaleReveal 
              scale={0.8} 
              duration={0.8} 
              stagger={0.15}
              start="top 80%"
            >
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                </Link>
                <Link to="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <ScaleReveal 
            scale={0.7} 
            duration={1} 
            stagger={0.2}
            ease="back.out(1.7)"
            start="top 80%"
          >
            <div className="features-grid">
              <div className="feature-card scale-in">
                <div className="feature-icon">🚚</div>
                <h3>Free Shipping</h3>
                <p>On orders over $100</p>
              </div>
              <div className="feature-card scale-in">
                <div className="feature-icon">↩️</div>
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
              </div>
              <div className="feature-card scale-in">
                <div className="feature-icon">🔒</div>
                <h3>Secure Payment</h3>
                <p>100% secure checkout</p>
              </div>
              <div className="feature-card scale-in">
                <div className="feature-icon">⭐</div>
                <h3>Premium Quality</h3>
                <p>Curated selection</p>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <FadeSlide 
            direction="up" 
            distance={40} 
            duration={1}
            start="top 85%"
          >
            <div className="section-header">
              <WordReveal 
                stagger={0.06}
                duration={0.8}
              >
                <h2>Featured Products</h2>
              </WordReveal>
              <p>Handpicked selections for you</p>
            </div>
          </FadeSlide>
          <ScaleReveal 
            scale={0.8} 
            duration={0.8} 
            stagger={0.1}
            start="top 85%"
          >
            <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card scale-in">
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.originalPrice && (
                      <span className="discount-badge">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
                <button
                  className="btn btn-primary quick-add"
                  onClick={(e) => handleQuickAdd(e, product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          </ScaleReveal>
          <FadeSlide 
            direction="up" 
            distance={30} 
            duration={0.8}
            start="top 90%"
          >
          <div className="section-footer">
            <Link to="/products" className="btn btn-secondary">
              View All Products
            </Link>
            </div>
          </FadeSlide>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <ClipReveal 
            direction="left" 
            duration={1.5}
            ease="power4.inOut"
            start="top 80%"
          >
            <div className="cta-content">
              <WordReveal 
                stagger={0.05}
                duration={1}
              >
                <h2>Ready to Upgrade Your Lifestyle?</h2>
              </WordReveal>
              <FadeSlide 
                direction="up" 
                distance={30} 
                duration={0.8}
              >
                <p>Join thousands of satisfied customers and discover premium products today.</p>
              </FadeSlide>
              <ScaleReveal 
                scale={0.9} 
                duration={0.6}
              >
                <Link to="/products" className="btn btn-primary btn-large">
                  Start Shopping
                </Link>
              </ScaleReveal>
            </div>
          </ClipReveal>
        </div>
      </section>
    </div>
  )
}

export default Home

