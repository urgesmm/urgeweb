'use client';

import React from 'react';
import TextReveal from './TextReveal';
import RevealText from './projects/titles';

export default function Home() {
  // Data for RevealText components
  const data = [
    { title: 'We provide personalized', speed: 1.5, textStyle: 'text-[8vw] md:text-[7vw] leading-none', shadowStyle: 'text-[8vw] md:text-[7vw] leading-none' },
    { title: 'visa solutions for study,', speed: 1.5, textStyle: 'text-[8vw] md:text-[7vw] leading-none', shadowStyle: 'text-[8vw] md:text-[7vw] leading-none' },
    { title: 'work, and travel to help', speed: 1.5, textStyle: 'text-[8vw] md:text-[7vw] leading-none', shadowStyle: 'text-[8vw] md:text-[7vw] leading-none' },
    { title: 'you achieve your', speed: 1.5, textStyle: 'text-[8vw] md:text-[7vw] leading-none', shadowStyle: 'text-[8vw] md:text-[7vw] leading-none' },
    { title: 'international dreams.', speed: 1.5, textStyle: 'text-[8vw] md:text-[7vw] leading-none', shadowStyle: 'text-[8vw] md:text-[7vw] leading-none' },
  ];

  return (
    <div className="h-screen w-screen bg-sec-clr px-8 py-10 flex items-start justify-center flex-col">
      <div className="uppercase font-pp-neue text-pri-clr">
        <TextReveal text="- Short Briefcase" tag="h1" />
      </div>

      <div className="container space-y-4">
        <RevealText data={data} setSelectedProject={() => {}} />
      </div>
    </div>
  );
}
