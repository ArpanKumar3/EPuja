import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      // Header
      home: 'Home',
      pujas: 'Pujas',
      pandits: 'Pandits',
      about: 'About',
      contact: 'Contact',
      bookNow: 'Book Now',
      login: 'Login',
      profile: 'Profile',
      myPujas: 'My Pujas',
      myChadhava: 'My Chadhava',
      logout: 'Logout',
      
      // Hero
      welcomeText: 'Welcome to Sri Mandir Puja Seva',
      howPujaWorks: 'How Puja Seva Works?',
      heroTitle: 'Experience Divine Blessings Online',
      heroSubtitle: 'Book authentic pujas and ceremonies with verified pandits from the comfort of your home',
      explorePujas: 'Explore Pujas',
      happyDevotees: 'Happy Devotees',
      
      // Upcoming Pujas
      upcomingPujas: 'Upcoming Pujas',
      allCategories: 'All Categories',
      allTemples: 'All Temples',
      selectDate: 'Select Date',
      filterByTemple: 'Filter by Temple',
      filterByCategory: 'Filter by Category',
      filterByDate: 'Filter by Date',
      clearFilters: 'Clear Filters',
      
      // How It Works
      howItWorks: 'How It Works',
      step1Title: 'Choose Your Puja',
      step1Desc: 'Browse our collection of authentic pujas and select the one that suits your needs',
      step2Title: 'Select Date & Time',
      step2Desc: 'Pick your preferred date and time slot for the ceremony',
      step3Title: 'Book & Pay',
      step3Desc: 'Complete your booking with secure payment options',
      step4Title: 'Join Online',
      step4Desc: 'Participate in the live ceremony from anywhere',
      
      // Stats
      verifiedPandits: 'Verified Pandits',
      pujasCompleted: 'Pujas Completed',
      citiesServed: 'Cities Served',
      
      // Testimonials
      testimonials: 'What Our Devotees Say',
      
      // Meet the Pandits
      meetPandits: 'Meet Our Verified Pandits',
      experience: 'Experience',
      years: 'Years',
      viewProfile: 'View Profile',
      
      // Footer
      quickLinks: 'Quick Links',
      services: 'Services',
      support: 'Support',
      followUs: 'Follow Us',
      allRightsReserved: 'All rights reserved.',
      
      // Categories
      festival: 'Festival',
      wedding: 'Wedding',
      housewarming: 'Housewarming',
      health: 'Health',
      prosperity: 'Prosperity'
    },
    hi: {
      // Header
      home: 'होम',
      pujas: 'पूजा',
      pandits: 'पंडित',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      bookNow: 'बुक करें',
      login: 'लॉगिन',
      profile: 'प्रोफ़ाइल',
      myPujas: 'मेरी पूजाएं',
      myChadhava: 'मेरी चढावा',
      logout: 'लॉगआउट',
      
      // Hero
      welcomeText: 'श्री मंदिर पूजा सेवा में आपका स्वागत है',
      howPujaWorks: 'पूजा सेवा कैसे काम करती है?',
      heroTitle: 'ऑनलाइन दिव्य आशीर्वाद का अनुभव करें',
      heroSubtitle: 'अपने घर के आराम से सत्यापित पंडितों के साथ प्रामाणिक पूजा और समारोह बुक करें',
      explorePujas: 'पूजा देखें',
      happyDevotees: 'खुश भक्त',
      
      // Upcoming Pujas
      upcomingPujas: 'आगामी पूजाएं',
      allCategories: 'सभी श्रेणियां',
      allTemples: 'सभी मंदिर',
      selectDate: 'दिनांक चुनें',
      filterByTemple: 'मंदिर से फ़िल्टर करें',
      filterByCategory: 'श्रेणी से फ़िल्टर करें',
      filterByDate: 'दिनांक से फ़िल्टर करें',
      clearFilters: 'फ़िल्टर साफ़ करें',
      
      // How It Works
      howItWorks: 'यह कैसे काम करता है',
      step1Title: 'अपनी पूजा चुनें',
      step1Desc: 'प्रामाणिक पूजाओं के हमारे संग्रह को देखें और अपनी आवश्यकताओं के अनुकूल एक का चयन करें',
      step2Title: 'दिनांक और समय चुनें',
      step2Desc: 'समारोह के लिए अपनी पसंदीदा तारीख और समय स्लॉट चुनें',
      step3Title: 'बुक करें और भुगतान करें',
      step3Desc: 'सुरक्षित भुगतान विकल्पों के साथ अपनी बुकिंग पूरी करें',
      step4Title: 'ऑनलाइन जुड़ें',
      step4Desc: 'कहीं से भी लाइव समारोह में भाग लें',
      
      // Stats
      verifiedPandits: 'सत्यापित पंडित',
      pujasCompleted: 'पूजा पूर्ण',
      citiesServed: 'शहर सेवित',
      
      // Testimonials
      testimonials: 'हमारे भक्त क्या कहते हैं',
      
      // Meet the Pandits
      meetPandits: 'हमारे सत्यापित पंडितों से मिलें',
      experience: 'अनुभव',
      years: 'वर्ष',
      viewProfile: 'प्रोफ़ाइल देखें',
      
      // Footer
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      support: 'सहायता',
      followUs: 'हमें फॉलो करें',
      allRightsReserved: 'सभी अधिकार सुरक्षित।',
      
      // Categories
      festival: 'त्योहार',
      wedding: 'शादी',
      housewarming: 'गृहप्रवेश',
      health: 'स्वास्थ्य',
      prosperity: 'समृद्धि'
    }
  };

  const t = (key) => translations[language][key] || key;

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
