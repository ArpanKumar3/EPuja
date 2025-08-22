import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield } from 'lucide-react';

const AdminLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    try {
      const { data: { user }, error } = await signIn({ email: data.email, password: data.password });
      if (error) {
        setAuthError('Invalid credentials. Please try again.');
      } else if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setAuthError('Access Denied. You do not have admin privileges.');
        // Consider signing out the non-admin user immediately
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-primary-blue/20 text-primary-blue p-3 rounded-full mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Secure login for platform management.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              placeholder="Admin Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full pl-10 pr-3 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/30 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full pl-10 pr-3 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/30 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          {authError && <p className="text-red-400 text-sm text-center bg-red-500/20 p-3 rounded-lg">{authError}</p>}
          
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm font-medium text-primary-blue hover:underline">
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
