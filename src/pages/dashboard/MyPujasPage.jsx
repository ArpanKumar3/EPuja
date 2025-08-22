import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader, Calendar, Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';

const fetchBookedPujas = async (userId) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      created_at,
      pujas (
        id,
        name,
        puja_date,
        time,
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

const MyPujasPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const { data: bookings = [], isLoading, isError, error } = useQuery({
    queryKey: ['bookedPujas', user?.id],
    queryFn: () => fetchBookedPujas(user?.id),
    enabled: !!user,
  });

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'All') return true;
    return booking.status === filter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filters = ['All', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 font-heading">My Pujas</h1>

      <div className="flex space-x-2 border-b border-gray-200">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              filter === f
                ? 'bg-white border-b-2 border-primary-blue text-primary-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={32} /></div>}
      {isError && <div className="text-red-500">Error: {error.message}</div>}

      {!isLoading && !isError && (
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white p-4 rounded-xl shadow-md transition-shadow hover:shadow-lg md:flex md:items-center md:space-x-6">
                <img src={booking.pujas.image_url} alt={booking.pujas.name} className="w-full h-40 md:w-32 md:h-24 rounded-lg object-cover" />
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-gray-800">{booking.pujas.name}</h2>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{booking.pujas.puja_date ? format(new Date(booking.pujas.puja_date), 'MMM d, yyyy') : 'Date TBD'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{booking.pujas.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-primary-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center space-x-2">
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <p className="text-gray-600">No pujas found for this filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPujasPage;
