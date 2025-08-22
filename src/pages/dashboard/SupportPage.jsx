import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a puja?',
    a: 'You can book a puja by navigating to the "Upcoming Pujas" section, selecting a puja, and clicking the "Book Now" button. Follow the on-screen instructions to complete your booking.'
  },
  {
    q: 'What happens after I book a puja?',
    a: 'Once your booking is confirmed, you will receive an email with all the details, including the date, time, and a link to join the live stream of the puja. You can also see your booked pujas in the "My Pujas" section of your dashboard.'
  },
  {
    q: 'Can I get a refund if I cancel my booking?',
    a: 'Our refund policy depends on how far in advance you cancel the booking. Please refer to our Terms of Service for detailed information or contact our support team.'
  },
  {
    q: 'How do I update my profile information?',
    a: 'You can update your personal details, such as your name, address, and gotra, in the "My Profile" section of your dashboard.'
  }
];

const SupportPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 font-heading">Support & FAQs</h1>

      {/* FAQ Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 font-heading mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span>{item.q}</span>
                {activeIndex === index ? <Minus size={20} className="text-primary-blue" /> : <Plus size={20} className="text-gray-500"/>}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    <div className="p-4 text-gray-600 bg-white border-t border-gray-200">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 font-heading mb-6">Contact Support</h2>
        <p className="text-gray-600 mb-4">If you can't find the answer you're looking for, please don't hesitate to reach out to our support team.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue sm:text-sm"></textarea>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-primary-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
