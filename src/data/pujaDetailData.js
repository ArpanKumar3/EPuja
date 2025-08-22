import { BrainCircuit, ShieldCheck, TrendingUp, HeartHandshake, Sparkles, Sun, Building, Users, Heart, Flower, Home, Star } from 'lucide-react';

const generatePujaData = (puja) => ({
  id: puja.id,
  name: puja.name,
  shortDescription: `An authentic ${puja.name} to bring blessings of ${puja.category} and joy to your life, performed at the holy ${puja.temple}.`,
  temple: `${puja.temple}`,
  images: [
    `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/FFCDB2/6D4C41?text=${encodeURIComponent(puja.name)} 1`,
    `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/FFB4A2/6D4C41?text=${encodeURIComponent(puja.name)} 2`,
    `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/E5989B/6D4C41?text=${encodeURIComponent(puja.name)} 3`,
    `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x600/B5838D/6D4C41?text=Temple+View`
  ],
  bookingEndDate: new Date(new Date().getTime() + (puja.id + 1) * 24 * 60 * 60 * 1000), // Dynamic end date
  date: puja.date,
  price: puja.price,
  packages: [
    { name: 'Individual Sankalpa', price: puja.price, description: 'Puja will be performed in your name.' },
    { name: 'Couple Sankalpa', price: Math.floor(puja.price * 1.8), description: 'Puja for a couple.' },
    { name: 'Family Sankalpa (4)', price: Math.floor(puja.price * 3), description: 'Puja for a family of four.' },
    { name: 'Group Participation', price: Math.floor(puja.price * 0.6), description: 'Participate in a group puja.' }
  ],
  about: `The ${puja.name} is a significant ceremony in Hindu tradition, observed with great devotion. This ritual is dedicated to invoking divine energies for ${puja.category}. It involves a series of sacred rites performed by experienced pandits to ensure all traditions are honored. This online puja brings the same sacred experience to your home, allowing you to participate from anywhere in the world and receive divine blessings.`,
  benefits: [
    { icon: Sparkles, text: `Brings divine blessings for ${puja.category}.` },
    { icon: ShieldCheck, text: 'Provides protection from negative energies.' },
    { icon: HeartHandshake, text: 'Promotes peace and harmony.' },
    { icon: Sun, text: 'Ushers in positivity and good fortune.' },
    { icon: BrainCircuit, text: 'Enhances mental clarity and focus.' },
    { icon: TrendingUp, text: 'Aids in personal and professional growth.' },
  ],
  process: [
    { step: 1, title: 'Sankalpa (Vow)', description: 'The pandit takes a vow on your behalf, stating your name and purpose of the puja.' },
    { step: 2, title: 'Deity Invocation', description: 'The principal deity is invoked into a kalash or idol with specific mantras.' },
    { step: 3, title: 'Shodashopachara Puja (16-step ritual)', description: 'An elaborate ritual involving 16 steps of offering and worship.' },
    { step: 4, title: 'Mantra Japa & Homa (Chanting & Fire Ritual)', description: 'Specific mantras are chanted, followed by a fire ceremony.' },
    { step: 5, title: 'Aarti & Pushpanjali', description: 'The ceremony concludes with the Aarti and offering of flowers.' },
    { step: 6, title: 'Prasad Distribution', description: 'Blessings are sent to you in the form of prasad.' }
  ],
  templeDetails: {
    name: puja.temple,
    image: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/FF6B35/FFFFFF?text=${encodeURIComponent(puja.temple)}`,
    description: `${puja.temple} is a renowned pilgrimage site, known for its spiritual ambiance and historical significance.`
  },
  panditInfo: {
    name: 'Pandit Suresh Acharya',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/8B5CF6/FFFFFF?text=Pandit+S',
    experience: 18,
    bio: 'A highly respected pandit with deep knowledge of Vedic scriptures. He specializes in a wide range of pujas and ceremonies.'
  },
  reviews: [
    { id: 1, name: 'Priya S.', rating: 5, comment: 'Felt so blessed. The online stream was clear and the pandit was very patient.', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/8B5CF6/FFFFFF?text=P' },
    { id: 2, name: 'Amit K.', rating: 5, comment: 'Perfect execution. All my obstacles seem to be clearing up. Thank you ePuja!', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/10B981/FFFFFF?text=A' }
  ],
  faq: [
    { q: 'What will I receive after the puja?', a: 'You will receive a link to the recorded puja video and blessed prasad will be shipped to your address.' },
    { q: 'Can I participate in the puja?', a: 'Yes, this is a live puja. You will be given a link to join the live stream and you can chant along with the pandit.' },
    { q: 'What if I miss the live stream?', a: 'A recorded version of the puja will be available for you to watch later.' }
  ],
  relatedPujaIds: [ (puja.id % 8) + 1, ((puja.id + 2) % 8) + 1, ((puja.id + 4) % 8) + 1 ].filter(id => id !== puja.id)
});

import { pujasData } from './dummyData';
export const pujaDetailData = pujasData.reduce((acc, puja) => {
  acc[puja.id] = generatePujaData(puja);
  return acc;
}, {});
