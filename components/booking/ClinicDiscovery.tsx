
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, CheckCircle, Navigation, Loader2, ArrowRight } from 'lucide-react';
import { Therapist } from '../../types';
import { sortByProximity } from '../../lib/distance';
import Button from '../ui/Button';

interface ClinicDiscoveryProps {
  onSelect: (clinic: Therapist) => void;
  initialPostcode?: string;
}

const MOCK_CLINICS: Therapist[] = [
  {
    id: 't1',
    name: 'Alexandra Wright',
    clinicName: 'The Mayfair Wellness Suite',
    clinicAddress: '12 Berkeley Square, Mayfair, London',
    postcode: 'W1J 6BD',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de2177?auto=format&fit=crop&q=80&w=200',
    bio: 'Medical-grade treatments in the heart of Mayfair.',
    startingPrice: '£60',
    verified: true
  },
  {
    id: 't2',
    name: 'Michael Chen',
    clinicName: 'Chen Sports & Osteo',
    clinicAddress: '45 Sloane Square, Chelsea, London',
    postcode: 'SW1W 8AX',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialist musculoskeletal recovery clinic.',
    startingPrice: '£75',
    verified: true
  }
];

const ClinicDiscovery: React.FC<ClinicDiscoveryProps> = ({ onSelect, initialPostcode = '' }) => {
  const [postcode, setPostcode] = useState(initialPostcode);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Therapist[]>([]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!postcode.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setResults(sortByProximity(postcode, MOCK_CLINICS));
      setSearching(false);
    }, 1000);
  };

  useEffect(() => { if (initialPostcode) handleSearch(); }, []);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-serif text-3xl italic mb-2">Find a Clinic</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Elite specialists near you</p>
      </div>

      <form onSubmit={handleSearch} className="flex border-b border-medimoi-black pb-3">
        <Search className="text-neutral-400 mr-3" size={18} />
        <input 
          type="text" 
          placeholder="ENTER POSTCODE"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="bg-transparent w-full focus:outline-none text-[16px] uppercase tracking-widest font-sans h-10"
        />
        <button type="submit" className="text-[10px] uppercase tracking-widest font-bold">Search</button>
      </form>

      {searching ? (
        <div className="py-20 flex flex-col items-center"><Loader2 className="animate-spin text-medimoi-gold" /></div>
      ) : (
        <div className="space-y-6">
          {results.map(clinic => (
            <div key={clinic.id} className="bg-white border border-medimoi-black/5 overflow-hidden shadow-sm">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={clinic.image} className="w-full h-full object-cover grayscale" alt="" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl italic">{clinic.clinicName}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1">{clinic.clinicAddress}</p>
                  </div>
                  <div className="flex items-center text-medimoi-gold text-[10px] font-bold">
                    <Star size={10} fill="currentColor" className="mr-1" /> {clinic.rating}
                  </div>
                </div>
                <button 
                  onClick={() => onSelect(clinic)}
                  className="w-full h-14 bg-medimoi-black text-white text-[11px] uppercase tracking-[0.4em] font-bold"
                >
                  Book Clinic
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicDiscovery;
