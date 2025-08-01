"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { allPropertiesData } from '../../data/properties';
import Image from 'next/image';
import Link from 'next/link';

const ExploreProperties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(allPropertiesData);

  // Filter properties based on search term
  useEffect(() => {
    const results = allPropertiesData.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.details.some(detail => 
        detail.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProperties(results);
  }, [searchTerm]);

  // Set the first property as selected by default
  useEffect(() => {
    if (filteredProperties.length > 0 && selectedProperty === null) {
      setSelectedProperty(filteredProperties[0].id);
    }
  }, [filteredProperties, selectedProperty]);

  const selectedPropertyData = filteredProperties.find(
    property => property.id === selectedProperty
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Back to Home Button - Add this at the top */}
      <div className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      {/* Search Header */}
      <div className="bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-teal-600 mb-6">Explore Properties</h1>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by location, price, or features..."
              className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            {filteredProperties.length} properties found
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Properties List */}
          <div className="w-full lg:w-1/2">
            {filteredProperties.length > 0 ? (
              <div className="space-y-6">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${selectedProperty === property.id ? 'ring-2 ring-teal-500' : 'hover:shadow-lg'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProperty(property.id)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 h-48 relative">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://placehold.co/600x400/D1D5DB/4B5563?text=Image+Not+Found";
                          }}
                        />
                      </div>
                      <div className="w-full sm:w-2/3 p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                        <p className="text-teal-600 font-bold mt-1">{property.price}</p>
                        <p className="text-gray-600 mt-2 line-clamp-2">{property.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {property.details.slice(0, 3).map((detail, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {detail.label}: {detail.value}
                            </span>
                          ))}
                        </div>
                        <Link href={`/property/${property.id}`} passHref>
                          <button className="mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm">
                            View Details →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your search criteria</p>
                <button 
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/2 sticky top-4 h-[calc(100vh-100px)]">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              {selectedPropertyData ? (
                <>
                  <div className="h-3/5">
                    <iframe
                      src={selectedPropertyData.mapLink}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="p-4 h-2/5 overflow-y-auto">
                    <h3 className="text-xl font-semibold text-gray-800">{selectedPropertyData.title}</h3>
                    <p className="text-teal-600 font-bold mt-1">{selectedPropertyData.price}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {selectedPropertyData.details.map((detail, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-500">{detail.label}:</span>{' '}
                          <span className="text-gray-700 font-medium">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/property/${selectedPropertyData.id}`} passHref>
                      <button className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                        View Full Details
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No property selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;