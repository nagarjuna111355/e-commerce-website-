import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import AnimatedCardsDemo from './pages/AnimatedCardsDemo';
import ThreeDShowcase from './pages/ThreeDShowcase';
// TiltCardDemo import removed - file not found
import GSAPDemo from './pages/GSAPDemo';
// Animation pages removed - keeping only integrated features in main website
import { createRoutesFromElements, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import './App.css';

// Layout component that includes header, animated routes, and footer
const AppLayout = () => (
  <div className="App">
    <Header />
    <AnimatedRoutes />
    <Footer />
  </div>
);

// Create router configuration with future flags
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <CartProvider>
          <AppLayout />
        </CartProvider>
      }
      // Add future flags here
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/animated-cards" element={<AnimatedCardsDemo />} />
      <Route 
        path="/3d-showcase" 
        element={
          <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
            <ThreeDShowcase />
          </div>
        } 
      />
      <Route path="/gsap-demo" element={<GSAPDemo />} />

    </Route>
  )
);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <main>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </main>
  );
}

export default App