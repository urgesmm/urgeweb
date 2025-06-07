import Head from 'next/head';
import WaveScene from '../components/UKFlag';
import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
import { MaskText } from '../components/maskText/MaskText';
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Endling from '../components/Endling';
import FaqList from '../components/FaqList';
import Footer from '../components/Footer';



const AnimatedLine = ({ index }) => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true });

  return (
    <div className="w-screen py-1 bg-pri-clr">
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

const UKVisaPrograms  = () => {
  return (

    <>
       <Head>
        <title>UK Visa Programs | URGE MANAGEMENT</title>
        <meta name="description" content="Discover visa options for the United Kingdom with URGE MANAGEMENT. Learn about the UK Innovator Visa, Sole Representative Visa, Startup Visa, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon */}
        <link rel="icon" href="/LOGO.svg" />
      </Head>

    <div>
      <SmoothScroll>
        <Navbar />
        <div className="h-screen w-screen relative bg-pri-clr">
          <div>
            <WaveScene />
          </div>

          <div className="w-full absolute top-1/2 -right-10 mix-blend-difference ">
            <MaskText
              text="UK Visa Programs"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />
            <MaskText
              text="Explore Your Path to the United Kingdom"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK COS PROGRAM"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Certificate of Sponsorship (CoS) is an essential document issued by licensed UK employers to foreign workers, enabling them to apply for a work visa under the Skilled Worker route. It confirms the job offer and details of employment in the UK"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a confirmed job offer from a UK employer who holds a valid sponsor licence, and meet the role-specific skill, salary, and language requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Enables individuals to work legally in the UK, gain valuable international experience, and provides a potential pathway towards permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid typically for up to 5 years, depending on the employment contract, with the possibility to extend or apply for settlement (Indefinite Leave to Remain)"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK INNOVATOR VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The UK Innovator Visa is designed for experienced business people seeking to establish a new, innovative business in the UK. Applicants must have a viable business idea endorsed by an approved body"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have at least £50,000 in investment funds and an endorsement from an approved body in the UK"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows individuals to set up and run a business in the UK with the potential to settle permanently"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for 3 years, with an option to extend or apply for indefinite leave to remain"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={0} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK SOLE REPRESENTATIVE"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Sole Representative Visa allows a senior employee of an overseas business to establish and run a UK branch or subsidiary of the company"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must be a senior employee of an overseas company planning to establish a UK branch, with no significant ownership in the business"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="Benefits"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Enables the representative to live and work in the UK, with a pathway to settlement"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Initial 3-year visa, extendable, with eligibility for settlement after 5 years"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={1} />
        
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK STARTUP VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The UK Startup Visa is aimed at entrepreneurs looking to establish a new business in the UK for the first time. Applicants require an endorsement from an approved organization"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have an innovative, viable, and scalable business idea endorsed by an approved body in the UK"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides an opportunity to launch a business in the UK with an option to transition to the Innovator Visa later"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for 2 years, with potential to switch to the Innovator Visa for long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={2} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK STUDY VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The UK Study Visa (Tier 4) allows international students to study at an accredited educational institution in the UK"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have an unconditional offer from an approved institution, sufficient funds, and meet English language requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Enables international students to study and work part-time in the UK during their course"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="Duration"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for the duration of the course, with options for extensions based on study level"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={2} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="UK VISIT VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The UK Visit Visa allows individuals to visit the UK for tourism, family visits, business, or short-term study purposes"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have sufficient funds to support the visit, meet health and character requirements, and demonstrate intent to return to home country"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Permits short stays in the UK for leisure, business, or family visits"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="Duration"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically up to 6 months, with some exceptions for long-term visitor visas"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>

<Endling/>
<FaqList/>
<Footer/>
      </SmoothScroll>
    </div>
    </>

  );
};

export default UKVisaPrograms ;
