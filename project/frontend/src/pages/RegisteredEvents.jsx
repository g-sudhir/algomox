import React, { useState, useEffect } from 'react';
// import { getRegisteredEvents } from '../services/mockApi';
import { fetchMyEvents } from '../services/api';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

function RegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegisteredEvents();
  }, []);

  const loadRegisteredEvents = async () => {
    try {
      const events = await fetchMyEvents();
      // console.log(await fetchMyEvents());
      setRegisteredEvents(events);
    } catch (error) {
      toast.error('Failed to load registered events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Registered Events</h1>
        <p className="mt-2 text-gray-600">Events you have signed up for</p>
      </div>

      {registeredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event}
              onRegistrationSuccess={loadRegisteredEvents}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">You haven't registered for any events yet.</p>
          <button
            onClick={() => window.location.href = '/events'}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Browse Events
          </button>
        </div>
      )}
    </div>
  );
}

export default RegisteredEvents;
