import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader, Landmark, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

const fetchTransactions = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const WalletPage = () => {
  const { user } = useAuth();
  const { data: transactions = [], isLoading, isError, error } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => fetchTransactions(user?.id),
    enabled: !!user,
  });

  const walletBalance = transactions.reduce((acc, t) => {
    return t.type === 'credit' ? acc + t.amount : acc - t.amount;
  }, 5000); // Assuming a starting balance for demo

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 font-heading">My Wallet</h1>

      <div className="bg-primary-blue text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-lg font-medium opacity-80">Current Balance</h2>
        <p className="text-5xl font-bold font-heading mt-2">₹{walletBalance.toFixed(2)}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 font-heading mb-4">Transaction History</h2>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          {isLoading ? (
            <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={32} /></div>
          ) : isError ? (
            <div className="text-red-500">Error: {error.message}</div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-4 ${t.type === 'debit' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {t.type === 'debit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{t.description}</div>
                            <div className="text-sm text-gray-500">{t.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(t.created_at), 'MMM d, yyyy')}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${t.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                        {t.type === 'debit' ? '-' : '+'}₹{t.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">No transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
