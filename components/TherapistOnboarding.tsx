
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, ShieldCheck, Building2, Stethoscope, FileText } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { TREATMENTS } from '../data/treatments';

const TherapistOnboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      {/* Progress Header */}
      <div className="mb-20">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold mb-2 block">Partner Application</span>
            <h1 className="font-serif text-4xl italic">Join the Elite Circle</h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Professionalism Score</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="font-serif text-xl italic text-medimoi-black">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-neutral-100 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute h-full bg-medimoi-gold top-0 left-0 transition-all duration-700"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <Building2 className="text-medimoi-gold" size={24} />
              <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Clinic & Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input label="Clinic / Brand Name" placeholder="E.G. THE WELLNESS ATELIER" />
              <Input label="Lead Practitioner Name" placeholder="JANE DOE" />
              <Input label="Business Address" placeholder="123 MAYFAIR ST" className="md:col-span-2" />
              <Input label="Postcode" placeholder="W1K 7AA" />
              <Input label="Contact Number" placeholder="+44 7000 000 000" />
            </div>
            <Button variant="primary" onClick={() => setStep(2)} className="mt-8">Next: Select Treatments</Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <Stethoscope className="text-medimoi-gold" size={24} />
              <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Clinical Specialties</h2>
            </div>
            <p className="text-neutral-500 text-sm italic">Select the treatments you are qualified and insured to perform.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TREATMENTS.map(t => (
                <button
                  key={t.id}
                  onClick={() => toggleTreatment(t.id)}
                  className={`p-6 border text-left transition-all duration-300 ${
                    selectedTreatments.includes(t.id) 
                      ? 'border-medimoi-black bg-medimoi-black text-white' 
                      : 'border-neutral-100 bg-white hover:border-medimoi-gold'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-widest block mb-2 opacity-60">{t.category}</span>
                  <span className="font-serif text-lg leading-tight block">{t.title}</span>
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" onClick={() => setStep(3)}>Next: Verify Credentials</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <FileText className="text-medimoi-gold" size={24} />
              <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Certification & Insurance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-dashed border-neutral-200 p-12 text-center group hover:border-medimoi-gold transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto mb-4 text-neutral-300 group-hover:text-medimoi-gold" />
                <span className="text-[10px] uppercase tracking-widest block mb-2">Proof of Medical Certification</span>
                <span className="text-[8px] text-neutral-400">PDF, JPG, PNG (MAX 5MB)</span>
              </div>
              <div className="border border-dashed border-neutral-200 p-12 text-center group hover:border-medimoi-gold transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto mb-4 text-neutral-300 group-hover:text-medimoi-gold" />
                <span className="text-[10px] uppercase tracking-widest block mb-2">Public Liability Insurance</span>
                <span className="text-[8px] text-neutral-400">PDF, JPG, PNG (MAX 5MB)</span>
              </div>
            </div>

            <div className="bg-white border border-medimoi-gold/20 p-8 flex items-start space-x-6">
              <ShieldCheck className="text-medimoi-gold shrink-0" size={24} />
              <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-wider">
                By submitting, you agree to our <span className="text-medimoi-black font-bold">Partnership Agreement</span>. 
                Our team will review your credentials within 48 hours to grant your <span className="text-medimoi-gold font-bold italic">Medimoi Verified</span> status.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button variant="gold" onClick={onComplete} className="flex-1">Submit Application</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TherapistOnboarding;
