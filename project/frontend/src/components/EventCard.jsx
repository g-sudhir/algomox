import React from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { registerForEvent } from '../services/api';
import { getUserId } from '../utils/auth';
import toast from 'react-hot-toast';

function EventCard({ event, onRegistrationSuccess }) {
  const { _id, title, startDate, endDate, venue, imageUrl, registrations = [] } = event;
  const userId = getUserId();
  const isRegistered = registrations.some(reg => reg.user === userId);

  const handleRegister = async () => {
    try {
      if (!userId) {
        toast.error('Please login to register for events');
        return;
      }

      await registerForEvent(_id);
      toast.success('Successfully registered for the event!');
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register for event');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
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
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p>Start: {new Date(startDate).toLocaleDateString()}</p>
              <p>End: {new Date(endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{venue}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <User className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{registrations.length} registered</span>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={isRegistered}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isRegistered
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}

export default EventCard;