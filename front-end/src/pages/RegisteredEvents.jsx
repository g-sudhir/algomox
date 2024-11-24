import React from 'react';
import EventCard from '../components/EventCard';

const registeredEvents = [
  {
    id: 2,
    name: 'Web Development Workshop',
    startDate: '2024-04-20',
    endDate: '2024-04-20',
    duration: '1 day',
    chiefGuest: 'John Smith',
    isRegistered: true
  }
];

function RegisteredEvents() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Registered Events</h1>
        <p className="mt-2 text-gray-600">Events you have signed up for</p>
      </div>

      {registeredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't registered for any events yet.</p>
        </div>
      )}
    </div>
  );
}

export default RegisteredEvents;