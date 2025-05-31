import React from "react";
import { FaTrophy, FaExternalLinkAlt, FaAward } from "react-icons/fa";

const Achievements = ({ response }) => {
  if (!response || !Array.isArray(response)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-medium">No achievements data available</div>
        <p className="text-gray-500 mt-2">Check back later or contact for more information</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <FaTrophy className="text-yellow-500" />
          My Achievements
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Recognitions and accomplishments that showcase my skills and dedication
        </p>
      </div>

      {response.length > 0 ? (
        <div className="space-y-6">
          {response.map((achievement, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <FaAward className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
                    <p className="text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                </div>

                {achievement.certificate_link && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a
                      href={achievement.certificate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      View Certificate
                      <FaExternalLinkAlt className="ml-2 text-sm" />
                    </a>
                  </div>
                )}
              </div>
              
              {/* Decorative element - yellow instead of blue */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-50 rounded-bl-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No achievement records to display</p>
        </div>
      )}
    </div>
  );
};

export default Achievements;