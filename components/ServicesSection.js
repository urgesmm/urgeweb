'use client'; // Ensure this is a client-side component

import { memo } from "react";
import { motion } from "framer-motion";
import TextReveal from "../components/TextReveal";
import Button from "../components/Button";
import AirplanIcon from "../components/AirplanIcon";
import MyArrowIcon from "../components/MyArrowIcon";
import { MaskText } from "./maskText/MaskText";

const ServicesSection = () => {
  return (
    <div className="bg-pri-clr w-screen h-full py-10 px-5 flex items-start justify-center flex-col relative rounded-t-2xl">
      <div>
        <MaskText
            text="OUR SERVICES"
            className="text-pri-light-clr font-pp-neue text-4xl uppercase leading-[90%] mb-4 md:text-8xl"/>
      </div>
      <div
      >
         <MaskText
            text="We provide a comprehensive range of visa consulting services tailored to your unique needs. Whether you're looking to study, work, or settle abroad, our expert team ensures a smooth and stress-free experience. We guide you through every step of the visa process, from document preparation to final approval."
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center items-end sm:mt-14 lg:mt-40">
        <div className="w-full flex justify-center items-start flex-col relative">
          <div
            className="text-sec-clr font-[100] font-lauanne text-sm sm:text-md md:text-1xl lg:text-2xl xl:text-2xl 2xl:text-3xl mt-3 tracking-tight"
            style={{ lineHeight: "100%" }}
          >
         
            <MaskText
            text="No matter your destination or goal, we’ve got you covered with expert guidance."
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
          </div>

          <div className="flex items-start justify-center flex-col text-sec-clr font-[100] font-lauanne text-sm sm:text-md md:text-1xl lg:text-2xl xl:text-2xl 2xl:text-3xl mt-3">
            <MaskText
            text="• Study Abroad"
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
            <MaskText
            text="• Work Permits"
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />

            <MaskText
            text="• Family Visas"
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />

            <MaskText
            text="• Business Visas"
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />

            <MaskText
            text="• Tourist Visas"
            className="text-sec-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
          />
            
          </div>

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

        <div className="h-full bg-transparent flex items-center justify-end mt-10">
          <AirplanIcon />
        </div>
      </div>
    </div>
  );
};

export default memo(ServicesSection);
