import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the card grid
const GridContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ bgColor }) => bgColor || '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      duration: 0.6,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

const CardGrid = ({ items, title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Default items if none provided (for demo purposes)
  const defaultItems = Array(6).fill(0).map((_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
    description: 'This is a sample card with some description text.',
    color: `hsl(${i * 60}, 70%, 60%)`,
  }));

  const displayItems = items || defaultItems;

  return (
    <GridContainer ref={ref}>
      {title && <h2>{title}</h2>}
      {subtitle && <p style={{ marginBottom: '2rem' }}>{subtitle}</p>}
      
      <Grid
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {displayItems.map((item) => (
          <Card
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardImage bgColor={item.color}>
              {item.emoji || '🛍️'}
            </CardImage>
            <CardContent>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default CardGrid;
