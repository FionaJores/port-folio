import React from "react";
import { FaBuilding, FaCalendarAlt, FaLaptop, FaLayerGroup, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";

const Internships = ({ response }) => {
  if (!response || !Array.isArray(response) ){
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-medium">No internship data available</div>
        <p className="text-gray-500 mt-2">Check back later or contact for more information</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Internship Experiences
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {response.map((internship, index) => (
          <div 
            key={index} 
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaBuilding className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{internship.company}</h2>
                  <p className="text-blue-600 font-medium">{internship.role}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span>{internship.duration}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaLaptop className="mr-2 text-blue-500" />
                  <span>{internship.mode}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaLayerGroup className="mr-2 text-blue-500" />
                  <span>{internship.domain}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">DESCRIPTION</h3>
                <p className="text-gray-700">{internship.description}</p>
              </div>

              {internship.certificate_link && (
                <div className="mt-5">
                  <a
                    href={internship.certificate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <FaFileAlt className="mr-2" />
                    View Certificate
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;