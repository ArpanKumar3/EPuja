import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const BookingCard = ({ puja }) => {
  const [selectedPackage, setSelectedPackage] = useState(puja.packages[0]);

  return (
    <aside id="booking-card" className="sticky top-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-6 border border-orange-100"
      >
        <div className="text-center mb-4">
          <span className="text-lg text-gray-500">Starting from</span>
          <p className="text-4xl font-bold text-gray-900">₹{puja.price.toFixed(0)}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-semibold text-gray-800 mb-2">Puja Date:</p>
          <p className="text-gray-600">{format(new Date(puja.date), 'EEEE, MMMM d, yyyy')}</p>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-gray-800 mb-2">Select a Package:</p>
          <div className="space-y-2">
            {puja.packages.map((pkg) => (
              <label
                key={pkg.name}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedPackage.name === pkg.name
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500'
                    : 'border-gray-200 hover:border-orange-400'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">{pkg.name}</p>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
                <span className="font-bold text-gray-900">₹{pkg.price}</span>
                <input
                  type="radio"
                  name="puja-package"
                  value={pkg.name}
                  checked={selectedPackage.name === pkg.name}
                  onChange={() => setSelectedPackage(pkg)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Proceed to Book (₹{selectedPackage.price})
        </motion.button>
      </motion.div>
    </aside>
  );
};

export default BookingCard;
