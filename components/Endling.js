import React from 'react';
import Button from './Button';
import ParallaxImage from './ParallaxImage';
import { MaskText } from './maskText/MaskText';
import MyArrowIcon from './MyArrowIcon';
import { useRouter } from 'next/router';

const Endling = ({ hideButton }) => {
  const router = useRouter();
  // Hide button if hideButton prop is true or if we're on the contact page
  const shouldHideButton = hideButton || router.pathname === '/contact';
  return (
    <div className="w-screen md:h-screen py-10 px-5 flex items-center justify-center flex-col bg-pri-clr relative">
      {/* Image and Content Section */}
      <div className="w-full h-full overflow-hidden flex items-start justify-center flex-col relative">
        {/* Image with Parallax Effect */}
        <div className="w-full h-full  opacity-80 md:absolute">
          <div className="mainimage w-[25rem] h-[30rem] overflow-hidden static md:absolute top-1/2 left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <ParallaxImage
              src="./images/Ending.webp" // Replace with the actual image path
              alt="Visa Experts"
              duration={2} // Control the duration of the animation
            />
          </div>
        </div>

        {/* Text Section */}
        <div className='w-full h-full'>
        <div className="z-20 md:w-[60%] mt-3 md:mt-0 relative mix-blend-difference">
          <MaskText
            text="Ready to turn your dream into reality? Contact us today for a free consultation, and let’s make your visa process easy and successful."
            className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
          />

          {/* Animated Button - only shown if not on contact page */}
          {!shouldHideButton && (
            <div className="flex items-end py-5">
              <Button
                href="/contact"
                svgIcon={<MyArrowIcon />}
                textOne="SCHEDULE A CALL"
                textTwo="SCHEDULE A CALL"
                wrapperBgColor="bg-sec-clr" // Background color for .btn-wrapper
                linkTextColor="font-[500] text-pri-clr font-PP-NEUE" // Text color for .btn-link-wrapper span
                svgWrapperBgColor="bg-pri-clr" // Background color for .btn-svg-wrapper
              />
            </div>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};

export default Endling;
