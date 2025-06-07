"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import PaymentIcon from "./PaymentIcon";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => {
      if (!prevState) setIsDropdownOpen(false);
      return !prevState;
    });
  };

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOutsideClick = (event) => {
        if (
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target) &&
          !hamburgerRef.current.contains(event.target)
        ) {
          setIsMobileMenuOpen(false);
          setIsDropdownOpen(false);
        }
      };

      if (isMobileMenuOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      } else {
        document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [isMobileMenuOpen]);

  const menuVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 1 },
  };

  const dropdownVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="w-full fixed top-0 left-0 z-[10000] bg-transparent flex items-center justify-center font-pp-neue">
      <div className="w-[95%] h-12 px-6 flex items-center justify-between bg-sec-clr rounded-[0.5rem] mt-4">
        <Link scroll={false} href="/" className="z-[100000000000] pr-16">
          <Logo className="h-8 w-auto" />
        </Link>

        <div ref={hamburgerRef} className="md:hidden" onClick={toggleMobileMenu}>
          <motion.div
            className="flex flex-col justify-center space-y-1 cursor-pointer z-[10000000] relative"
            initial={false}
            animate={{ rotate: isMobileMenuOpen ? 0 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="block h-0.5 w-6 bg-pri-clr"
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-pri-clr"
              style={{ transformOrigin: "right" }}
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 5.5 : 0,
                x: isMobileMenuOpen ? -3.2 : 0,
              }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-3 items-center text-pri-clr">
          <Link scroll={false} href="/" className="text-pri-clr">
            HOME
          </Link>
          <Link scroll={false} href="/about" className="text-pri-clr">
            ABOUT
          </Link>

          <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.button className="py-4 flex items-center space-x-1 focus:outline-none bg-transparent">
              <span>PROGRAMS</span>
              <motion.span className="ml-1" animate={{ rotate: isHovered ? 45 : 0 }} transition={{ duration: 0.3 }}>
                +
              </motion.span>
            </motion.button>

            <motion.div
              className="absolute top-full left-0 bg-[#bbbbbb] shadow-lg rounded-md py-2 w-auto uppercase"
              initial="closed"
              animate={isHovered ? "open" : "closed"}
              variants={dropdownVariants}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              <Link scroll={false} href="/UAE" className="block px-6 py-2 w-full whitespace-nowrap hover:text-[#3f3f3f] duration-300">
                UAE
              </Link>
              <Link scroll={false} href="/Canada" className="block px-6 py-2 w-full whitespace-nowrap hover:text-[#3f3f3f] duration-300">
                CANADA
              </Link>
              {/* <Link scroll={false} href="/Australia" className="block px-6 py-2 w-full whitespace-nowrap hover:text-[#3f3f3f] duration-300">
              AUSTRALIA
              </Link> */}
              <Link scroll={false} href="/UK" className="block px-6 py-2 w-full whitespace-nowrap hover:text-[#3f3f3f] duration-300">
              UK
              </Link>
              <Link scroll={false} href="/Europe" className="block px-6 py-2 w-full whitespace-nowrap hover:text-[#3f3f3f] duration-300">
              EUROPE
              </Link>
            </motion.div>
          </div>
          <Link scroll={false} href="/contact" className="text-pri-clr">
            CONTACT
          </Link>
            {/* <Link scroll={false} href="/success_stories" className="text-pri-clr">
            SUCCESS STORIES 
            </Link> */}
        </div>

        <div className="hidden md:block text-right">
          <div className="h-full flex items-end py-5 whitespace-nowrap justify-end">
          <Button
        href="https://business.mamopay.com/pay/urgeofimmigrationvis-243386"
        svgIcon={<PaymentIcon />}
        textOne="INSTANT PAYMENT"
        textTwo="INSTANT PAYMENT"
        iconClassName="w-6 h-6 text-red-500" // SVG icon styling
        wrapperBgColor="bg-pri-clr"         // Background color for .btn-wrapper
        linkTextColor="text-sec-clr"      // Text color for .btn-link-wrapper span
        svgWrapperBgColor="bg-sec-clr"       // Background color for .btn-svg-wrapper
      />
</div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="w-full fixed top-0 left-0 z-50 bg-transparent flex items-center justify-center overflow-hidden">
            <motion.div
              className="z-50 mt-10 top-0 fixed rounded-[0.5rem] w-[95%] bg-[#bbbbbb] text-[#101010] flex flex-col items-start px-3 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ type: "tween", duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            >
              <motion.div
                className="flex flex-col gap-4 mt-16 h-full"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1, transition: { duration: 0.5 } }}
                transition={{ delay: 0.3, duration: 1 }}
                style={{
                  maxHeight: isMobileMenuOpen ? "500px" : "0",
                  transition: "max-height 0.5s ease-in-out",
                  overflow: "hidden",
                }}
              >
                <Link href="/" className="text-5xl" onClick={toggleMobileMenu}>
                  HOME
                </Link>
                <Link href="/about" className="text-5xl" onClick={toggleMobileMenu}>
                  ABOUT
                </Link>

                <div className="w-full">
                  <div className="flex justify-between items-center text-5xl" onClick={toggleDropdown}>
                    <span>PROGRAMS</span>
                    <motion.span className="ml-1" animate={{ rotate: isDropdownOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="flex flex-col space-y-2 mt-2"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <Link href="/UAE" className="text-4xl text-[#3d3d3d]" onClick={toggleMobileMenu}>
                        UAE
                        </Link>
                        <Link href="/Canada" className="text-4xl text-[#3d3d3d]" onClick={toggleMobileMenu}>
                          CANADA
                        </Link>
                        {/* <Link href="/Australia" className="text-4xl text-[#3d3d3d]" onClick={toggleMobileMenu}>
                          AUSTRALIA
                        </Link> */}
                        <Link href="/UK" className="text-4xl text-[#3d3d3d]" onClick={toggleMobileMenu}>
                          UK
                        </Link>
                        <Link href="/Europe" className="text-4xl text-[#3d3d3d]" onClick={toggleMobileMenu}>
                          EUROPE
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/contact" className="text-5xl" onClick={toggleMobileMenu}>
                  CONTACT
                </Link>

                {/* <Link href="/success_stories" className="text-5xl" onClick={toggleMobileMenu}>
                  SUCCESS STORIES
                </Link> */}

                <div className="h-full flex items-end py-5">
                <Button
        href="https://business.mamopay.com/pay/urgeofimmigrationvis-243386"
        svgIcon={<PaymentIcon />}
        textOne="INSTANT PAYMENT"
        textTwo="INSTANT PAYMENT"
        iconClassName="w-6 h-6 text-red-500" // SVG icon styling
        wrapperBgColor="bg-pri-clr"         // Background color for .btn-wrapper
        linkTextColor="text-sec-clr"      // Text color for .btn-link-wrapper span
        svgWrapperBgColor="bg-sec-clr"       // Background color for .btn-svg-wrapper
      />
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
