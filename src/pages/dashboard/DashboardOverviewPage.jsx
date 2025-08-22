import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarCheck, Loader } from 'lucide-react';
import { format } from 'date-fns';

const fetchDashboardData = async (userId) => {
  if (!userId) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  const { data: upcomingPujas, error: pujasError } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      pujas (
        name,
        puja_date,
        image_url
      )
    `)
    .eq('user_id', userId)
    .in('status', ['Upcoming', 'In Progress'])
    .order('created_at', { ascending: false })
    .limit(2);

  if (pujasError) throw new Error(pujasError.message);

  return { profile, upcomingPujas };
};

const DashboardOverviewPage = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData', user?.id],
    queryFn: () => fetchDashboardData(user?.id),
    enabled: !!user,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={32} /></div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-saffron to-brand-orange text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold font-heading">Namaste, {data?.profile?.full_name || 'Devotee'} 🙏</h1>
        <p className="mt-2 text-lg opacity-90">Your spiritual journey, all in one place.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/" className="bg-white text-saffron font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105 flex items-center space-x-2">
            <BookOpen size={20} />
            <span>Book New Puja</span>
          </Link>
          <Link to="pujas" className="border-2 border-white text-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-saffron transition-all hover:scale-105 flex items-center space-x-2">
            <CalendarCheck size={20} />
            <span>View Upcoming Pujas</span>
          </Link>
        </div>
      </div>

      {/* Upcoming Pujas Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 font-heading">My Upcoming Pujas</h2>
          <Link to="pujas" className="text-primary-blue font-semibold hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        {data?.upcomingPujas?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.upcomingPujas.map(puja => (
              <div key={puja.id} className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
                <img src={puja.pujas.image_url} alt={puja.pujas.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{puja.pujas.name}</h3>
                  <p className="text-sm text-gray-500">{puja.pujas.puja_date ? format(new Date(puja.pujas.puja_date), 'EEE, MMM d, yyyy') : 'Date TBD'}</p>
                  <span className={`mt-2 inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusClass(puja.status)}`}>
                    {puja.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-md">
            <p className="text-gray-600">You have no upcoming pujas.</p>
            <Link to="/" className="mt-4 inline-block bg-saffron text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105">
              Book a Puja
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
