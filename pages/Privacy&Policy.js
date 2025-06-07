import Head from 'next/head';
import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
import { MaskText } from '../components/maskText/MaskText';
import React, { useRef } from "react";
import Footer from '../components/Footer';


const Privacy = () => {
  return (
    <>
     <Head>
        <title>Privacy & Policy | URGE MANAGEMENT</title>
        <meta name="description" content="Learn about our privacy policy at URGE MANAGEMENT VISA SERVICES. We ensure data privacy and secure handling of your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon */}
        <link rel="icon" href="/LOGO.svg" />
      </Head>
      <SmoothScroll>
        <Navbar />
        <div className='bg-sec-clr w-screen h-24'>
        </div>
        <div className=" w-screen bg-sec-clr px-5 py-10 flex justify-center items-start flex-col">
        <MaskText
              text="Our Privacy & Policy:"
              className="text-pri-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />

<div className='py-3'>
              <MaskText
              text="Any details, information, intellectual or otherwise (documents) provided by the client to URGE MANAGEMENT VISA SERVICES will be kept confidential. Information and documents provided by the client will not be shared by any other party EXCEPT for any third party which is a required of the immigration process, such as government bodies or Immigration department and case officers."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="With regards to a purchase of a service from this site, we confirm that your credit card/debit card details are not handled by URGE MANAGEMENT VISA SERVICES. Your credit card/debit card details will be securely handled by our Payment Services Provider."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="Your card details will not be stored at our website or by our payment services provider and will not be shared with any third parties."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="All credit/debit cards’ details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="Merchant will not pass any debit/credit card details to third parties."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="Merchant takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However, (www.URGE MANAGEMENT.com) cannot guarantee the security of any information that is disclosed online."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="The merchant is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="The merchant is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
        </div>
<div className='py-3 mt-8'>
<MaskText
              text="PAYMENT CONFIRMATION:"
              className="text-pri-clr uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            />
        </div>
<div className='py-3'>
              <MaskText
              text="Once payment is successfully completed, all customers will receive a payment confirmation receipt by email and to the email address entered by the customer on the online payment form. The payment confirmation will be received immediately by email on successful completion of payment."
              className="text-pri-clr font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
            <div className='py-3'>
              <MaskText
              text="(NOTE) URGE MANAGEMENT Company shall not be held liable for any payments made to personal bank accounts or any account other than the company’s officially designated bank account. Clients are strictly advised to ensure that all transactions are processed exclusively through URGE MANAGEMENT Company’s verified banking details. Any deviation from this may result in financial loss, for which the company bears no responsibility whatsoever."
              className="text-red-900 font-pp-neue text-base sm:text-lg md:text-2xl lg:text-3xl"
            />
            </div>

        </div>
        </div>

       
        

       


<Footer/>
      </SmoothScroll>
      </>

  );
};

export default Privacy;
