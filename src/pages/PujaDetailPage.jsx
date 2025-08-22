import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Plus, Minus } from 'lucide-react';

import { pujaDetailData } from '../data/pujaDetailData';
import { pujasData } from '../data/dummyData';

import ScrollspyNav from '../components/puja-detail/ScrollspyNav';
import PujaHero from '../components/puja-detail/PujaHero';
import BookingCard from '../components/puja-detail/BookingCard';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PujaDetailPage = () => {
  const { pujaId } = useParams();
  const puja = pujaDetailData[pujaId];

  const sections = [
    { id: 'about', title: 'About Puja' },
    { id: 'benefits', title: 'Benefits' },
    { id: 'process', title: 'Process' },
    { id: 'temple', title: 'Temple Details' },
    { id: 'pandit', title: 'Pandit Info' },
    { id: 'reviews', title: 'Reviews' },
    { id: 'faq', title: 'FAQ' },
    { id: 'related', title: 'Related Pujas' },
  ];

  if (!puja) {
    return <Navigate to="/" replace />;
  }

  const relatedPujas = useMemo(() => pujasData.filter(p => puja.relatedPujaIds.includes(p.id)), [puja.relatedPujaIds]);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="font-medium text-gray-700">{puja.name}</span>
        </div>
      </nav>

      <PujaHero puja={puja} />
      <ScrollspyNav sections={sections} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Main Content */}
          <main className="lg:col-span-2 space-y-16">
            <AboutSection puja={puja} />
            <BenefitsSection puja={puja} />
            <ProcessSection puja={puja} />
            <TempleSection puja={puja} />
            <PanditSection puja={puja} />
            <ReviewsSection puja={puja} />
            <FAQSection puja={puja} />
            <RelatedPujasSection relatedPujas={relatedPujas} />
          </main>

          {/* Right Column: Booking Card */}
          <div className="relative">
            <BookingCard puja={puja} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sections as internal components
const AboutSection = ({ puja }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Puja</h2>
      <div className={`text-gray-600 leading-relaxed space-y-4 relative overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-48'}`}>
        <p>{puja.about}</p>
        {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />}
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="text-orange-600 font-semibold mt-4 hover:underline">
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </motion.section>
  );
};

const BenefitsSection = ({ puja }) => (
  <motion.section id="benefits" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Puja Benefits & Highlights</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {puja.benefits.map((benefit, index) => (
        <motion.div key={index} whileHover={{ y: -5 }} className="bg-orange-50 p-6 rounded-xl flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full text-orange-600 shadow-md">
            <benefit.icon size={24} />
          </div>
          <p className="text-gray-700 font-medium">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const ProcessSection = ({ puja }) => (
  <motion.section id="process" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Puja Process</h2>
    <div className="relative border-l-2 border-orange-200 pl-8">
      {puja.process.map((step, index) => (
        <div key={step.step} className="mb-10 relative">
          <div className="absolute -left-11 top-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm ring-8 ring-white">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  </motion.section>
);

const TempleSection = ({ puja }) => (
  <motion.section id="temple" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Temple Details</h2>
    <div className="bg-gray-50 rounded-xl overflow-hidden md:flex">
      <img src={puja.templeDetails.image} alt={puja.templeDetails.name} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{puja.templeDetails.name}</h3>
        <p className="text-gray-600">{puja.templeDetails.description}</p>
      </div>
    </div>
  </motion.section>
);

const PanditSection = ({ puja }) => (
  <motion.section id="pandit" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Pandit Information</h2>
    <div className="bg-gray-50 rounded-xl p-6 md:flex items-center space-y-4 md:space-y-0 md:space-x-6">
      <img src={puja.panditInfo.image} alt={puja.panditInfo.name} className="w-32 h-32 rounded-full mx-auto md:mx-0 object-cover shadow-lg" />
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-800">{puja.panditInfo.name}</h3>
        <p className="text-orange-600 font-semibold mb-2">{puja.panditInfo.experience} years of experience</p>
        <p className="text-gray-600">{puja.panditInfo.bio}</p>
      </div>
    </div>
  </motion.section>
);

const ReviewsSection = ({ puja }) => (
  <motion.section id="reviews" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Testimonials & Reviews</h2>
    <div className="space-y-6">
      {puja.reviews.map(review => (
        <div key={review.id} className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-start space-x-4">
            <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <div className="flex items-center mb-1">
                <h4 className="font-semibold text-gray-800 mr-2">{review.name}</h4>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const FAQSection = ({ puja }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section id="faq" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {puja.faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100">
              {item.q}
              {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="p-4 text-gray-600 bg-white">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const RelatedPujasSection = ({ relatedPujas }) => (
  <motion.section id="related" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Pujas</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {relatedPujas.map(puja => (
        <Link to={`/puja/${puja.id}`} key={puja.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
          <img src={puja.image} alt={puja.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{puja.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{puja.temple}</p>
            <span className="font-bold text-orange-700">₹{puja.price.toFixed(0)}</span>
          </div>
        </Link>
      ))}
    </div>
  </motion.section>
);

export default PujaDetailPage;
