import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader, BookOpen, CalendarCheck, IndianRupee, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fetchStats = async () => {
  const { count: totalPujas, error: pujasError } = await supabase.from('pujas').select('*', { count: 'exact', head: true });
  if (pujasError) throw new Error(pujasError.message);

  const { count: totalBookings, error: bookingsError } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
  if (bookingsError) throw new Error(bookingsError.message);

  const { data: transactions, error: transactionsError } = await supabase.from('transactions').select('amount').eq('type', 'debit');
  if (transactionsError) throw new Error(transactionsError.message);
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

  const { count: totalUsers, error: usersError } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  if (usersError) throw new Error(usersError.message);
  
  // For charts
  const { data: bookingsByCategory, error: categoryError } = await supabase.rpc('get_bookings_by_category');
  if(categoryError) throw new Error(categoryError.message);

  return { totalPujas, totalBookings, totalRevenue, totalUsers, bookingsByCategory };
};

const COLORS = ['#0a66c2', '#ff9933', '#10B981', '#8B5CF6', '#EF4444'];

const AdminDashboardPage = () => {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['adminStats'], queryFn: fetchStats });

  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={48} /></div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  const statsCards = [
    { title: 'Total Pujas', value: data.totalPujas, icon: BookOpen, color: 'text-blue-500' },
    { title: 'Total Bookings', value: data.totalBookings, icon: CalendarCheck, color: 'text-green-500' },
    { title: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-saffron' },
    { title: 'Total Users', value: data.totalUsers, icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 font-heading">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map(card => (
          <div key={card.title} className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.bookingsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="booking_count" fill="#0a66c2" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bookings by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.bookingsByCategory} dataKey="booking_count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                {data.bookingsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
