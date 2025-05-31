import React from 'react';

const Opensource = ({ response }) => {
  return (
    <div className="space-y-8 p-6">
      {response.map((project, index) => (
        <div
          key={index}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Image Section (Top) */}
          <div className="w-full">
            <img
              className="w-full h-64 object-cover"
              src={project.image}
              alt={project.project_name}
            />
          </div>

          {/* Content Section (Bottom) */}
          <div className="p-8 bg-gradient-to-r from-green-50 to-green-100">
            {/* Project Name */}
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {project.project_name}
            </h2>

            {/* Role */}
            <p className="text-lg text-green-700 font-semibold mb-4">
              {project.role}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <span className="text-sm text-green-600 font-medium">
                Technologies used:
              </span>
              <div className="flex flex-wrap mt-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-block bg-green-200 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{project.description}</p>

            {/* Contribution Link */}
            <a
              href={project.contribution_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              View Contribution
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Opensource;