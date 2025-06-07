"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export function MaskText({ text = "", className = "" }) {
  const [lines, setLines] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  useEffect(() => {
    // Function to split text into lines based on screen width
    const splitTextIntoLines = () => {
      const words = text.split(" ");
      let tempLine = "";
      const splitLines = [];

      words.forEach((word) => {
        const testLine = `${tempLine} ${word}`;
        const testElement = document.createElement("span");
        testElement.style.visibility = "hidden";
        testElement.style.whiteSpace = "nowrap";
        testElement.style.position = "absolute";
        testElement.className = className;
        testElement.innerText = testLine;
        document.body.appendChild(testElement);

        if (testElement.clientWidth < window.innerWidth - 40) {
          tempLine = testLine;
        } else {
          splitLines.push(tempLine.trim());
          tempLine = word;
        }

        document.body.removeChild(testElement);
      });

      if (tempLine) splitLines.push(tempLine.trim());
      setLines(splitLines);
    };

    splitTextIntoLines();
    window.addEventListener("resize", splitTextIntoLines);

    return () => {
      window.removeEventListener("resize", splitTextIntoLines);
    };
  }, [text, className]);

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({ y: "0", transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i } }),
  };

  return (
    <div ref={ref} className="overflow-hidden" style={{ position: 'relative', zIndex: 2 }}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
            className={`${className} m-0 whitespace-pre-wrap text-left`}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
