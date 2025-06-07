// components/OutroComponent.js

"use client";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import TextReveal from "../components/TextReveal";
import ParallaxImage from "../components/ParallaxImage";

// Dynamically import AnimatedButton and Icon components
const Button = dynamic(() => import("./Button"), { ssr: false });
const MyArrowIcon = dynamic(() => import("./MyArrowIcon"), { ssr: false });

const OutroComponent = () => {
  return (
    <div className="outro w-screen h-auto bg-pri-clr px-8 py-10 flex items-start justify-center flex-col relative">
      {/* Title Section */}
      <div className="hidden sm:flex w-full h-full absolute top-0 left-0 items-center justify-center z-10">
        <div className="flex items-start justify-center flex-col text-sec-clr font-pp-neue text-5xl mix-blend-difference uppercase md:text-8xl" style={{ lineHeight: "90%" }}>
          <TextReveal text="Your Trusted" tag="div" />
          <TextReveal text="Visa Experts" tag="div" />
        </div>
      </div>

      {/* Image and Content Section */}
      <div className="w-full h-full overflow-hidden flex items-start justify-center flex-col px-0 sm:w-[50%] sm:px-10">
        {/* Image with Parallax Effect */}
        <div className="bg-slate-500 w-[25rem] h-[30rem] overflow-hidden">
        <ParallaxImage
            src="./images/outro.webp" // Replace with the actual image path
            alt="Visa Experts"
            duration={2} // Control the duration of the animation
          />
        
        </div>

        {/* Text Section */}
        <div className="mt-8 z-20">
          <div className="flex items-start justify-center flex-col text-sec-clr font-lauanne text-sm sm:text-md md:text-1xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style={{ lineHeight: "100%" }}>
            <TextReveal text="We are dedicated to simplifying the visa application process for individuals and businesses. With our experienced consultants, we ensure personalized solutions tailored to meet your immigration goals." tag="div" />
          </div>

          {/* Animated Button */}
          <div className="h-full flex items-end py-5">
          <Button
        href="/about"
        svgIcon={<MyArrowIcon />}
        textOne="LEARN MORE"
        textTwo="LEARN MORE"
        wrapperBgColor="bg-sec-clr"         // Background color for .btn-wrapper
        linkTextColor=" font-[500] text-pri-clr font-PP-NEUE"      // Text color for .btn-link-wrapper span
        svgWrapperBgColor="bg-pri-clr"       // Background color for .btn-svg-wrapper
      />
          </div>
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(OutroComponent);
