import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxImage = ({ src, alt, initialY = "0%", finalY = "-15%" }) => {
  const ref = useRef(null); // Reference to the target element
  
  // Setting up scroll and transform using the target ref
  const { scrollYProgress } = useScroll({
    target: ref, // Target element for the scroll effect
    offset: ["start end", "end start"], // Offset configuration for the scroll effect
  });
  
  // Transform the y position based on scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [initialY, finalY]);

  return (
    <div ref={ref} className="imageParallax relative overflow-hidden w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
        style={{ y }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ParallaxImage;
