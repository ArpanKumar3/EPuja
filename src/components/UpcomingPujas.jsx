import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Filter, X, ChevronDown, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

const MotionLink = motion(Link);

const fetchPujas = async () => {
  const { data, error } = await supabase
    .from('pujas')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const UpcomingPujas = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemple, setSelectedTemple] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  const { data: pujasData = [], isLoading, isError } = useQuery({
    queryKey: ['pujas'],
    queryFn: fetchPujas,
  });

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(pujasData.map(p => p.category))];
    return [
      { value: 'all', label: t('allCategories') },
      ...uniqueCategories.map(cat => ({ value: cat, label: t(cat) || cat }))
    ];
  }, [pujasData, t]);

  const temples = useMemo(() => {
    const uniqueTemples = [...new Set(pujasData.map(p => p.temple_name))];
    return [
      { value: 'all', label: t('allTemples') },
      ...uniqueTemples.map(temple => ({ value: temple, label: temple }))
    ];
  }, [pujasData, t]);

  const filteredPujas = useMemo(() => {
    return pujasData.filter(puja => {
      const categoryMatch = selectedCategory === 'all' || puja.category === selectedCategory;
      const templeMatch = selectedTemple === 'all' || puja.temple_name === selectedTemple;
      const dateMatch = !selectedDate || puja.puja_date === selectedDate;
      
      return categoryMatch && templeMatch && dateMatch;
    });
  }, [pujasData, selectedCategory, selectedTemple, selectedDate]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTemple('all');
    setSelectedDate('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTemple !== 'all' || selectedDate !== '';

  const CustomDropdown = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || { label: placeholder, value: 'all' };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-brand-orange focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors"
        >
          <span className={value === 'all' ? 'text-gray-500' : 'text-gray-900'}>
            {selectedOption.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: '#fed7aa' }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors ${
                    value === option.value ? 'bg-orange-100 text-brand-orange font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isOpen && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section id="pujas" className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 flex justify-center items-center min-h-[50vh]">
        <Loader className="animate-spin text-brand-orange" size={48} />
      </section>
    );
  }

  if (isError) {
    return (
      <section id="pujas" className="py-16 bg-red-50 text-center">
        <h2 className="text-2xl font-bold text-red-600">Failed to load pujas.</h2>
        <p className="text-red-500">Please try again later.</p>
      </section>
    );
  }

  return (
    <section id="pujas" className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {t('upcomingPujas')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of authentic pujas and ceremonies
          </p>
        </motion.div>

        <div className="lg:hidden mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <Filter size={20} />
            <span className="font-medium">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
            {hasActiveFilters && (
              <span className="bg-white text-brand-orange text-xs px-2 py-1 rounded-full font-bold">
                {[selectedCategory !== 'all', selectedTemple !== 'all', selectedDate !== ''].filter(Boolean).length}
              </span>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('filterByCategory')}</label>
                    <CustomDropdown value={selectedCategory} onChange={setSelectedCategory} options={categories} placeholder={t('allCategories')}/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('filterByTemple')}</label>
                    <CustomDropdown value={selectedTemple} onChange={setSelectedTemple} options={temples} placeholder={t('allTemples')}/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('filterByDate')}</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-brand-orange focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors"/>
                  </div>
                  <div className="flex items-end">
                    <AnimatePresence>
                      {hasActiveFilters && (
                        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={clearFilters} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors w-full justify-center">
                          <X size={16} />
                          <span className="font-medium">{t('clearFilters')}</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.slice(1, 6).map((category) => (
            <motion.button key={category.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category.value)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${ selectedCategory === category.value ? 'bg-gradient-to-r from-brand-orange to-yellow-500 text-white shadow-lg' : 'bg-white/70 text-gray-700 hover:bg-orange-100 border border-orange-200' }`}>
              {category.label}
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <p className="text-gray-600 font-medium">
            Found {filteredPujas.length} puja{filteredPujas.length !== 1 ? 's' : ''}
            {hasActiveFilters && (<span className="text-brand-orange"> with current filters</span>)}
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPujas.map((puja) => (
              <MotionLink
                to={`/puja/${puja.id}`}
                key={puja.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl border border-orange-100 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} src={puja.image_url} alt={puja.name} className="w-full h-48 object-cover"/>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-gradient-to-r from-brand-orange to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t(puja.category)}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-orange transition-colors font-heading">{puja.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2 text-brand-orange" />
                    {puja.temple_name}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{puja.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-brand-orange" />
                      {puja.puja_date ? format(new Date(puja.puja_date), 'PPP') : 'Date not available'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2 text-brand-orange" />
                      {puja.time} ({puja.duration})
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-yellow-600 bg-clip-text text-transparent">₹{puja.price.toFixed(0)}</span>
                    <div className="bg-gradient-to-r from-brand-orange to-yellow-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium">{t('bookNow')}</div>
                  </div>
                </div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPujas.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-gray-300 mb-6">
              <Calendar size={80} className="mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4 font-heading">No pujas found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any pujas matching your current filters. Try adjusting your search criteria.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={clearFilters} className="bg-gradient-to-r from-brand-orange to-yellow-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">Clear all filters</motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UpcomingPujas;
