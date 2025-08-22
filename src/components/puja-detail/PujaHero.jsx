import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Calendar, Clock, Landmark } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { format } from 'date-fns';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const items = { days, hours, minutes, seconds };

  return (
    <div className="flex space-x-2 md:space-x-4">
      {Object.entries(items).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center text-center w-16">
          <div className="text-2xl md:text-3xl font-bold text-orange-600">{value < 10 ? `0${value}` : value}</div>
          <div className="text-xs text-gray-500 uppercase">{label}</div>
        </div>
      ))}
    </div>
  );
};

const PujaHero = ({ puja }) => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              effect="fade"
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              className="rounded-2xl shadow-2xl overflow-hidden"
            >
              {puja.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${puja.name} - view ${index + 1}`} className="w-full h-80 md:h-96 object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Right Side: Puja Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{puja.name}</h1>
            <p className="text-lg text-gray-600">{puja.shortDescription}</p>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center space-x-3">
                <Landmark className="text-orange-500" />
                <span>{puja.temple}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-orange-500" />
                <span>{format(new Date(puja.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Puja booking will close in:</h3>
              <CountdownTimer targetDate={puja.bookingEndDate} />
            </div>

            <motion.a
              href="#booking-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Book Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PujaHero;
