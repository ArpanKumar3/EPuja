import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabaseClient';
import { useForm } from 'react-hook-form';
import { Loader, Save } from 'lucide-react';

const fetchProfile = async (userId) => {
  if (!userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') { // Ignore error for no rows found
    throw new Error(error.message);
  }
  return data;
};

const updateProfile = async ({ userId, updates }) => {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
  if (error) throw new Error(error.message);
};

const MyProfilePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user?.id),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      // Add a success toast/message here
    },
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = (data) => {
    mutation.mutate({ userId: user.id, updates: data });
  };

  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-primary-blue" size={32} /></div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 font-heading">My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-md space-y-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="full_name"
            {...register('full_name', { required: 'Full name is required' })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={user?.email || ''}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            {...register('phone_number')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gotra" className="block text-sm font-medium text-gray-700">Gotra</label>
          <input
            type="text"
            id="gotra"
            {...register('gotra')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all flex items-center space-x-2 disabled:bg-opacity-50"
          >
            {mutation.isPending ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{mutation.isPending ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
        {mutation.isError && <p className="text-red-500 text-sm mt-2">Error updating profile: {mutation.error.message}</p>}
        {mutation.isSuccess && <p className="text-green-500 text-sm mt-2">Profile updated successfully!</p>}
      </form>
    </div>
  );
};

export default MyProfilePage;
