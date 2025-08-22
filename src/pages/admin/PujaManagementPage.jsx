import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { Loader, Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import PujaForm from '../../components/admin/PujaForm';

const fetchPujas = async () => {
  const { data, error } = await supabase.from('pujas').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const deletePuja = async (pujaId) => {
  const { error } = await supabase.from('pujas').delete().eq('id', pujaId);
  if (error) throw new Error(error.message);
};

const PujaManagementPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(null);

  const { data: pujas = [], isLoading, isError, error } = useQuery({ queryKey: ['adminPujas'], queryFn: fetchPujas });

  const deleteMutation = useMutation({
    mutationFn: deletePuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPujas'] });
    },
  });

  const handleDelete = (pujaId) => {
    if (window.confirm('Are you sure you want to delete this puja? This action cannot be undone.')) {
      deleteMutation.mutate(pujaId);
    }
  };

  const handleEdit = (puja) => {
    setSelectedPuja(puja);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPuja(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Puja Management</h1>
        <button onClick={handleAddNew} className="bg-primary-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center space-x-2">
          <Plus size={20} />
          <span>Add New Puja</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={32} /></div>
        ) : isError ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puja</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pujas.map(puja => (
                  <tr key={puja.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={puja.image_url} alt={puja.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{puja.name}</div>
                          <div className="text-sm text-gray-500">{puja.temple_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{puja.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{puja.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(puja.puja_date), 'MMM d, yyyy')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button onClick={() => handleEdit(puja)} className="text-primary-blue hover:text-blue-700 p-2 rounded-full hover:bg-blue-100"><Edit size={16}/></button>
                      <button onClick={() => handleDelete(puja.id)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PujaForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} puja={selectedPuja} />
    </div>
  );
};

export default PujaManagementPage;
