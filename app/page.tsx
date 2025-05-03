'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to create random confetti pieces
const createConfettiPiece = (width: number, height: number, index: number, type: 'confetti' | 'star') => {
  const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF69B4'];
  const baseProps = {
    key: type === 'confetti' ? `confetti-${index}` : `star-${index}`,
    className: type === 'confetti' 
      ? "absolute w-3 h-3 rounded-full" 
      : "absolute text-3xl",
    style: type === 'confetti' ? { backgroundColor: colors[Math.floor(Math.random() * colors.length)] } : {},
    initial: {
      x: Math.random() * width,
      y: -20,
      scale: Math.random() * 0.5 + 0.5,
      rotate: Math.random() * 360,
    },
    animate: {
      y: height + 20,
      x: Math.random() * width,
      rotate: Math.random() * 360,
    },
    transition: {
      duration: Math.random() * (type === 'confetti' ? 2 : 3) + 2,
      ease: "linear",
    }
  };

  return (
    <motion.div {...baseProps}>
      {type === 'star' && '⭐'}
    </motion.div>
  );
};

// Helper function to create floating hearts
const createFloatingHeart = (width: number, height: number, index: number) => {
  return (
    <motion.div
      key={`heart-${index}`}
      className="absolute w-4 h-4 text-pink-500"
      initial={{
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.5 + 0.5,
      }}
      animate={{
        y: [
          Math.random() * height,
          Math.random() * height
        ],
        x: [
          Math.random() * width,
          Math.random() * width
        ],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ❤️
    </motion.div>
  );
};

export default function Home() {
  // State definitions
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1024, height: 768 });
  const [isClient, setIsClient] = useState(false);
  
  // Initialize client-side rendering and window dimensions
  useEffect(() => {
    setIsClient(true);
    
    // Set initial dimensions
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth || 1024,
        height: window.innerHeight || 768
      });
    }
    
    updateDimensions();
    
    // Add listener for window resize
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Handle surprise button click
  const handleSurprise = () => {
    if (!isClient) return;
    
    setShowConfetti(true);
    
    // Reset confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  };
  
  // Render nothing during server-side rendering
  if (!isClient) {
    return <div className="min-h-screen bg-purple-100"></div>;
  }
  
  // Prepare confetti and stars elements
  const confettiElements = showConfetti 
    ? Array.from({ length: 150 }, (_, i) => 
        createConfettiPiece(dimensions.width, dimensions.height, i, 'confetti'))
    : [];
    
  const starElements = showConfetti
    ? Array.from({ length: 50 }, (_, i) => 
        createConfettiPiece(dimensions.width, dimensions.height, i, 'star'))
    : [];
    
  const heartElements = Array.from({ length: 20 }, (_, i) => 
    createFloatingHeart(dimensions.width, dimensions.height, i));

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden relative">
      {/* Background hearts */}
      <div className="fixed inset-0 -z-10">
        {heartElements}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-pink-600 mb-8"
          >
            Hey CutiePie I love you....
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              To the most amazing girlfriend in the world,
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              On your special day, I want to celebrate you and all the joy you bring to my life.
            </p>
            <p className="text-lg md:text-xl text-gray-600">
              You make every day brighter just by being you!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSurprise}
              className="px-8 py-4 bg-pink-500 text-white rounded-full text-xl font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Click for a Surprise!. 🎉
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-20"
          >
            {confettiElements}
            {starElements}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}