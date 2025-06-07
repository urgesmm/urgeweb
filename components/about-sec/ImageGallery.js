import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion, useInView } from 'framer-motion';
import { MaskText } from '../maskText/MaskText';

const images = [
  "1.webp", "2.webp", "3.webp", "4.webp",
  "5.webp", "6.webp", "7.webp", "8.webp",
  "9.webp", "10.webp", "11.webp", "12.webp",
];

export default function Home() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    if (window.innerWidth > 768) { // Enable Lenis only for larger screens
      const lenis = new Lenis();

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      const resize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", resize);
      requestAnimationFrame(raf);
      resize();

      return () => {
        window.removeEventListener("resize", resize);
      };
    } else {
      // Disable Lenis for mobile screens
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // Define ref and animation trigger for .gg element
  const ggRef = useRef(null);
  const isInView = useInView(ggRef, { once: true });

  return (
    <main className={styles.main}>
      <div className="w-screen h-screen fixed flex items-center pl-10 -z-[1]">
        <div>
          <MaskText
            text="Navigating Your Path"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
          />
          <MaskText
            text=" to Global"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
          />
          <MaskText
            text=" Success"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
          />
        </div>
      </div>

      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      <div className="w-screen h-auto z-50 bg-sec-clr py-10 px-5 flex items-center justify-center">
        <MaskText
          text="Every dream to explore new horizons starts with a first step, and at URGE MANAGEMENT, we are here to guide you on that journey. Whether you’re aiming to study, work, or live abroad, we are your trusted partners in making it happen. From our early days as a small team, we’ve grown into a global name, helping countless clients achieve their immigration goals."
          className="text-pri-clr font-pp-neue text-1xl md:text-4xl"
        />
      </div>

      {/* Line Animation Triggered on Scroll */}
      <div className="w-screen py-1 bg-sec-clr">
        <motion.div
          ref={ggRef}
          className="gg h-[0.01rem] bg-pri-clr"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : {}} // Animate only when in view
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className={styles.imageContainer}>
          <Image src={`/images/${src}`} alt="image" fill />
        </div>
      ))}
    </motion.div>
  );
};
