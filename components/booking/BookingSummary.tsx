
import React from 'react';
import { ShieldCheck, MapPin, Calendar, Clock, User, Building2, Navigation, FileText } from 'lucide-react';
import { BookingData } from '../../types';
import { calculateSplit, formatCurrency } from '../../lib/payments';
import Button from '../ui/Button';

interface BookingSummaryProps {
  data: BookingData;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ data, onConfirm }) => {
  const { deposit, balance, total } = calculateSplit(data.treatment?.price || 0);

  return (
    <div className="space-y-16 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="font-serif text-4xl italic mb-4">Reservation Review</h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Confirm your luxury clinic experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Details */}
        <div className="bg-white border border-medimoi-black/5 p-10 space-y-10">
          <div className="flex items-start">
            <Building2 size={16} className="text-medimoi-gold mr-6 mt-1" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Clinic</p>
              <p className="font-serif text-xl italic">{data.therapist?.clinicName}</p>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider mt-1">{data.therapist?.clinicAddress}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.therapist?.clinicAddress || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-widest font-bold text-medimoi-gold mt-3 inline-flex items-center hover:underline"
              >
                <Navigation size={10} className="mr-1" /> Get Directions
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <User size={16} className="text-medimoi-gold mr-6 mt-1" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Practitioner</p>
              <p className="font-serif text-xl italic">{data.therapist?.name}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar size={16} className="text-medimoi-gold mr-6 mt-1" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Date & Time</p>
              <p className="font-serif text-xl italic">{data.date} at {data.time}</p>
            </div>
          </div>

          {data.treatment?.isPremium && (
            <div className="bg-medimoi-gold/5 border border-medimoi-gold/10 p-4 flex items-center">
              <ShieldCheck size={16} className="text-medimoi-gold mr-4" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-medimoi-gold font-bold">Premium Treatment Selected</span>
            </div>
          )}
        </div>

        {/* Right: Payment */}
        <div className="bg-medimoi-black text-white p-10 flex flex-col justify-between">
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-6">Payment Summary</h3>
            
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Treatment Total</span>
              <span className="font-serif text-2xl">{formatCurrency(total)}</span>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-medimoi-gold font-bold mb-1">20% Deposit Today</span>
                <span className="text-[8px] uppercase tracking-widest text-neutral-500">Secures your booking</span>
              </div>
              <span className="font-serif text-2xl text-medimoi-gold">{formatCurrency(deposit)}</span>
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Balance at Clinic</span>
                <span className="text-[8px] uppercase tracking-widest text-neutral-500">Pay on arrival</span>
              </div>
              <span className="font-serif text-xl italic text-neutral-300">{formatCurrency(balance)}</span>
            </div>
          </div>

          <div className="pt-12">
            <Button variant="gold" fullWidth className="py-6" onClick={onConfirm}>
              Confirm & Pay {formatCurrency(deposit)}
            </Button>
            <p className="text-[8px] uppercase tracking-widest text-neutral-500 text-center mt-6 leading-relaxed">
              Your appointment is at {data.therapist?.clinicName}. <br />
              By confirming, you agree to our <br /> Cancellation Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>

      {/* Liability Disclaimer */}
      <div className="bg-white border border-medimoi-black/5 p-8 flex items-start space-x-6">
        <FileText size={18} className="text-neutral-300 shrink-0 mt-0.5" />
        <p className="text-[9px] uppercase tracking-wider text-neutral-400 leading-relaxed">
          <span className="font-bold text-neutral-600">Platform Disclaimer:</span> Medimoi is a booking platform that connects clients with independent practitioners.
          The treating practitioner and their clinic are solely responsible for the delivery, quality, and safety of all treatments.
          Medimoi does not provide medical advice, does not employ the practitioners listed, and accepts no clinical liability.
          By proceeding, both parties acknowledge that liability for the treatment rests with <span className="font-bold text-neutral-600">{data.therapist?.clinicName}</span> and the treating practitioner.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
