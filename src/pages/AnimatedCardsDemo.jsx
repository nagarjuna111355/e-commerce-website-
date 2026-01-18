import React from 'react';
import { motion } from 'framer-motion';
import CardGrid from '../components/CardGrid';
import styled from 'styled-components';

// Sample data for the cards
const demoItems = [
  {
    id: 1,
    title: 'Premium Headphones',
    description: 'Experience crystal clear sound with our noise-canceling headphones.',
    color: '#6366f1',
    emoji: '🎧'
  },
  {
    id: 2,
    title: 'Smart Watch',
    description: 'Stay connected and track your fitness with our latest smartwatch.',
    color: '#10b981',
    emoji: '⌚'
  },
  {
    id: 3,
    title: 'Wireless Earbuds',
    description: 'True wireless earbuds with premium sound quality and long battery life.',
    color: '#3b82f6',
    emoji: '🎵'
  },
  {
    id: 4,
    title: 'Laptop Stand',
    description: 'Ergonomic stand for better posture and improved airflow.',
    color: '#f59e0b',
    emoji: '💻'
  },
  {
    id: 5,
    title: 'Mechanical Keyboard',
    description: 'Tactile mechanical keyboard for the ultimate typing experience.',
    color: '#8b5cf6',
    emoji: '⌨️'
  },
  {
    id: 6,
    title: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons.',
    color: '#ec4899',
    emoji: '🖱️'
  },
];

const Container = styled.div`
  padding: 2rem 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const AnimatedCardsDemo = () => {
  return (
    <Container>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our curated selection of premium products designed to enhance your digital lifestyle.
          Each item is carefully selected for quality and performance.
        </motion.p>
      </Header>
      
      <CardGrid 
        items={demoItems}
        title=""
        subtitle=""
      />
      
      <div style={{ height: '100vh' }}>
        {/* Empty space to demonstrate scroll trigger */}
      </div>
    </Container>
  );
};

export default AnimatedCardsDemo;
