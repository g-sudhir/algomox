import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';

function Events() {
  const [searchTerm, setSearchTerm] = useState('');

  const allEvents = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      startDate: '2024-04-15',
      endDate: '2024-04-17',
      duration: '3 days',
      chiefGuest: 'Dr. Sarah Johnson',
      isRegistered: false,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 2,
      name: 'Web Development Workshop',
      startDate: '2024-04-20',
      endDate: '2024-04-20',
      duration: '1 day',
      chiefGuest: 'John Smith',
      isRegistered: true,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 3,
      name: 'AI & ML Summit',
      startDate: '2024-05-01',
      endDate: '2024-05-03',
      duration: '3 days',
      chiefGuest: 'Prof. Michael Chen',
      isRegistered: false,
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 4,
      name: 'Design Systems Workshop',
      startDate: '2024-05-15',
      endDate: '2024-05-15',
      duration: '1 day',
      chiefGuest: 'Emma Thompson',
      isRegistered: false,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const filteredEvents = allEvents.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-gray-600">Discover and register for exciting events</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Events;