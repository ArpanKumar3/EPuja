import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.h1 
              className="text-2xl font-bold text-brand-orange font-heading"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ePuja
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-orange transition-colors">{t('home')}</Link>
            <a href="/#pujas" className="text-gray-700 hover:text-brand-orange transition-colors">{t('pujas')}</a>
            <a href="/#pandits" className="text-gray-700 hover:text-brand-orange transition-colors">{t('pandits')}</a>
            <a href="/#about" className="text-gray-700 hover:text-brand-orange transition-colors">{t('about')}</a>
            <a href="/#contact" className="text-gray-700 hover:text-brand-orange transition-colors">{t('contact')}</a>
          </nav>

          {/* Desktop User Menu & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-brand-orange transition-colors"
            >
              <Globe size={16} />
              <span className="text-sm">{language === 'en' ? 'EN' : 'हि'}</span>
            </button>

            {user ? (
               <Link
                to="/dashboard"
                className="flex items-center space-x-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-brand-orange transition-colors"
              >
                {t('login')}
              </Link>
            )}

            <Link to="/#pujas" className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
              {t('bookNow')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="text-gray-700 hover:text-brand-orange transition-colors"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-brand-orange transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t"
            >
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-brand-orange transition-colors">{t('home')}</Link>
                <a href="/#pujas" className="text-gray-700 hover:text-brand-orange transition-colors">{t('pujas')}</a>
                <a href="/#pandits" className="text-gray-700 hover:text-brand-orange transition-colors">{t('pandits')}</a>
                <a href="/#about" className="text-gray-700 hover:text-brand-orange transition-colors">{t('about')}</a>
                <a href="/#contact" className="text-gray-700 hover:text-brand-orange transition-colors">{t('contact')}</a>
                
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {user ? (
                    <Link to="/dashboard" className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-fit">
                      Go to Dashboard
                    </Link>
                  ) : (
                    <Link to="/login" className="text-gray-700 hover:text-brand-orange transition-colors text-left">
                      {t('login')}
                    </Link>
                  )}
                  <Link to="/#pujas" className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-fit">
                    {t('bookNow')}
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
