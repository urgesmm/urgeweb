// components/FaqList.js
'use client'
import { useState } from "react";
import FaqItem from "./FaqItem";
import { MaskText } from "./maskText/MaskText";

const faqData = [
    {
        question: "How long does the visa process take?",
        answer: "The visa process usually takes between 4 to 6 weeks, depending on the country and type of visa.",
      },
      {
        question: "What documents are required for a visa application?",
        answer: "Typically, you need your passport, photos, a completed application form, and supporting documents like financial proof or an invitation letter.",
      },
      {
        question: "Can you help with visa refusals?",
        answer: "Yes, we offer assistance in understanding visa refusals and provide guidance on reapplication.",
      },
      {
        question: "What are your service fees?",
        answer: "Our service fees depend on the type of visa you are applying for. Contact us for more information.",
      },
      {
        question: "Do you provide services for all types of visas?",
        answer: "Yes, we specialize in a variety of visas, including tourist, work, student, and business visas for multiple countries.",
      },
      {
        question: "Is there any guarantee that my visa will be approved?",
        answer: "We cannot guarantee visa approval as it depends on the embassy’s decision, but we ensure that your application is completed to the highest standard.",
      },
      {
        question: "How do I track the status of my visa application?",
        answer: "Once your application is submitted, we will provide you with a tracking number or update you through email on the progress of your visa.",
      },
      {
        question: "Can I apply for multiple visas at the same time?",
        answer: "It depends on the specific visa rules of the countries involved. Some countries allow it, while others may require you to apply for one visa at a time.",
      },
      {
        question: "What happens if my visa application is rejected?",
        answer: "In case of rejection, we provide guidance on addressing the reasons for rejection and reapplying, ensuring a stronger application the next time.",
      },
      {
        question: "How can I speed up my visa application process?",
        answer: "Some countries offer expedited services for an additional fee, which we can help arrange. However, the speed also depends on the consulate or embassy’s schedule.",
      },
];

const FaqList = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFaqClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the FAQ
  };

  return (
    <div className="w-screen h-auto bg-sec-clr py-10">
      <MaskText 
              text="FAQs"
              className="text-pri-clr px-5 uppercase font-pp-neue text-3xl md:text-5xl lg:text-6xl xl:text-7xl"/>
      {faqData.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={activeIndex === index}
          onClick={() => handleFaqClick(index)}
        />
      ))}
    </div>
  );
};

export default FaqList;
