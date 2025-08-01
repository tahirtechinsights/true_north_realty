"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { allPropertiesData } from "../data/properties";
import Image from "next/image";

import Spline from "@splinetool/react-spline";

const App = () => {
  const navItems = [
    "Featured Properties",
    "Properties",
    "Sell",
    "About Us",
    "Contact",
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stars, setStars] = useState<
    Array<{
      size: number;
      left: number;
      top: number;
      opacity: number;
      color: string;
      delay: number;
      duration: number;
    }>
  >([]);
  const [lights, setLights] = useState<
    Array<{
      size: number;
      left: number;
      top: number;
      color: string;
      delay: number;
    }>
  >([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Generate random stars and lights with colors
  useEffect(() => {
    const starColors = ["#FFD700", "#FF6B6B", "#4D96FF", "#FFFFFF"]; // Yellow, Red, Blue, White
    const lightColors = ["#FFD700", "#FF6B6B", "#4D96FF", "#7CFFCB"]; // Yellow, Red, Blue, Teal

    setStars(
      Array(80)
        .fill(0)
        .map(() => ({
          size: Math.random() * 4 + 1,
          left: Math.random() * 100,
          top: Math.random() * 100,
          opacity: Math.random() * 0.8 + 0.2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 5,
        }))
    );

    setLights(
      Array(15)
        .fill(0)
        .map(() => ({
          size: Math.random() * 8 + 4,
          left: Math.random() * 100,
          top: Math.random() * 100,
          color: lightColors[Math.floor(Math.random() * lightColors.length)],
          delay: Math.random() * 10,
        }))
    );
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter">
      {/* Header Section */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-800 shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <motion.a
            href="#"
            className="text-2xl font-bold text-teal-400"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            True North Realty
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  type: "spring",
                }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-700 mt-4 py-4 px-4 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 px-3 py-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-700 mt-4 py-4 px-4 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              {["Properties", "Sell", "About Us", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300 px-3 py-2 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[calc(100vh-80px)] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Spline
            scene="https://prod.spline.design/hmqRXYHDh3bSkoKc/scene.splinecode"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/30 to-gray-900/80"></div>
        </div>

        {/* Enhanced 3D Stars */}
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: star.color,
              opacity: star.opacity,
              rotateX,
              rotateY,
              boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${
                star.color
              }`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced Twinkling Lights */}
        {lights.map((light, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${light.size}px`,
              height: `${light.size}px`,
              left: `${light.left}%`,
              top: `${light.top}%`,
              backgroundColor: light.color,
              opacity: 0,
              rotateX,
              rotateY,
              filter: "blur(2px)",
              boxShadow: `0 0 ${light.size * 3}px ${light.size}px ${
                light.color
              }`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              delay: light.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ rotateX, rotateY }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
            variants={itemVariants}
          >
            Your Journey to the Perfect Canadian Home Starts Here
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover prime properties across Canada with True North Realty –
            your trusted partner in real estate.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/explore" passHref>
              <motion.button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Explore Properties
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        id="properties"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800"
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-teal-400"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Our Expert Real Estate Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover="hover"
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="text-teal-400 mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                </svg>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-4 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Personalized Property Search
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Find your ideal home with our tailored search tools and expert
                guidance across Canada.
              </motion.p>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover="hover"
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-teal-400 mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 11V7h-4v4h4zm-6 0V7H6v4h4zm6 6v-4h-4v4h4zm-6 0v-4H6v4h4zm12 4H2V3h20v18zM4 19h16V5H4v14z"></path>
                </svg>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-4 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Expert Market Insights
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Stay ahead with comprehensive market analysis and data-driven
                advice for buying or selling.
              </motion.p>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover="hover"
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-teal-400 mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5z"></path>
                </svg>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-4 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Seamless Transaction Process
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                From offer to close, we ensure a smooth and stress-free real
                estate transaction.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about-us"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-800 overflow-hidden"
      >
        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-8 text-teal-600"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            About True North Realty
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Left Column - Logo and Text */}
            <motion.div
              className="flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Company Logo */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Image
                  src="/assets/images/True-North-Realty-Logo.png" // Add your logo image
                  alt="True North Realty Logo"
                  width={200}
                  height={200}
                  className="w-40 h-40 object-contain"
                />
              </motion.div>

              <motion.p
                className="text-lg text-gray-700 mb-6 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Founded in 2010, True North Realty has been guiding Canadians to
                their dream homes with integrity and expertise. Our team of
                dedicated professionals brings together decades of combined
                experience in the Canadian real estate market.
              </motion.p>

              <motion.p
                className="text-lg text-gray-700 mb-6 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                We pride ourselves on our client-first approach, ensuring every
                homebuyer and seller receives personalized attention and expert
                guidance throughout their real estate journey.
              </motion.p>

              <motion.p
                className="text-lg text-gray-700 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Our mission is to make Canadian real estate accessible,
                transparent, and rewarding for everyone we serve. From
                first-time buyers to seasoned investors, we provide the
                knowledge and support you need to make confident decisions.
              </motion.p>
            </motion.div>

            {/* Right Column - Team Photo */}
            <motion.div
              className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/assets/images/team-photo.jpeg"
                alt="True North Realty Team"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Additional Company Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "10+", label: "Years Experience" },
              { number: "100M+", label: "In Sales" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="text-3xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Sell Section */}
      <section id="sell" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-teal-400"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Sell Your Property with Confidence
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                ),
                title: "Free Home Valuation",
                description:
                  "Get an accurate, no-obligation valuation of your property from our local experts.",
              },
              {
                icon: (
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16H6v-6h6v6zm6 0h-4v-6h4v6zm0-8h-4V6h4v4z"></path>
                ),
                title: "Strategic Marketing",
                description:
                  "We leverage cutting-edge marketing to ensure your property reaches the widest audience.",
              },
              {
                icon: (
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                ),
                title: "Expert Negotiation",
                description:
                  "Our skilled negotiators work to secure the best possible price for your home.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="text-teal-400 mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 150,
                  }}
                >
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-4 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Properties Listing Section */}
      <section
        id="featured-properties"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-800"
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-teal-600"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Featured Properties
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {allPropertiesData.map((property, index) => (
              <motion.div
                key={property.id}
                className="bg-gray-100 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400/D1D5DB/4B5563?text=Image+Not+Found";
                    }}
                  />
                </motion.div>
                <div className="p-6 text-left">
                  <motion.h3
                    className="text-xl font-semibold mb-2 text-gray-800"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {property.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {property.description.substring(0, 100)}...
                  </motion.p>
                  <motion.span
                    className="text-lg font-bold text-teal-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {property.price}
                  </motion.span>
                  <Link href={`/property/${property.id}`} passHref>
                    <motion.button
                      className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="mt-12 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/explore">View All Properties</Link>
          </motion.button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white overflow-hidden"
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-teal-400"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Contact True North Realty
          </motion.h2>

          <motion.div
            className="max-w-2xl mx-auto bg-gray-700 p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-left text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-md bg-gray-600 border border-gray-500 focus:border-teal-400 focus:outline-none"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-left text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-md bg-gray-600 border border-gray-500 focus:border-teal-400 focus:outline-none"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="subject"
                  className="block text-left text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-md bg-gray-600 border border-gray-500 focus:border-teal-400 focus:outline-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-left text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-gray-600 border border-gray-500 focus:border-teal-400 focus:outline-none"
                ></textarea>
              </motion.div>

              <motion.button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-center text-gray-400">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            &copy; {new Date().getFullYear()} True North Realty. All rights
            reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;
