
import React, { useState } from 'react';
/* Added CheckCircle2 to the imports from lucide-react */
import { Search, MapPin, Clock, Star, Navigation, CheckCircle2 } from 'lucide-react';
import { Therapist } from '../../types';
import Button from '../ui/Button';

const MOCK_CLINICS: Therapist[] = [
  {
    id: 'c1',
    name: 'Alexandra Wright',
    clinicName: 'The Mayfair Wellness Suite',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de2177?auto=format&fit=crop&q=80&w=200',
    bio: 'Medical-grade treatments in the heart of Mayfair.',
    startingPrice: '£60',
    verified: true,
    distance: '0.4 miles',
    // Fix: Added missing properties required by Therapist interface
    clinicAddress: '12 Berkeley Square, Mayfair, London',
    postcode: 'W1J 6BD'
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    clinicName: 'Chen Sports & Osteo',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialist musculoskeletal recovery clinic.',
    startingPrice: '£75',
    verified: true,
    distance: '1.2 miles',
    // Fix: Added missing properties required by Therapist interface
    clinicAddress: '45 Sloane Square, Chelsea, London',
    postcode: 'SW1W 8AX'
  },
  {
    id: 'c3',
    name: 'The Ritual Lab',
    clinicName: 'Ritual Lab Chelsea',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    bio: 'Holistic beauty and aesthetic excellence.',
    startingPrice: '£85',
    verified: true,
    distance: '2.1 miles',
    // Fix: Added missing properties required by Therapist interface
    clinicAddress: '102 King\'s Road, Chelsea, London',
    postcode: 'SW3 4TZ'
  }
];

const ClinicFinder: React.FC<{ onSelect: (c: Therapist) => void }> = ({ onSelect }) => {
  const [postcode, setPostcode] = useState('');
  const [searching, setSearching] = useState(false);

  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl italic mb-4">Find a Clinic</h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Enter your location to see nearest partners</p>
      </div>

      {/* Search Header */}
      <div className="max-w-2xl mx-auto flex border-b border-medimoi-black pb-4 group focus-within:border-medimoi-gold transition-colors">
        <Search className="text-neutral-400 mr-4 group-focus-within:text-medimoi-gold" size={20} />
        <input 
          type="text" 
          placeholder="ENTER POSTCODE (E.G. W1K)"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="bg-transparent w-full focus:outline-none text-[12px] uppercase tracking-widest font-sans"
        />
        <button 
          onClick={() => { setSearching(true); setTimeout(() => setSearching(false), 800); }}
          className="text-[10px] uppercase tracking-widest font-bold hover:text-medimoi-gold"
        >
          Find
        </button>
      </div>

      <div className="grid gap-6 mt-12">
        {MOCK_CLINICS.map(clinic => (
          <div 
            key={clinic.id}
            className="group flex flex-col md:flex-row items-center bg-white border border-medimoi-black/5 p-8 hover:border-medimoi-gold transition-all duration-500"
          >
            <div className="w-32 h-32 overflow-hidden mb-6 md:mb-0 md:mr-10">
              <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-1">
                <h3 className="font-serif text-2xl italic">{clinic.clinicName}</h3>
                {clinic.verified && <CheckCircle2 size={16} className="text-medimoi-gold" />}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 flex items-center justify-center md:justify-start">
                <MapPin size={12} className="mr-2" /> {clinic.distance} away • {clinic.name}
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-1 text-medimoi-gold pb-4">
                <Star size={10} fill="currentColor" />
                <span className="text-[10px] font-bold tracking-widest">{clinic.rating}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed italic line-clamp-1">{clinic.bio}</p>
            </div>

            <div className="mt-8 md:mt-0 md:ml-10 flex flex-col items-center md:items-end space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-bold">FROM {clinic.startingPrice}</span>
              <Button variant="primary" onClick={() => onSelect(clinic)} size="sm" className="w-full md:w-auto">View Slots</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicFinder;
