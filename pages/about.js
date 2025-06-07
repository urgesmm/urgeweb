import Head from 'next/head';
import ImageGallery from "../components/about-sec/ImageGallery";
import Paragraph from "../components/about-sec/Paragraph";
import WhyChooseUs from "../components/about-sec/WhyChooseUs";
import Endling from "../components/Endling";
import FaqList from "../components/FaqList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Page from "../components/page";
import SmoothScroll from "../components/SmoothScroll";

export default function About() {
  return (
    <Page>
      <Head>
        <title>About Us | URGE MANAGEMENT - Your Trusted Visa Consultancy</title>
        <meta name="description" content="Learn more about URGE MANAGEMENT, our mission, and why thousands trust us for their visa and immigration needs. We are committed to guiding you on your global journey." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SmoothScroll>
        <Navbar />
        <ImageGallery />
        <Paragraph />
        <WhyChooseUs />
        <Endling />
        <FaqList />
        <Footer />
      </SmoothScroll>
    </Page>
  );
}
