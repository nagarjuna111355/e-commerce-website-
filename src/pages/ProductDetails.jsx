import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { CharReveal, FadeSlide } from '../components/TextReveal'
// 3D components removed as per request
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductDetails.css'

gsap.registerPlugin(ScrollTrigger);

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  const images = [product.image, product.image, product.image] // Placeholder - in real app, would have multiple product images from product.images array

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate product details on load
      gsap.from([imageRef.current, infoRef.current], {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Animate features section
      gsap.from(featuresRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="product-details" ref={containerRef}>
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </nav>

        <div className="product-details-content">
          <div className="product-images">
            <div className="main-image" ref={imageRef}>
              <img src={images[selectedImage]} alt={product.name} />
              {/* 3D Viewer removed - keeping only standard image gallery */}
            </div>
            <div className="thumbnail-images">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info-detail" ref={infoRef}>
            <FadeSlide direction="left">
              <span className="product-category">{product.category}</span>
            </FadeSlide>
            <CharReveal>
              <h1>{product.name}</h1>
            </CharReveal>
            
            <div className="product-rating-large">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-value">{product.rating}</span>
              <span className="reviews-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-price-large">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  <span className="discount-percent">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-features" ref={featuresRef}>
              <FadeSlide direction="up">
                <h3>Key Features:</h3>
              </FadeSlide>
              <ul>
                {product.features.map((feature, index) => (
                  <FadeSlide key={index} direction="up" delay={index * 0.1}>
                    <li>{feature}</li>
                  </FadeSlide>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button
                className="btn btn-primary btn-large add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div className="product-shipping">
              <div className="shipping-info">
                <span className="icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $100</p>
                </div>
              </div>
              <div className="shipping-info">
                <span className="icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="shipping-info">
                <span className="icon">🔒</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/products/${related.id}`} className="related-card">
                  <img src={related.image} alt={related.name} />
                  <h3>{related.name}</h3>
                  <div className="related-price">${related.price.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetails

