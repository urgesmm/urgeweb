import Head from 'next/head';
import WaveScene from '../components/EUROPEFlag';
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

const EuropeVisaPrograms = () => {
  return (
    <>
      <Head>
        <title>Europe Visa Programs | URGE MANAGEMENT</title>
        <meta name="description" content="Discover visa options for Europe with URGE MANAGEMENT. Learn about Finland's Startup Visa, Germany's Blue Card, Portugal's Golden Visa, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
              text="EUROPE Visa Programs"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />
            <MaskText
              text="Explore Your Path to the Europe"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="LUXEMBOURG"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*LUXEMBOURG WORK VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Luxembourg Work Visa is designed for non-EU nationals who wish to work in Luxembourg. It allows skilled professionals to reside and work in one of Europe's most dynamic economies, subject to a valid job offer and a work permit approval"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a confirmed job offer from a Luxembourg-based employer and meet the required qualifications, experience, and salary criteria set by the Luxembourg authorities"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a confirmed job offer from a Luxembourg-based employer and meet the required qualifications, experience, and salary criteria set by the Luxembourg authorities"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Initially valid for up to 1 year, renewable annually, and may lead to eligibility for long-term residence after five years of continuous stay"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*LUXEMBOURG VISIT VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Luxembourg Visit Visa is intended for individuals wishing to travel to Luxembourg for short stays, including tourism, visiting family or friends, or attending business meetings. It allows entry into Luxembourg and other Schengen countries for a limited duration"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must provide proof of accommodation, sufficient financial means, travel insurance, and a valid reason for visiting, along with a valid passport and supporting documents"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Enables short-term travel across Luxembourg and the Schengen Zone for tourism, family visits, or business purposes, offering exposure to European culture and opportunities"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Enables short-term travel across Luxembourg and the Schengen Zone for tourism, family visits, or business purposes, offering exposure to European culture and opportunities"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
   
        <AnimatedLine index={0} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="GERMANY"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*GERMANY JOB SEEKER VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Germany Job Seeker Visa allows qualified professionals to enter Germany and search for employment. It is designed to help skilled individuals explore job opportunities in Germany"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must have a recognized degree or equivalent qualification and sufficient funds for the stay"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Gives individuals 6 months to search for a job, after which they can convert to a work visa upon securing employment"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for 6 months, with an option to convert to a work visa upon employment"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*GERMANY BLUE CARD*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The EU Blue Card for Germany is aimed at highly skilled professionals from non-EU countries who have a job offer in Germany that meets specific salary criteria"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a job offer with a minimum annual salary and a recognized university degree"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows qualified professionals to work and live in Germany, with a pathway to permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for up to 4 years, with options for renewal and permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={1} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="PORTUGAL"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*PORTUGAL GOLDEN VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Portugal Golden Visa is an investment-based residency program that allows non-EU nationals to gain residency in Portugal by making a qualifying investment"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Requires a minimum investment in real estate, capital transfer, or job creation in Portugal"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Grants residency with visa-free travel within the Schengen area, with an option for permanent residency and citizenship after five years"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Initially valid for 1 year, with options for renewal and long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*PORTUGAL D7 VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Portugal D7 Visa, also known as the Passive Income Visa, allows individuals who have a stable passive income to live in Portugal"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have proof of regular passive income, such as pensions, rental income, or investments, that meets the minimum income requirement"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides residency in Portugal with visa-free access to the Schengen area and a pathway to permanent residency and citizenship"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for 1 year initially, with options for renewal and long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={2} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="MALTA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*MALTA GLOBAL RESIDENCE PROGRAM*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Malta Global Residence Program allows non-EU nationals to obtain Maltese residency through a minimum property investment and meeting financial criteria"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must invest in real estate in Malta and meet minimum income tax requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides residency in Malta with access to the Schengen area"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Indefinite as long as property ownership and tax obligations are maintained"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*MALTA WORK VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Malta Work Visa allows individuals to work in Malta if they have a valid job offer from a Maltese employer"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a job offer and meet specific skill requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows individuals to live and work in Malta with the potential to apply for long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for the duration of the employment contract, renewable based on continued employment"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={4} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="POLAND"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*POLAND BUSINESS VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Poland Business Visa is for entrepreneurs looking to start or invest in a business in Poland. This visa allows foreign nationals to engage in business activities in Poland"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must demonstrate sufficient financial resources and a viable business plan"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows individuals to set up and manage a business in Poland with potential pathways to long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for 1 year, with options for renewal"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*POLAND WORK PERMIT*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Poland Work Permit allows foreign nationals to work in Poland if they have a valid job offer from a Polish employer"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Requires a job offer and, in most cases, an approved labor market test"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Grants the right to work and live in Poland, with pathways to long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for the length of the employment contract, renewable based on employment status"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={5} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="NETHERLANDS"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
                 <div className='mb-3'> <MaskText 
              text="*NETHERLANDS STARTUP VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Netherlands Startup Visa allows entrepreneurs to start an innovative business in the Netherlands with the support of an approved facilitator"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have an innovative business plan and be supported by a recognized facilitator in the Netherlands"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides a one-year residency permit with an option to transition to the self-employed residence permit"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for 1 year, with the option to extend by switching to a self-employment permit"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*NETHERLANDS HIGHLY SKILLED MIGRANT VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Netherlands Highly Skilled Migrant Visa is designed for non-EU nationals with specialized skills who have a job offer from a Dutch employer"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Requires a job offer with a minimum salary threshold and specific qualifications"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows skilled professionals to work in the Netherlands with the possibility of permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for the duration of the employment contract, with options for renewal and long-term residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="*NETHERLANDS WORK VISA*"
              className="text-logo-clr uppercase font-pp-neue text-1xl md:text-6xl lg:text-5xl xl:text-4xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Netherlands Work Visa allows non-EU nationals to live and work in the Netherlands by securing employment with a recognized Dutch employer. It supports the country's demand for skilled professionals across various sectors"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must have a valid job offer from an employer registered with the Dutch Immigration and Naturalisation Service (IND) and meet specific qualifications, salary thresholds, and skill requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides the opportunity to work legally in the Netherlands, access European work experience, enjoy a high quality of life, and eventually apply for permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for up to 1 to 5 years, depending on the type of employment contract, with the possibility to extend or apply for long-term residence"
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

export default EuropeVisaPrograms;
