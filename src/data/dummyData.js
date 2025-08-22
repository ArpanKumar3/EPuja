import { faker } from '@faker-js/faker';

// Pujas Data with temples
export const pujasData = [
  {
    id: 1,
    name: 'Ganesh Chaturthi Puja',
    category: 'festival',
    temple: 'Siddhivinayak Temple',
    price: 2500,
    duration: '2 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/FF6B35/FFFFFF?text=Ganesh+Puja',
    date: '2025-01-15',
    time: '10:00 AM',
    description: 'Traditional Ganesh Chaturthi ceremony with complete rituals'
  },
  {
    id: 2,
    name: 'Griha Pravesh Puja',
    category: 'housewarming',
    temple: 'Mahalakshmi Temple',
    price: 5000,
    duration: '3 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/8B5CF6/FFFFFF?text=Griha+Pravesh',
    date: '2025-01-18',
    time: '6:00 AM',
    description: 'Auspicious housewarming ceremony for new home'
  },
  {
    id: 3,
    name: 'Lakshmi Puja',
    category: 'prosperity',
    temple: 'Mahalakshmi Temple',
    price: 3500,
    duration: '2.5 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/10B981/FFFFFF?text=Lakshmi+Puja',
    date: '2025-01-20',
    time: '7:00 PM',
    description: 'Invoke Goddess Lakshmi for prosperity and wealth'
  },
  {
    id: 4,
    name: 'Vivah Sanskar',
    category: 'wedding',
    temple: 'Kashi Vishwanath Temple',
    price: 15000,
    duration: '4 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/EF4444/FFFFFF?text=Wedding+Ceremony',
    date: '2025-01-22',
    time: '11:00 AM',
    description: 'Complete Vedic wedding ceremony with all rituals'
  },
  {
    id: 5,
    name: 'Mahamrityunjaya Puja',
    category: 'health',
    temple: 'Somnath Temple',
    price: 4000,
    duration: '2 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/3B82F6/FFFFFF?text=Health+Puja',
    date: '2025-01-25',
    time: '5:00 AM',
    description: 'Powerful puja for health and well-being'
  },
  {
    id: 6,
    name: 'Diwali Puja',
    category: 'festival',
    temple: 'Golden Temple',
    price: 3000,
    duration: '2.5 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/F59E0B/FFFFFF?text=Diwali+Puja',
    date: '2025-01-28',
    time: '6:30 PM',
    description: 'Traditional Diwali celebration with lights and prayers'
  },
  {
    id: 7,
    name: 'Navaratri Puja',
    category: 'festival',
    temple: 'Vaishno Devi Temple',
    price: 4500,
    duration: '3 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/EC4899/FFFFFF?text=Navaratri+Puja',
    date: '2025-02-01',
    time: '6:00 PM',
    description: 'Nine nights of divine celebration with Goddess Durga'
  },
  {
    id: 8,
    name: 'Shani Puja',
    category: 'prosperity',
    temple: 'Shani Shingnapur Temple',
    price: 2800,
    duration: '1.5 hours',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/6366F1/FFFFFF?text=Shani+Puja',
    date: '2025-02-05',
    time: '7:00 AM',
    description: 'Special puja to appease Lord Shani for prosperity'
  }
];

// Temples Data
export const templesData = [
  'Siddhivinayak Temple',
  'Mahalakshmi Temple', 
  'Kashi Vishwanath Temple',
  'Somnath Temple',
  'Golden Temple',
  'Vaishno Devi Temple',
  'Shani Shingnapur Temple',
  'Tirupati Balaji Temple'
];

