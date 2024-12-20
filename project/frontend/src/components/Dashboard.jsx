import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EventCard from './EventCard';
import { fetchEvents } from './../services/api';
import { getUserId } from '../utils/auth';

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const userId = getUserId();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
      categorizeEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const categorizeEvents = (events) => {
    const now = new Date();
    const upcoming = [];
    const registered = [];
    const past = [];

    events.forEach(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const isRegistered = event.registrations.some(reg => reg.user === userId);

      if (endDate < now) {
        past.push(event);
      } else if (startDate > now) {
        upcoming.push(event);
      }

      if (isRegistered) {
        registered.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setRegisteredEvents(registered);
    setPastEvents(past);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome to EventHub</h1>
        <p className="text-indigo-100 mb-4">Discover and participate in exciting events!</p>
        <button 
          onClick={() => navigate('/events')}
          className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          Browse All Events
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      {/* Featured Events Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
          <button 
            onClick={() => navigate('/events')}
            className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.slice(0, 2).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-indigo-600">{upcomingEvents.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Registered Events</h3>
          <p className="text-3xl font-bold text-green-600">{registeredEvents.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Past Events</h3>
          <p className="text-3xl font-bold text-gray-600">{pastEvents.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
