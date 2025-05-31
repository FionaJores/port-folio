import React, { useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import Internships from "./Internships";
import Education from "./Education";
import Skills from "./Skills";
import Achievements from "./Achievements";
import Project from "./Project";
import Certifications from "./Certifications";
import Opensource from "./Opensource";
import Teamwork from "./Teamwork";
import Api from "./Api";

const Home = () => {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestBody, setRequestBody] = useState("");
  const [showUI, setShowUI] = useState(false);
  const [responseDetails, setResponseDetails] = useState({
    status: null,
    size: null,
    time: null,
  });
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const API_BASE_URL = "https://raw.githubusercontent.com/fionajores/fiona_api/main/db.json";

  const handleSearch = async () => {
    if (!apiEndpoint) {
      setError("Please enter an API endpoint.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    setResponseDetails({ status: null, size: null, time: null });
    setFeedbackSubmitted(false);

    try {
      // Check if the endpoint follows the pattern /db.json/<section>
      const isNestedEndpoint = apiEndpoint.includes(`${API_BASE_URL}/`);
      let url = apiEndpoint;
      let targetSection = null;

      if (isNestedEndpoint) {
        // Extract the section name (everything after the last slash)
        const parts = apiEndpoint.split('/');
        targetSection = parts[parts.length - 1];
        url = API_BASE_URL; // We'll fetch the full JSON
      }

      const config = {
        method,
        url,
        data: method !== "GET" ? JSON.parse(requestBody || "{}") : undefined,
      };

      const startTime = Date.now();
      const res = await axios(config);
      const endTime = Date.now();

      let responseData = res.data;

      // If this was a nested endpoint request, extract the specific section
      if (isNestedEndpoint && targetSection) {
        if (res.data[targetSection]) {
          responseData = res.data[targetSection];
        } else {
          throw new Error(`Section '${targetSection}' not found in the API response`);
        }
      }

      setResponse(responseData);
      setResponseDetails({
        status: res.status,
        size: JSON.stringify(responseData).length,
        time: endTime - startTime,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setFeedbackSubmitted(false);

    try {
      const startTime = Date.now();
      const res = await axios.post(apiEndpoint, feedbackData);
      const endTime = Date.now();

      setResponse(res.data);
      setFeedbackSubmitted(true);
      setResponseDetails({
        status: res.status,
        size: JSON.stringify(res.data).length,
        time: endTime - startTime,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadExample = (section = null) => {
    if (section) {
      setApiEndpoint(`${API_BASE_URL}/${section}`);
    } else {
      setApiEndpoint(API_BASE_URL);
    }
    setMethod("GET");
    setRequestBody("");
  };

  const getResponseType = (response) => {
    if (!response) return null;
    
    // Handle both direct responses and nested responses
    if ((response.profile && response.profile.name) || response.name) {
      return "profile";
    }
    if ((response.internships && Array.isArray(response.internships)) || 
        (Array.isArray(response) && response[0]?.company)) {
      return "internships";
    }
    if ((response.education && Array.isArray(response.education)) || 
        (Array.isArray(response) && response[0]?.institution)) {
      return "education";
    }
    if ((response.skills && Array.isArray(response.skills)) || 
        (Array.isArray(response) && response[0]?.skill)) {
      return "skills";
    }
    if ((response.projects && Array.isArray(response.projects)) || 
        (Array.isArray(response) && response[0]?.github_link)) {
      return "projects";
    }
    if ((response.certifications && Array.isArray(response.certifications)) || 
        (Array.isArray(response) && response[0]?.course_name)) {
      return "certifications";
    }
    if ((response.achievements && Array.isArray(response.achievements)) || 
        (Array.isArray(response) && response[0]?.title)) {
      return "achievements";
    }
    if ((response.openSource && Array.isArray(response.openSource)) || 
        (Array.isArray(response) && response[0]?.contribution_link)) {
      return "open";
    }
    if ((response.teamwork && Array.isArray(response.teamwork)) || 
        (Array.isArray(response) && response[0]?.eventName)) {
      return "team";
    }
    
    return null;
  };

  const isFeedbackEndpoint = apiEndpoint.includes("send-feedback") && method === "POST";

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
          DevPort: Where Portfolio Meets API Academy
        </h1>

        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 border border-green-100">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Welcome to My Portfolio!
          </h2>
          <p className="mb-4">
            Hi, I'm <span className="font-semibold text-green-600">FIONA JORES MARSHAL</span>, 
            a developer passionate about building web applications. 
            Explore my projects below 
            and try the <span className="text-blue-600 font-medium">live API tester </span> 
            to interact with my portfolio endpoints.
          </p>
          <div className="flex flex-wrap gap-2">
           
            <button
              onClick={() => loadExample("profile")}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Load Profile
            </button>
           
          </div>
        </div>
        
        <Api/>

        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 border border-green-100">
          <h3 className="text-xl font-semibold mb-4 text-green-600">
            Make a Request
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="p-3 bg-white text-gray-800 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder={`Enter API endpoint (e.g. ${API_BASE_URL}/profile)`}
              className="flex-1 p-3 bg-white text-gray-800 rounded-lg border border-green-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!isFeedbackEndpoint && (
              <button
                onClick={handleSearch}
                disabled={loading}
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                {loading ? "Loading..." : "Send Request"}
              </button>
            )}
          </div>

          {method !== "GET" && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-green-600">
                Request Body
              </h4>
              {isFeedbackEndpoint ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h5 className="font-medium text-yellow-700 mb-2">JSON Body Structure (what will be sent to API):</h5>
                    <pre className="text-sm bg-white p-3 rounded overflow-x-auto">
                      {JSON.stringify({
                        name: "string",
                        email: "string",
                        message: "string"
                      }, null, 2)}
                    </pre>
                    <p className="mt-2 text-sm text-gray-600">
                      The form below will generate this JSON structure when submitted.
                    </p>
                  </div>
                  
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    {feedbackSubmitted ? (
                      <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                        Thank you for your feedback!
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">Name:</label>
                            <input
                              type="text"
                              name="name"
                              value={feedbackData.name}
                              onChange={handleFeedbackChange}
                              className="w-full p-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Email:</label>
                            <input
                              type="email"
                              name="email"
                              value={feedbackData.email}
                              onChange={handleFeedbackChange}
                              className="w-full p-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">Message:</label>
                          <textarea
                            name="message"
                            value={feedbackData.message}
                            onChange={handleFeedbackChange}
                            className="w-full p-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                            rows="4"
                            required
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Current JSON payload:
                            <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                              {JSON.stringify(feedbackData, null, 2)}
                            </pre>
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            {loading ? "Sending..." : "Send Feedback"}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              ) : (
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder="Enter JSON request body"
                  className="w-full p-3 bg-white text-gray-800 rounded-lg border border-green-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={6}
                />
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 rounded-lg text-red-600">
            Error: {error}
          </div>
        )}

        {response && (
          <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-100">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
              API Response
            </h3>

            <div className="mb-4 flex flex-row gap-4">
              <p className={`text-sm font-medium ${
                responseDetails.status >= 200 && responseDetails.status < 300
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                <strong className="text-black">Status:</strong> {responseDetails.status}
              </p>
              <p className={`text-sm font-medium ${
                responseDetails.status >= 200 && responseDetails.status < 300
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                <strong className="text-black">Size:</strong> {responseDetails.size} Bytes
              </p>
              <p className={`text-sm font-medium ${
                responseDetails.status >= 200 && responseDetails.status < 300
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                <strong className="text-black">Time:</strong> {responseDetails.time} ms
              </p>
            </div>

            {!isFeedbackEndpoint && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="showUI"
                  checked={showUI}
                  onChange={(e) => setShowUI(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showUI" className="text-gray-700">
                  Show Response in UI Format
                </label>
              </div>
            )}

            {showUI && !isFeedbackEndpoint ? (
              getResponseType(response) === "profile" ? (
                <Profile response={response.profile || response} />
              ) : getResponseType(response) === "internships" ? (
                <Internships response={response.internships || response} />
              ) : getResponseType(response) === "education" ? (
                <Education response={response.education || response} />
              ) : getResponseType(response) === "skills" ? (
                <Skills response={response.skills || response} />
              ) : getResponseType(response) === "achievements" ? (
                <Achievements response={response.achievements || response}/>
              ) : getResponseType(response) === "projects" ? (
                <Project response={response.projects || response}/>
              ) : getResponseType(response) === "certifications" ? (
                <Certifications response={response.certifications || response}/>
              ) : getResponseType(response) === "open" ? (
                <Opensource response={response.openSourceContributions || response} />
              ) : getResponseType(response) === "team" ? (
                <Teamwork response={response.teamwork || response}/>
              ) : (
                <p className="text-red-600">Unknown response type.</p>
              )
            ) : (
              <pre className="overflow-x-auto p-4 bg-white text-gray-800 rounded-lg border border-green-200 text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        )}

        <div className="bg-green-50 p-6 rounded-lg shadow-lg mt-8 border border-green-100">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Learn About APIs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-700 uppercase">
                    HTTP Method
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-700 uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-200">
                <tr>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                      GET
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Retrieve data from the server.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                      POST
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Send data to the server.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      PUT
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Update existing data on the server.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                      DELETE
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Remove data from the server.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 