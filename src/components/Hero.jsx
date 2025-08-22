import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { devoteeImages } from '../data/dummyData';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = () => {
  const { t } = useLanguage();

  // Temple/devotee images for the carousel
  const templeImages = [
    'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x500/FF6B35/FFFFFF?text=Temple+1',
    'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x500/8B5CF6/FFFFFF?text=Temple+2',
    'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x500/10B981/FFFFFF?text=Temple+3',
    'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x500/F59E0B/FFFFFF?text=Temple+4',
    'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x500/EF4444/FFFFFF?text=Temple+5'
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [5, 0, 5]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-orange-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-medium shadow-lg"
            >
              <span className="mr-2">🙏</span>
              {t('welcomeText')}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Puja Seva
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-lg"
            >
              Book authentic pujas online with blessings from temples. Experience divine ceremonies from the comfort of your home.
            </motion.p>

            {/* How Puja Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600"
            >
              {t('howPujaWorks')}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(234, 88, 12, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl transition-all duration-300"
              >
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                
                {/* Button content */}
                <span className="relative flex items-center space-x-2">
                  <span>Participate Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.span>
                </span>

                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: [-100, 300] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex space-x-8 pt-8"
            >
              {[
                { number: '50K+', label: 'Happy Devotees' },
                { number: '500+', label: 'Verified Pandits' },
                { number: '25K+', label: 'Pujas Completed' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-orange-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Temple Carousel */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-100 p-6">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="rounded-2xl overflow-hidden"
              >
                {templeImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-96 md:h-[500px]"
                    >
                      <img
                        src={image}
                        alt={`Temple ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Floating Devotee Images */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex -space-x-2">
                {devoteeImages.slice(0, 4).map((devotee, index) => (
                  <motion.img
                    key={devotee.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    src={devotee.image}
                    alt={devotee.name}
                    className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Join 50K+ devotees
              </p>
            </motion.div>

            {/* Floating Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 1.5 + i * 0.1 
                    }}
                    className="text-yellow-400 text-lg"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                4.9/5 Rating
              </p>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 text-4xl opacity-20"
            >
              🕉️
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-20 left-10 text-3xl opacity-30"
            >
              🪔
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
