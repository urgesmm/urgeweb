import React, { useRef } from 'react';
import { useScroll, motion, useTransform, useMotionTemplate } from 'framer-motion';

export default function Titles({ data = [], setSelectedProject }) {
  return (
    <div className="titles">
      {data.map((project, i) => (
        <Title
          key={i}
          data={{ ...project, i }}
          setSelectedProject={setSelectedProject}
          textStyle={project.textStyle}
          shadowStyle={project.shadowStyle}
        />
      ))}
    </div>
  );
}

function Title({ data, setSelectedProject, textStyle, shadowStyle }) {
  const { title, speed, i } = data;
  const container = useRef(null);

  // Use `scrollYProgress` with `useRef` to avoid unnecessary recalculations
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', `${25 / speed}vw end`],
  });

  // Optimize `clipProgress` transform with a debounce effect
  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

  return (
    <div ref={container} className="title">
      <div
        className="wrapper"
        onMouseOver={() => setSelectedProject(i)}
        onMouseLeave={() => setSelectedProject(null)}
      >
        <motion.p
          style={{ clipPath: clip, willChange: "clip-path" }} // Use `willChange` for smooth animation
          className={`clip-text ${textStyle} ${shadowStyle}`}
        >
          {title}
        </motion.p>
        <p className={`static-text ${shadowStyle}`}>{title}</p> {/* Static text with shadow */}
      </div>
    </div>
  );
}
