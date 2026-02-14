
import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Therapist } from '../../types';

interface TherapistSelectorProps {
  onSelect: (t: Therapist) => void;
}

const MOCK_THERAPISTS: Therapist[] = [
  {
    id: 't1',
    name: 'Alexandra Wright',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de2177?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialising in medical-grade lymphatic drainage and deep tissue restoration for 8+ years.',
    startingPrice: '£60',
    verified: true,
    // Fix: Added missing properties required by Therapist interface
    clinicName: 'The Mayfair Wellness Suite',
    clinicAddress: '12 Berkeley Square, Mayfair, London',
    postcode: 'W1J 6BD'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Renowned for sports recovery and osteopathy. Previous experience with elite athletes.',
    startingPrice: '£75',
    verified: true,
    // Fix: Added missing properties required by Therapist interface
    clinicName: 'Chen Sports & Osteo',
    clinicAddress: '45 Sloane Square, Chelsea, London',
    postcode: 'SW1W 8AX'
  },
  {
    id: 't3',
    name: 'Elena Rossi',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    bio: 'Expert in the Body by Soph method and advanced facial contouring techniques.',
    startingPrice: '£60',
    verified: true,
    // Fix: Added missing properties required by Therapist interface
    clinicName: 'The Ritual Lab Chelsea',
    clinicAddress: '102 King\'s Road, Chelsea, London',
    postcode: 'SW3 4TZ'
  }
];

const TherapistSelector: React.FC<TherapistSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl italic mb-4">Select your expert</h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Medimoi verified practitioners</p>
      </div>

      <div className="grid gap-6">
        {MOCK_THERAPISTS.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className="flex flex-col md:flex-row items-center bg-white border border-medimoi-black/5 p-8 text-left hover:border-medimoi-gold transition-all duration-500 group"
          >
            <div className="relative mb-6 md:mb-0 md:mr-10">
              <div className="w-24 h-24 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              {t.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                  <CheckCircle size={16} className="text-medimoi-gold" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="font-serif text-2xl italic">{t.name}</h3>
                <div className="flex items-center justify-center md:justify-start text-medimoi-gold mt-2 md:mt-0">
                  <Star size={12} fill="currentColor" className="mr-1" />
                  <span className="text-[11px] font-bold tracking-widest">{t.rating}</span>
                </div>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed max-w-xl mb-4 line-clamp-2">
                {t.bio}
              </p>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                Session starting from {t.startingPrice}
              </span>
            </div>

            <div className="mt-8 md:mt-0 md:ml-10">
              <span className="text-[10px] uppercase tracking-widest border border-medimoi-black px-6 py-3 group-hover:bg-medimoi-black group-hover:text-white transition-all">Select</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TherapistSelector;
