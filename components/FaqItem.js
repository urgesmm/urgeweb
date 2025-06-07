// components/FaqItem.js
'use client'
import { motion } from "framer-motion";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-pri-clr px-5 py-5">
      <div
        onClick={onClick}
        className="flex justify-between items-center py-2 cursor-pointer"
      >
        <h3 className="sm:text-2xl md:text-3xl lg:text-4xl text-pri-clr font-pp-neue select-none">{question}</h3>

        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="sm:text-1xl md:text-2xl lg:text-3xl text-pri-clr font-pp-neue select-none"
        >
          +
        </motion.span>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <p className="text-pri-light-clr text-2xl select-none">{answer}</p>
      </motion.div>
    </div>
  );
};

export default FaqItem;
