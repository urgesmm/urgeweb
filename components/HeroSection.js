"use client"; // Ensure this is a client-side component
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TextReveal from "./TextReveal";

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [animationData, setAnimationData] = useState(null);

  // Y-axis transform on scroll for the .ok div
  const yTransform = useTransform(scrollY, [0, 800], [0, 400]);

  useEffect(() => {
    // Import animation data only on client-side
    import("../json/scrolling-animation.json").then((data) => {
      setAnimationData(data);
    });
  }, []);

  return (
    <motion.div
      className="ok relative w-screen h-screen bg-black -z-10"
      style={{ y: yTransform }} // Apply scroll-based Y-axis transform
    >
      {/* Video Container */}
      <div className="video-container absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          src="/videos/homeVid.mp4"  // Ensure the path to the video is correct
          className="w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Text Overlay */}
      <div className="w-full absolute top-[30%] md:top-[20%] flex items-center justify-center text-center">
        <div className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl z-20">
          <TextReveal
            text="Your Gateway to Global Opportunities"
            tag="h1"
            duration={1.2}
            delay={0.05}
          />
        </div>
      </div>

      {/* Lottie Animation Container */}
      <div className="lottie absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        {animationData && (
          <Lottie
            animationData={animationData}  // JSON path for the animation
            className="w-15 h-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
            loop
            autoplay
          />
        )}
      </div>
    </motion.div>
  );
};

export default HeroSection;