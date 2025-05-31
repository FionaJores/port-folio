import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = ({ response }) => {
  const profileData = response || {};

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-8">
      {/* Profile Header - Perfectly Centered */}
      <div className="flex flex-col items-center">
        <img
          src={profileData.image} 
          alt="Profile"
          className="w-28 h-28 rounded-full mb-4 border-2 border-gray-200 object-cover"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-gray-600 mt-1">{profileData.college}</p>
        </div>
      </div>

      {/* About Me - Clean Paragraph Alignment */}
      <div className="space-y-4 text-center">
        <p className="text-gray-700 leading-relaxed">
          Passionate developer who believes the best solutions come from <span className="font-medium text-gray-800">team collaboration</span> and <span className="font-medium text-gray-800">creative problem-solving</span>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Constantly expanding my skills through hands-on projects and <span className="font-medium text-gray-800">continuous learning</span> of new technologies.
        </p>
      </div>

      {/* Social Links - Perfectly Aligned Icons */}
      <div className="flex justify-center space-x-6 pt-2">
        <a
          href={profileData.links?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
        <a
          href={profileData.links?.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Profile;