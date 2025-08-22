import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useLanguage();

  const socialIcons = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-orange-400 mb-4"
            >
              ePuja
            </motion.h3>
            <p className="text-gray-300 mb-4">
              Experience divine blessings online with our verified pandits and authentic ceremonies.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('home'), href: '#home' },
                { label: t('pujas'), href: '#pujas' },
                { label: t('pandits'), href: '#pandits' },
                { label: t('about'), href: '#about' }
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              {[
                `${t('festival')} Pujas`,
                `${t('wedding')} Ceremonies`,
                `${t('housewarming')} Pujas`,
                `${t('health')} Pujas`
              ].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t('support')}</h4>
            <div className="space-y-3">
              {[
                { Icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
                { Icon: Mail, text: 'support@epuja.com', href: 'mailto:support@epuja.com' },
                { Icon: MapPin, text: 'Mumbai, India', href: '#' }
              ].map(({ Icon, text, href }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <Icon size={16} className="mr-2 text-orange-400" />
                  <a href={href} className="text-gray-300 hover:text-orange-400 transition-colors">
                    {text}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2025 ePuja. {t('allRightsReserved')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
