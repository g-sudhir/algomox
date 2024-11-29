import React from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

function EventCard({ event }) {
  const { name, startDate, endDate, duration, chiefGuest, isRegistered, image } = event;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {isRegistered && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Registered
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{name}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p>Start: {new Date(startDate).toLocaleDateString()}</p>
              <p>End: {new Date(endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{duration}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <User className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{chiefGuest}</span>
          </div>
        </div>

        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isRegistered
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
          disabled={isRegistered}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}

export default EventCard;