import React from 'react';
import { Search, Calendar, CreditCard, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: CreditCard,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Video,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: 'bg-orange-100 text-orange-600'
    }
  ];

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to book your divine experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="text-center relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform translate-x-4"></div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`inline-flex p-4 rounded-full ${step.color} mb-4 relative`}
              >
                <step.icon size={32} />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  className="absolute -top-2 -left-2 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  {index + 1}
                </motion.div>
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
