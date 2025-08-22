import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { panditsData } from '../data/dummyData';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const MeetPandits = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="pandits" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('meetPandits')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with our experienced and verified pandits for authentic ceremonies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {panditsData.map((pandit) => (
            <motion.div
              key={pandit.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={pandit.image}
                alt={pandit.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pandit.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <MapPin size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{pandit.location}</span>
                </div>

                <div className="flex items-center mb-3">
                  <Star size={16} className="text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">
                    {pandit.rating} ({pandit.reviews} reviews)
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-sm font-medium text-orange-600">
                    {pandit.experience} {t('years')} {t('experience')}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {pandit.specialization}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {t('viewProfile')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MeetPandits;
