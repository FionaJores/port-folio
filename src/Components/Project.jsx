import React from "react";
import { FaGithub, FaCode } from "react-icons/fa";

const Project = ({ response }) => {
  if (!response || !Array.isArray(response)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-medium">No projects available</div>
        <p className="text-gray-500 mt-2">Check back later for my latest work</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <FaCode className="text-gray-800" />
          My Projects
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practical applications of my skills and creative problem-solving
        </p>
      </div>

      {response.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.map((project, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <FaCode className="text-gray-800 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-5">{project.description}</p>

                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center w-full justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
                  >
                    <FaGithub className="mr-2" />
                    View Code
                  </a>
                )}
              </div>
              
              {/* Decorative element in gray */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gray-100 rounded-bl-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No projects to display yet</p>
        </div>
      )}
    </div>
  );
};

export default Project;