import React from "react";

const Skills = ({ response }) => {
    if (!response || !Array.isArray(response)) {
        return <p className="text-red-600">No skills data available.</p>;
      }
    
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Skills</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 justify-center items-center">
        {response.map((s, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition duration-300"
          >
            <img src={s.icon} alt={s.skill} className="w-16 h-16" />
            <span className="mt-2 text-lg font-medium">{s.skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
