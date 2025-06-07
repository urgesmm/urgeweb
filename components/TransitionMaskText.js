import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TransitionMaskText = ({ text, isExiting = false }) => {
  // Split text into words
  const words = text.split(' ');
  const [shouldExit, setShouldExit] = useState(false);

  // Listen for exit animation trigger
  useEffect(() => {
    if (isExiting) {
      setShouldExit(true);

      // Add a delay to ensure the component stays mounted during exit animation
      const longestDelay = words.length * 0.08 + 0.5; // Calculate longest possible exit animation
      const unmountTimer = setTimeout(() => {
        // Component will unmount naturally when parent removes it
      }, longestDelay * 1000);

      return () => clearTimeout(unmountTimer);
    }
  }, [isExiting, words.length]);

  return (
    <div className="transition-mask-container" style={{ maxWidth: '100%', overflow: 'hidden' }}>
      {words.map((word, index) => {
        // Calculate delays - reverse order for exit
        const totalWords = words.length;
        const entryDelay = index * 0.08 + 0.3;
        const exitDelay = (totalWords - index - 1) * 0.08;

        return (
          <div key={index} className="transition-word-wrapper">
            <motion.div
              className="transition-word"
              style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-word' }}
              initial={{ y: '100%' }}
              animate={shouldExit ?
                {
                  y: '-100%',
                  transition: {
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                    delay: exitDelay
                  }
                } :
                {
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                    delay: entryDelay
                  }
                }
              }
            >
              {word}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default TransitionMaskText;
