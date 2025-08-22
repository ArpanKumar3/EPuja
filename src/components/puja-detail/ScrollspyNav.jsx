import React from 'react';
import { motion } from 'framer-motion';
import { useScrollspy } from '../../hooks/useScrollspy';

const ScrollspyNav = ({ sections }) => {
  const activeId = useScrollspy(sections.map(s => s.id));

  return (
    <nav className="sticky top-16 bg-white/80 backdrop-blur-lg shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-14 space-x-4 md:space-x-8 overflow-x-auto">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`relative text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                activeId === section.id
                  ? 'text-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {section.title}
              {activeId === section.id && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ScrollspyNav;
