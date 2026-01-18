import { Link } from 'react-router-dom'
import './CheckoutSuccess.css'

const CheckoutSuccess = () => {
  return (
    <div className="checkout-success">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
          <p className="order-info">You will receive an email confirmation shortly with your order details.</p>
          <div className="success-actions">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess

