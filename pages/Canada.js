import Head from 'next/head';
import WaveScene from '../components/CANADAFlag';
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

const CanadaVisaPrograms = () => {
  return (
    <>
     <Head>
        <title>Canada Visa Programs | URGE MANAGEMENT</title>
        <meta name="description" content="Explore various visa options for Canada with URGE MANAGEMENT. Learn about AIPP, SINP, Express Entry, and other pathways to Canadian residency." />
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
              text="CANADA Visa Programs"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />
            <MaskText
              text="Explore Your Path to the Canada"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
          </div>
        </div>

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="LMIA CANADA PROGRAM"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Labour Market Impact Assessment (LMIA) is a document that Canadian employers must obtain before hiring foreign workers. It verifies that there is a need for a foreign worker to fill the job and that no Canadian citizen or permanent resident is available to do so."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a valid job offer from a Canadian employer who has received a positive LMIA approval. The candidate must meet the job's skill, educational, and language requirements as specified"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
       

        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Facilitates the work permit process and can lead to permanent residency pathways through programs like Express Entry."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="Duration"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Typically valid for a limited period (up to 6 months); however, it can lead to long-term employment and eligibility for permanent residency."
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        </div>
        <AnimatedLine index={0} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="AIPP PROGRAM"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Atlantic Immigration Pilot Program (AIPP) is designed to attract skilled workers and international graduates to Canada's Atlantic provinces. It provides a pathway to permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must have a valid job offer from an employer in Atlantic Canada and meet educational and language requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
       

        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Provides permanent residency for skilled workers and their families"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="Duration"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Indefinite; leads to permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        </div>
        <AnimatedLine index={0} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="CANADA (SINP)"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Saskatchewan Immigrant Nominee Program (SINP) allows Saskatchewan to nominate skilled workers to meet its labor market needs and contribute to the local economy"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Must meet specific education, work experience, and language proficiency requirements"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="Benefits"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Nomination for Canadian permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Varies based on processing and approval times"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={1} />
        
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="CANADA BUSINESS VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Canada Business Visa provides opportunities for entrepreneurs, investors, and self-employed individuals to settle and contribute to the Canadian economy"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must demonstrate business experience, financial resources, and an intent to engage in economic activity in Canada"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Allows individuals to live and work in Canada as they establish or manage a business"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Varies; typically tied to business operations and renewals"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={2} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="CANADA SPOUSE VISA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Canada Spouse Visa allows Canadian citizens and permanent residents to sponsor their spouse or partner to come to Canada as a permanent resident"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Sponsor must be a Canadian citizen or permanent resident and demonstrate a genuine relationship with the spouse or partner"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Grants permanent residency to the sponsored spouse or partner"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Permanent, as long as the relationship remains genuine and intact"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={3} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="CANADA WORK PERMIT"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Canada Work Permit allows individuals to work in Canada temporarily with a valid job offer from a Canadian employer"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Requires a job offer and, in some cases, a Labour Market Impact Assessment (LMIA)"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Opportunity to work in Canada and gain Canadian work experience"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Valid for the length of the job offer; renewable"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={4} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="EXPRESS ENTRY"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Express Entry is a points-based immigration system for skilled workers that fast-tracks their application for permanent residency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Points are awarded based on age, education, work experience, and language proficiency"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Faster pathway to permanent residency for skilled workers"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Permanent residency upon approval"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        <AnimatedLine index={5} />

        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="PNP CANADA"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Provincial Nominee Program (PNP) allows Canadian provinces and territories to nominate individuals who wish to immigrate and are interested in settling in a particular province"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Requirements vary by province but typically include a job offer, relevant experience, and skills matching the province's needs"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Nomination for permanent residency specific to the nominating province"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Permanent residency upon approval"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>

        </div>
        
        <AnimatedLine index={6} />

     
        <div className='h-auto w-screen bg-pri-clr py-10 px-5'>
        <div className='mb-3'> <MaskText 
              text="YCP PROGRAM"
              className="text-sec-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/></div>
        <div className='py-3'>
        <MaskText
              text="Description"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="The Young Canada Professionals (YCP) Program allows young professionals to gain work experience in Canada, boosting career development and skills"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3'>
        <MaskText
              text="Eligibility"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Applicants must meet age, language, and education requirements, as well as have a job offer in Canada"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="BENEFITS"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Work experience in Canada with potential for future immigration pathways"
              className="text-sec-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
        <div className='py-3' >
        <MaskText
              text="DURATION"
              className="text-pri-light-clr font-lauanne text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
              <MaskText
              text="Varies; typically a temporary work permit"
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

export default CanadaVisaPrograms;
