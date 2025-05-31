import React from "react";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";

const Certifications = ({ response }) => {
  if (!response || !Array.isArray(response)) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-700 text-lg font-medium">No certifications available yet</div>
        <p className="text-gray-500 mt-1">Currently expanding my professional qualifications</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Professional Certifications
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Validated proof of my technical skills and knowledge
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.map((certification, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Card Header */}
            <div className="bg-gray-800 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <FaCertificate className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{certification.course_name}</h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-6">{certification.provider}</p>
              
              <a
                href={certification.certificate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors group"
              >
                <span>View Certificates</span>
                <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;