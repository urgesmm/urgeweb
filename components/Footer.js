"use client";
import React from "react";
import TextReveal from "../components/TextReveal";

function Footer() {
  return (
    <div className="w-screen bg-pri-clr flex items-start justify-center flex-col px-8 py-10 overflow-hidden space-y-6 lg:space-y-0">

   {/* LINKS */}
      <div className="w-auto h-full flex items-start justify-center space-x-0 space-y-4 flex-col sm:flex-row sm:space-x-6 sm:space-y-0">

{/* USEFUL LINKS  */}
        <div className="w-full flex items-start justify-center flex-col -space-y-2">
          <div className="uppercase font-pp-neue text-pri-light-clr text-2xl md:text-4xl flex items-start justify-center flex-col"style={{ lineHeight: "100%" }}>
            <TextReveal text="USEFUL LINKS" tag="span" />
          </div>
          <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center ">
            <TextReveal
              linkText="PRIVACY POLICY"
              linkHref="/Privacy&Policy"
              tag="div"
            />
          </div>
          <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center ">
            <TextReveal
              linkText="TERMS & CONDITIONS"
              linkHref="/Terms&Conditions"
              tag="div"
            />
          </div>
        </div>

{/* CONTACT  */}
        <div className="w-full flex items-start justify-center flex-col -space-y-2">
          <div className="uppercase font-pp-neue text-pri-light-clr text-1xl md:text-4xl flex items-start justify-center flex-col">
            <TextReveal text="CONTACTS" tag="span" />
          </div>
          <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center ">
            <TextReveal
              linkText="+971 50 484 5469"
              linkHref="tel:+971504845469"
              tag="div"
            />
          </div>
     
          <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center ">
            <TextReveal
              linkText="info@URGEMANAGEMENT.com"
          linkHref="mailto:info@urgemanagement.com"
              tag="div"
            />
          </div>

          {/* <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center space-x-2 pt-2">
  <div className="hover:text-[#1877F2] transition-colors duration-300">
    <TextReveal linkHref="https://www.facebook.com/people/Urge-Of-Immigration-Visa-Services/61561331173529/" iconName="facebook"
             duration={1}
                    delay={0.1}
                     yAxis="150%" />
  </div>

 

  <div className="hover:text-[#E4405F] transition-colors duration-300">
    <TextReveal linkHref="https://www.instagram.com/URGE MANAGEMENT_visa/" iconName="instagram"
             duration={1.3}
                    delay={0.1}
                     yAxis="150%" />
  </div>
</div> */}

        </div>
{/* LOCATION  */}
        <div className="w-full flex items-start justify-center flex-col -space-y-2">
          <div className="uppercase font-pp-neue text-pri-light-clr text-1xl md:text-4xl flex items-start justify-center flex-col">
            <TextReveal text="LOCATION" tag="span" />
          </div>
          <div className="uppercase font-pp-neue text-sec-clr text-1xl flex items-start justify-center"style={{ lineHeight: "100%" }}>
            <TextReveal
              text="ABN Business Center  Opposite Zabeel Furniture Umm Hurair Rd - Al Karama - Dubai"
              tag="div"
            />
          </div>
        </div>


      </div>
      
{/* CC  */}
      <div className="w-full h-full flex items-start justify-center space-x-6">

        <div className="w-full flex items-start justify-center flex-col -space-y-3">
            
          <div className="uppercase font-pp-neue text-sec-clr text-2xl md:text-5xl lg:text-8xl flex items-start justify-center flex-col whitespace-nowrap">
            <TextReveal text="URGE MANAGEMENT ©" tag="span"
                     duration={1}
                     delay={0.1} />
          </div>
          <div className="uppercase font-pp-neue text-sec-clr text-1xl md:text-3xl lg:text-5xl whitespace-nowrap flex items-start justify-center">
            <TextReveal
              text="2025. ALL RIGHTS RESERVED"
              tag="div"
              duration={1}
              delay={0.1}
            />
          </div>
        </div>


      </div>
      
    </div>
  );
}

export default Footer;
