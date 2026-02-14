
import React from 'react';
import { MapPin, Info, Navigation, Clock } from 'lucide-react';
import { Therapist } from '../../types';
import Button from '../ui/Button';

interface LocationDetailsProps {
  clinic: Therapist;
  onNext: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ clinic, onNext }) => {
  return (
    <div className="space-y-16 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="font-serif text-4xl italic mb-4">Location & Arrival</h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Your appointment is at {clinic.clinicName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Map Placeholder */}
        <div className="aspect-square bg-neutral-100 flex flex-col items-center justify-center relative border border-medimoi-black/5 overflow-hidden">
          <div className="absolute inset-0 grayscale opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Map Background" 
            />
          </div>
          <div className="relative z-10 bg-white p-6 shadow-2xl flex flex-col items-center space-y-4">
            <MapPin className="text-medimoi-gold" size={32} />
            <div className="text-center">
              <p className="font-serif text-lg italic">{clinic.clinicName}</p>
              <p className="text-[9px] uppercase tracking-widest text-neutral-400">{clinic.postcode}</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.clinicAddress)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-white text-medimoi-black py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center border border-medimoi-black/5 hover:bg-medimoi-black hover:text-white transition-all shadow-lg"
            >
              <Navigation size={14} className="mr-2" /> Get Directions
            </a>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10 py-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-medimoi-gold">
              <Info size={18} />
              <h4 className="text-[11px] uppercase tracking-widest font-bold">Arrival Instructions</h4>
            </div>
            <p className="text-[12px] text-neutral-500 leading-relaxed uppercase tracking-wider">
              Please arrive 10 minutes before your scheduled appointment time. Check in at the main reception desk and mention you are here for a Medimoi booking.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-medimoi-gold">
              <Clock size={18} />
              <h4 className="text-[11px] uppercase tracking-widest font-bold">Cancellation Policy</h4>
            </div>
            <p className="text-[12px] text-neutral-500 leading-relaxed uppercase tracking-wider">
              Appointments cancelled within 24 hours of the start time will forfeit the 20% platform deposit.
            </p>
          </div>

          <div className="pt-6">
            <Button variant="primary" fullWidth onClick={onNext}>
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
