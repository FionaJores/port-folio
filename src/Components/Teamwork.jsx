import React from 'react';

const Teamwork = ({ response }) => {
 
  const teamworkEvents = response|| [];
  //console.log(teamworkEvents);

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Teamwork
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamworkEvents.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Event Image */}
            <img
              className="w-full h-64 object-cover"
              src={event.photo}
              alt={event.eventName}
            />

            {/* Event Details */}
            <div className="p-4">
              {/* Event Name */}
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {event.eventName}
              </h3>

              {/* Team Members */}
              <div className="mb-3">
                <span className="text-sm text-green-600 font-medium">
                  Team Members:
                </span>
                <div className="flex flex-wrap mt-1">
                  {event.teamMembers.map((member, idx) => (
                    <a
                      key={idx}
                      href={member.linkedin}
                      rel="noopener noreferrer"
                      className="inline-block bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2 hover:bg-green-200 transition duration-300"
                    >
                      {member.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Event Description */}
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teamwork;