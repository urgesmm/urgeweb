import React from 'react';
import { MaskText } from '../maskText/MaskText';
import ParallaxImage from '../ParallaxImage';

const Paragraph = () => {
  return (
    <div className="w-screen h-auto bg-sec-clr py-10 px-5 flex flex-col md:flex-row items-center justify-center relative">
      <div className="flex flex-col items-start justify-center w-full md:w-[60%] z-10">
        <div>
          <MaskText
            text="Our Mission"
            className="text-pri-clr uppercase font-pp-neue text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
          />
          <MaskText
            text="We simplify the complex visa process so you can focus on your future. Each client’s story is unique, and so is our approach. Whether you’re pursuing education in Canada, starting a business in the USA, or reuniting with family in Australia, we provide expert, tailored solutions to make your journey smooth."
            className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
        </div>
      </div>
      <div className="w-full h-60 sm:w-full sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[38rem] lg:h-[38rem] opacity-80 mt-10 md:mt-0">
        <ParallaxImage
          src="./images/About.webp" // Replace with the actual image path
          alt="Visa Experts"
          duration={2} // Control the duration of the animation
        />
      </div>
    </div>
  );
};

export default Paragraph;
