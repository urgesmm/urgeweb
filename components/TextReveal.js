import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './Icons';

const TextReveal = ({ text = "", tag = "span", duration = 0.5, delay = 0.005, linkText = "", linkHref = "", iconName = "", yAxis = "100%" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const CustomTag = tag;

  useEffect(() => {
    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Disconnect observer after first reveal to save resources
          }
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  const wordVariant = {
    hidden: { y: yAxis, opacity: 1 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay,
        duration: duration,
        ease: "easeInOut",
      },
    }),
  };

  const icons = {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    linkedin: <LinkedInIcon />,
    instagram: <InstagramIcon />,
  };

  if (iconName && icons[iconName]) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={wordVariant}
        style={{ display: 'inline-block', overflow: 'hidden' }}
      >
        <Link href={linkHref}>
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={wordVariant}
            style={{ display: 'inline-block' }}
          >
            {icons[iconName]}
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <CustomTag ref={ref} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {linkText && linkHref ? (
        <motion.span
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={wordVariant}
          className="text-reveal-word"
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          <Link href={linkHref}>{linkText}</Link>
        </motion.span>
      ) : (
        text.split(" ").map((word, index) => (
          <div key={index} className="text-reveal-container" style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={wordVariant}
              className="text-reveal-word"
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {word}&nbsp;
            </motion.span>
          </div>
        ))
      )}
    </CustomTag>
  );
};

export default TextReveal;
