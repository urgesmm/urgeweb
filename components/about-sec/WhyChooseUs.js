import React, { useRef } from "react";
import { MaskText } from "../maskText/MaskText";
import { motion, useInView } from "framer-motion";

const AnimatedLine = ({ index }) => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true });

  return (
    <div className="w-screen py-1">
      <motion.div
        ref={lineRef}
        className="gg h-[0.01rem] bg-sec-clr"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : {}} // Animate only when in view
        transition={{ duration: 1, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="w-screen h-full py-10 bg-pri-clr flex items-center justify-center flex-col">
      <div className="w-full h-full flex items-start justify-center flex-col px-5 py-10">
        <div>
          <MaskText
            text="Why Choose Us?"
            className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
        </div>
        <div>
          <MaskText
            text="Why We’re Your"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
          />
          <MaskText
            text="Perfect Travel"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
          />
          <MaskText
            text="Partners"
            className="text-sec-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
          />
        </div>
      </div>

      <div className="w-screen">
        {/* Independent line animations triggered on scroll */}
        <AnimatedLine index={0} />

        <div className="flex items-start justify-center md:justify-start  gap-3 md:gap-24 w-full px-5 h-[13rem] md:h-auto py-5 md:py-10 flex-col md:flex-row">
          <div>
            <MaskText
              text="01"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
          </div>

          <div className="flex items-start justify-start flex-col">
            <MaskText
              text="Personalized Service:"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
            <MaskText
              text="We understand your needs and offer customized advice for every visa type."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <AnimatedLine index={1} />

        <div className="flex items-start justify-center md:justify-start gap-3 md:gap-20 w-full px-5 h-[13rem] md:h-auto py-5 md:py-10 flex-col md:flex-row">
          <div>
            <MaskText
              text="02"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
          </div>

          <div className="flex items-start justify-start flex-col">
            <MaskText
              text="Expert Guidance:"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
            <MaskText
              text="Our consultants stay updated with the latest immigration policies across top countries."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <AnimatedLine index={2} />

        <div className="flex items-start justify-center md:justify-start gap-3 md:gap-20 w-full px-5 h-[13rem] md:h-auto py-5 md:py-10 flex-col md:flex-row">
          <div>
            <MaskText
              text="03"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
          </div>

          <div className="flex items-start justify-start flex-col">
            <MaskText
              text="Proven Success:"
              className="text-pri-light-clr font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            />
            <MaskText
              text="With a 85% to 92% success rate, we’ve turned dreams into reality for clients worldwide."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <AnimatedLine index={3} />
      </div>
    </div>
  );
};

export default WhyChooseUs;
