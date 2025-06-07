import Head from 'next/head';
import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
import { MaskText } from '../components/maskText/MaskText';
import React, { useRef } from "react";
import Footer from '../components/Footer';


const Terms_Conditions = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | URGE MANAGEMENT</title>
        <meta name="description" content="Explore the terms and conditions of URGE MANAGEMENT VISA SERVICES, including policies on data security, refund, and privacy." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon */}
        <link rel="icon" href="/LOGO.svg" />
      </Head>
      <SmoothScroll>
        <Navbar />
        <div className='bg-sec-clr w-screen h-24'>
        </div>


        <div className="w-screen bg-sec-clr px-5 py-10 flex justify-center items-start flex-col">
        <MaskText
              text="Terms and Policies:"
              className="text-pri-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />

<div className='py-3'>
              <MaskText
              text="The use of our website or any associated services rendered through URGE MANAGEMENT VISA are subject to the subsequent privacy policy and are in lines with your acceptance of these terms, including future amendments made thereto. We at URGE MANAGEMENT VISA respect and guard your privacy as our consultants gather specific credentials of prospective individuals seeking immigration under various programs. The information collected by us via telephonic conversation or face to face interaction, helps us as an organization to meet the needs of the applicants and we work under a complete data protect policy, where in all your credentials are secured at all levels. All credit/debit cards detail and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties. All our payments are processed by our payment processing agent. We do not keep any personal or credit card information, except for the payment details. Any information, details document or others form (documents) provided by the candidate to URGE MANAGEMENT VISA will be kept confidential. All Information & documents provided by the candidate will not be shared with any other party EXCEPT any 3rd party which is a required for the immigration process, such like a government bodies or Visa Immigration department and case officers. We would only collect your name, contact details, delivery details and email address and all of these are kept strictly confidential."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>


        </div>


       
        

       


<Footer/>
      </SmoothScroll>
      </>

  );
};

export default Terms_Conditions;
