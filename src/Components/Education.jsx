import React from "react";
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaAward } from "react-icons/fa";

const Education = ({ response }) => {
  if (!response || !Array.isArray(response)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-medium">No education data available</div>
        <p className="text-gray-500 mt-2">Check back later or contact for more information</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <FaGraduationCap className="text-blue-500" />
          Education Background
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          My academic journey and qualifications that have shaped my technical expertise
        </p>
      </div>

      {response.length > 0 ? (
        <div className="space-y-6">
          {response.map((edu, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaUniversity className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      <span>{edu.years}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  {edu.degree ? (
                    <div className="flex items-center gap-3">
                      <FaAward className="text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-600">{edu.degree}</p>
                        <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <FaAward className="text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-600">{edu.level}</p>
                        <p className="text-sm text-gray-600">Score: {edu.percentage}%</p>
                      </div>
                    </div>
                  )}
                </div>

                {edu.board && (
                  <div className="mt-3 text-sm text-gray-500">
                    <span className="font-medium">Board:</span> {edu.board}
                  </div>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No education records to display</p>
        </div>
      )}
    </div>
  );
};

export default Education;