import React, { useState } from "react";
import { FaClipboard, FaUser, FaBriefcase, FaGraduationCap, FaCode, 
  FaTrophy, FaProjectDiagram, FaCertificate, 
  FaUsers, FaHandsHelping, FaPaperPlane } from "react-icons/fa";

const Api = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const API_BASE_URL = "https://raw.githubusercontent.com/fionajores/fiona_api/main/db.json";

  const apiEndpoints = [
    { name: "Profile", endpoint: "/profile", method: "GET", icon: <FaUser /> },
    { name: "Internships", endpoint: "/internships", method: "GET", icon: <FaBriefcase /> },
    { name: "Education", endpoint: "/education", method: "GET", icon: <FaGraduationCap /> },
    { name: "Skills", endpoint: "/skills", method: "GET", icon: <FaCode /> },
    { name: "Achievements", endpoint: "/achievements", method: "GET", icon: <FaTrophy /> },
    { name: "Projects", endpoint: "/projects", method: "GET", icon: <FaProjectDiagram /> },
    { name: "Certifications", endpoint: "/certifications", method: "GET", icon: <FaCertificate /> },
    { name: "Open Source", endpoint: "/openSourceContributions", method: "GET", icon: <FaUsers /> },
    { name: "Teamwork", endpoint: "/teamwork", method: "GET", icon: <FaHandsHelping /> },
  ];

  const copyToClipboard = (endpoint) => {
    const fullUrl = endpoint ? `${API_BASE_URL}${endpoint}` : API_BASE_URL;
    navigator.clipboard.writeText(fullUrl);
    setShowCopyNotification(true);
    setIsSidebarOpen(false);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg shadow-lg border mb-5 border-green-100 relative">
      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <FaClipboard className="w-4 h-4" />
          Copied to clipboard!
        </div>
      )}

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
      >
        {isSidebarOpen ? "Close API List" : "Open API List"}
      </button>

      <div className="hidden md:block">
        <h3 className="text-xl font-semibold mb-3 text-green-600">API Endpoints</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-700 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-700 uppercase">Endpoint</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-700 uppercase">Method</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-200">
              {apiEndpoints.map((api, index) => (
                <tr key={index} className="hover:bg-green-50">
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-green-600">{api.icon}</span>
                    {api.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 font-mono">
                    {API_BASE_URL}{api.endpoint}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      api.method === "GET" ? "text-blue-800 bg-blue-100" : "text-green-800 bg-green-100"
                    }`}>
                      {api.method}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => copyToClipboard(api.endpoint)}
                      className="hover:text-green-800 transition-colors p-1 rounded hover:bg-green-100"
                      aria-label={`Copy ${api.endpoint} to clipboard`}
                    >
                      <FaClipboard className="w-5 h-5 text-green-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-green-600">API Endpoints</h3>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2">
                {apiEndpoints.map((api, index) => (
                  <li key={index} className="flex items-center justify-between p-2 hover:bg-green-50 rounded">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-green-600">{api.icon}</span>
                      <div className="overflow-hidden">
                        <p className="text-sm text-gray-700 truncate">{api.name}</p>
                        <p className="text-xs text-gray-500 font-mono truncate">
                          {API_BASE_URL}{api.endpoint}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(api.endpoint)}
                      className="p-1 text-green-600 hover:text-green-800 ml-2"
                      aria-label={`Copy ${api.endpoint} to clipboard`}
                    >
                      <FaClipboard className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Api;