// Devotee Images for Hero Carousel
export const devoteeImages = [
  {
    id: 1,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/FF6B35/FFFFFF?text=D1',
    name: 'Priya S.',
    location: 'Mumbai'
  },
  {
    id: 2,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/8B5CF6/FFFFFF?text=D2',
    name: 'Rajesh K.',
    location: 'Delhi'
  },
  {
    id: 3,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/10B981/FFFFFF?text=D3',
    name: 'Anita P.',
    location: 'Pune'
  },
  {
    id: 4,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/EF4444/FFFFFF?text=D4',
    name: 'Suresh R.',
    location: 'Bangalore'
  },
  {
    id: 5,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/3B82F6/FFFFFF?text=D5',
    name: 'Meera J.',
    location: 'Chennai'
  },
  {
    id: 6,
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/F59E0B/FFFFFF?text=D6',
    name: 'Vikram S.',
    location: 'Kolkata'
  }
];

// Testimonials Data
export const testimonialsData = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Amazing experience! The pandit was very knowledgeable and the online ceremony felt just like being there in person.',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/8B5CF6/FFFFFF?text=P'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Excellent service. The booking process was smooth and the puja was conducted with utmost devotion.',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/10B981/FFFFFF?text=R'
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'Perfect solution for busy schedules. Could participate in Ganesh Puja from my office. Highly recommended!',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/EF4444/FFFFFF?text=A'
  },
  {
    id: 4,
    name: 'Suresh Reddy',
    location: 'Hyderabad',
    rating: 5,
    comment: 'The pandits are very experienced and the platform is user-friendly. Will definitely book again.',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/3B82F6/FFFFFF?text=S'
  }
];

// Pandits Data
export const panditsData = [
  {
    id: 1,
    name: 'Pandit Ramesh Shastri',
    experience: 25,
    specialization: 'Vedic Rituals, Wedding Ceremonies',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/FF6B35/FFFFFF?text=Pandit+R',
    rating: 4.9,
    reviews: 145,
    location: 'Varanasi'
  },
  {
    id: 2,
    name: 'Pandit Suresh Acharya',
    experience: 18,
    specialization: 'Festival Pujas, Griha Pravesh',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/8B5CF6/FFFFFF?text=Pandit+S',
    rating: 4.8,
    reviews: 98,
    location: 'Haridwar'
  },
  {
    id: 3,
    name: 'Pandit Krishna Sharma',
    experience: 30,
    specialization: 'Health Pujas, Spiritual Healing',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/10B981/FFFFFF?text=Pandit+K',
    rating: 4.9,
    reviews: 203,
    location: 'Rishikesh'
  },
  {
    id: 4,
    name: 'Pandit Govind Mishra',
    experience: 22,
    specialization: 'Prosperity Pujas, Business Success',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/EF4444/FFFFFF?text=Pandit+G',
    rating: 4.7,
    reviews: 76,
    location: 'Ujjain'
  }
];

// Hero Slides Data
export const heroSlidesData = [
  {
    id: 1,
    title: 'Experience Divine Blessings Online',
    subtitle: 'Book authentic pujas and ceremonies with verified pandits',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x600/FF6B35/FFFFFF?text=Divine+Temple',
    cta: 'Explore Pujas'
  },
  {
    id: 2,
    title: 'Verified Pandits, Authentic Rituals',
    subtitle: 'Connect with experienced pandits for traditional ceremonies',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x600/8B5CF6/FFFFFF?text=Pandit+Ceremony',
    cta: 'Meet Pandits'
  },
  {
    id: 3,
    title: 'Join from Anywhere, Anytime',
    subtitle: 'Participate in live pujas from the comfort of your home',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x600/10B981/FFFFFF?text=Online+Puja',
    cta: 'Book Now'
  }
];

// Stats Data
export const statsData = [
  {
    label: 'happyDevotees',
    value: '50,000+',
    icon: '👥'
  },
  {
    label: 'verifiedPandits',
    value: '500+',
    icon: '🙏'
  },
  {
    label: 'pujasCompleted',
    value: '25,000+',
    icon: '✨'
  },
  {
    label: 'citiesServed',
    value: '100+',
    icon: '🏛️'
  }
];
