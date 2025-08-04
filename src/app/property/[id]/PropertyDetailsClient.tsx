"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// You do not need to import properties data here as it is passed as a prop from the server component.

// Define TypeScript types based on your properties data structure
type PropertyDetail = {
  label: string;
  value: string;
};

type Property = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  details: PropertyDetail[];
  mapLink: string;
};

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 10,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

// Props type for the client component
type PropertyDetailsContentProps = {
  currentProperty: Property;
};

export default function PropertyDetailsContent({ currentProperty }: PropertyDetailsContentProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden p-6 md:p-10"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <Link href="/" passHref>
            <motion.button
              className="mb-8 flex items-center text-teal-400 hover:text-teal-300 transition-colors duration-300"
              variants={itemVariants}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Properties
            </motion.button>
          </Link>

          {/* Property Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
            variants={itemVariants}
          >
            {currentProperty.title}
          </motion.h1>

          {/* Property Image with optimized Next.js Image component */}
          <motion.div
            className="mb-8 rounded-lg overflow-hidden relative h-96"
            variants={imageVariants}
          >
            <Image
              src={currentProperty.image}
              alt={currentProperty.title}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/1200x800/D1D5DB/4B5563?text=Image+Not+Found";
              }}
            />
          </motion.div>

          {/* Price */}
          <motion.p
            className="text-3xl font-bold text-teal-400 mb-6"
            variants={itemVariants}
          >
            {currentProperty.price}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-300 leading-relaxed mb-8"
            variants={itemVariants}
          >
            {currentProperty.description}
          </motion.p>

          {/* Details Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10"
            variants={pageVariants}
          >
            {currentProperty.details.map((detail, index) => (
              <motion.div 
                key={`${detail.label}-${index}`}
                className="flex justify-between items-center border-b border-gray-700 pb-2" 
                variants={itemVariants}
              >
                <span className="font-semibold text-gray-400">{detail.label}:</span>
                <span className="text-gray-200">{detail.value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Map Embed */}
          <motion.div
            className="mb-8 rounded-lg overflow-hidden shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-teal-400 mb-4 text-center">Location</h3>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src={currentProperty.mapLink}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${currentProperty.title} Location`}
                className="rounded-lg"
              />
            </div>
          </motion.div>

          {/* Contact Agent Button */}
          <motion.button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 text-xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(0,255,255,0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Agent
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}