
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { Treatment, BookingData, Therapist } from '../../types';
import ClinicDiscovery from './ClinicDiscovery';
import CalendarPicker from './CalendarPicker';
import LocationDetails from './LocationDetails';
import HealthDeclaration from './HealthDeclaration';
import BookingSummary from './BookingSummary';

interface BookingFlowProps {
  treatment: Treatment;
  initialPostcode?: string;
  onClose: () => void;
  onComplete: () => void;
}

const steps = [
  { id: 1, label: 'Location' },
  { id: 2, label: 'Clinic' },
  { id: 3, label: 'Schedule' },
  { id: 4, label: 'Health' },
  { id: 5, label: 'Confirm' }
];

const BookingFlow: React.FC<BookingFlowProps> = ({ treatment, initialPostcode = '', onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    treatment,
    therapist: null,
    date: null,
    time: null,
    location: '',
    postcode: '',
    notes: ''
  });

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleClinicSelect = (clinic: Therapist) => {
    setBookingData({ ...bookingData, therapist: clinic });
    setStep(3); // Jump to schedule
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setBookingData({ ...bookingData, date, time });
    setStep(4); // Health declaration
  };

  return (
    <div className="fixed inset-0 z-[100] bg-medimoi-bg flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 md:px-12 py-8 flex items-center justify-between border-b border-medimoi-black/5 bg-white">
        <div className="flex items-center space-x-6">
          {step > 1 ? (
            <button onClick={prevStep} className="hover:text-medimoi-gold transition-colors">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button onClick={onClose} className="hover:text-medimoi-gold transition-colors">
              <X size={20} />
            </button>
          )}
          <div className="hidden md:block">
            <h1 className="font-serif text-xl italic">{treatment.title}</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">{treatment.duration}</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex space-x-4 md:space-x-8">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <span className={`text-[9px] uppercase tracking-[0.2em] mb-2 hidden md:block ${step >= s.id ? 'text-medimoi-black' : 'text-neutral-300'}`}>
                {s.label}
              </span>
              <div className={`h-[1px] w-6 md:w-8 transition-all duration-500 ${step >= s.id ? 'bg-medimoi-black' : 'bg-neutral-100'}`} />
            </div>
          ))}
        </div>

        <button onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold hidden md:block">Cancel</button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F9F7F2]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-4xl mx-auto px-6 py-16 w-full"
          >
            {step === 1 && (
              <ClinicDiscovery onSelect={handleClinicSelect} initialPostcode={initialPostcode} />
            )}
            {step === 2 && bookingData.therapist && (
              <LocationDetails clinic={bookingData.therapist} onNext={() => setStep(3)} />
            )}
            {step === 3 && (
              <CalendarPicker onSelect={handleDateTimeSelect} />
            )}
            {step === 4 && (
              <HealthDeclaration
                treatmentName={treatment.title}
                clinicName={bookingData.therapist?.clinicName || 'the clinic'}
                onConfirm={() => setStep(5)}
              />
            )}
            {step === 5 && (
              <BookingSummary data={bookingData} onConfirm={onComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BookingFlow;
