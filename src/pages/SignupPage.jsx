import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertTriangle } from 'lucide-react';

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, isSupabaseConnected } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    setSuccessMessage('');
    try {
      const { error } = await signUp({ 
        email: data.email, 
        password: data.password,
        options: {
          data: {
            full_name: data.fullName
          }
        }
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccessMessage('Success! Please check your email to confirm your account.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <Link to="/">
            <h1 className="text-3xl font-bold text-orange-600">ePuja</h1>
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community of devotees.
          </p>
        </div>
        
        {!isSupabaseConnected && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg" role="alert">
            <div className="flex">
              <div className="py-1"><AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" /></div>
              <div>
                <p className="font-bold">Supabase Not Connected</p>
                <p className="text-sm">Please add your credentials to the <code>.env</code> file to enable signup.</p>
              </div>
            </div>
          </div>
        )}

        {successMessage ? (
          <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
            <p>{successMessage}</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                placeholder="Email address"
                {...register('email', { required: 'Email is required' })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}

            <div>
              <button
                type="submit"
                disabled={loading || !isSupabaseConnected}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
