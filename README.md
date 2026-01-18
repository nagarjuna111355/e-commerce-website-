# PremiumStore - Modern E-Commerce Website

A modern, professional e-commerce website built with ReactJS, featuring a clean and premium design with smooth animations and a conversion-focused layout.

## Features

- 🏠 **Home Page** - Hero section with featured products
- 📦 **Products Page** - Extensive product catalog with filtering and search
- 🔍 **Product Details** - Detailed product pages with image gallery
- 🛒 **Shopping Cart** - Full cart functionality with quantity management
- 💳 **Checkout** - Secure checkout process with form validation
- ℹ️ **About Page** - Company information and values
- 📞 **Contact Page** - Contact form and information

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations
- **Context API** - State management for cart

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/       # Reusable components (Header, Footer)
│   ├── context/          # React Context (CartContext)
│   ├── data/            # Product data
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js      # Vite configuration
```

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage (localStorage)
- Real-time cart count in header

### Product Catalog
- 30+ products across multiple categories
- Search functionality
- Category filtering
- Sort by price, rating, name
- Responsive grid layout

### Checkout Process
- Multi-step form validation
- Order summary
- Shipping calculation
- Tax calculation

## Design Features

- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎨 Modern typography (Inter font)
- 🎯 Conversion-focused layout
- 🌈 Premium color scheme
- ⚡ Fast performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

