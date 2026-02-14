
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Heart, FileText } from 'lucide-react';
import Button from '../ui/Button';

interface HealthDeclarationProps {
  treatmentName: string;
  clinicName: string;
  onConfirm: () => void;
}

const HealthDeclaration: React.FC<HealthDeclarationProps> = ({ treatmentName, clinicName, onConfirm }) => {
  const [hasAllergies, setHasAllergies] = useState<boolean | null>(null);
  const [allergyDetails, setAllergyDetails] = useState('');
  const [hasMedicalConditions, setHasMedicalConditions] = useState<boolean | null>(null);
  const [medicalDetails, setMedicalDetails] = useState('');
  const [acceptedLiability, setAcceptedLiability] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const canProceed =
    hasAllergies !== null &&
    hasMedicalConditions !== null &&
    (hasAllergies === false || allergyDetails.trim().length > 0) &&
    (hasMedicalConditions === false || medicalDetails.trim().length > 0) &&
    acceptedLiability &&
    acceptedTerms;

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="font-serif text-3xl italic mb-2">Health & Safety</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Required before confirming your booking</p>
      </div>

      {/* Allergies Section */}
      <section className="bg-white border border-medimoi-black/5 p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Heart size={20} className="text-medimoi-gold" />
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">Allergies</h3>
        </div>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Do you have any known allergies that could affect your treatment?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setHasAllergies(false)}
            className={`flex-1 h-12 border text-[11px] uppercase tracking-widest font-bold transition-all ${
              hasAllergies === false
                ? 'border-medimoi-gold bg-medimoi-gold text-white'
                : 'border-neutral-100 bg-white text-neutral-400 hover:border-neutral-300'
            }`}
          >
            No Allergies
          </button>
          <button
            onClick={() => setHasAllergies(true)}
            className={`flex-1 h-12 border text-[11px] uppercase tracking-widest font-bold transition-all ${
              hasAllergies === true
                ? 'border-amber-500 bg-amber-500 text-white'
                : 'border-neutral-100 bg-white text-neutral-400 hover:border-neutral-300'
            }`}
          >
            Yes, I have allergies
          </button>
        </div>
        {hasAllergies && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <textarea
              placeholder="Please describe your allergies (e.g. latex, specific oils, fragrances, medications...)"
              value={allergyDetails}
              onChange={(e) => setAllergyDetails(e.target.value)}
              className="w-full border border-neutral-100 bg-white p-4 text-[14px] focus:outline-none focus:border-medimoi-gold transition-colors resize-none h-24 text-sm"
            />
          </motion.div>
        )}
      </section>

      {/* Medical Conditions Section */}
      <section className="bg-white border border-medimoi-black/5 p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <AlertTriangle size={20} className="text-medimoi-gold" />
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">Medical Conditions</h3>
        </div>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Do you have any pre-existing medical conditions the practitioner should be aware of?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setHasMedicalConditions(false)}
            className={`flex-1 h-12 border text-[11px] uppercase tracking-widest font-bold transition-all ${
              hasMedicalConditions === false
                ? 'border-medimoi-gold bg-medimoi-gold text-white'
                : 'border-neutral-100 bg-white text-neutral-400 hover:border-neutral-300'
            }`}
          >
            No Conditions
          </button>
          <button
            onClick={() => setHasMedicalConditions(true)}
            className={`flex-1 h-12 border text-[11px] uppercase tracking-widest font-bold transition-all ${
              hasMedicalConditions === true
                ? 'border-amber-500 bg-amber-500 text-white'
                : 'border-neutral-100 bg-white text-neutral-400 hover:border-neutral-300'
            }`}
          >
            Yes, I have conditions
          </button>
        </div>
        {hasMedicalConditions && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <textarea
              placeholder="Please describe your conditions (e.g. pregnancy, heart condition, recent surgery, skin conditions...)"
              value={medicalDetails}
              onChange={(e) => setMedicalDetails(e.target.value)}
              className="w-full border border-neutral-100 bg-white p-4 text-[14px] focus:outline-none focus:border-medimoi-gold transition-colors resize-none h-24 text-sm"
            />
          </motion.div>
        )}
      </section>

      {/* Liability & Terms */}
      <section className="bg-medimoi-black text-white p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <FileText size={20} className="text-medimoi-gold" />
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-medimoi-gold">Liability Acknowledgement</h3>
        </div>

        <div className="space-y-4">
          {/* Liability checkbox */}
          <label className="flex items-start space-x-4 cursor-pointer group">
            <div className="mt-0.5 shrink-0">
              <button
                onClick={() => setAcceptedLiability(!acceptedLiability)}
                className={`w-5 h-5 border flex items-center justify-center transition-all ${
                  acceptedLiability
                    ? 'bg-medimoi-gold border-medimoi-gold'
                    : 'border-neutral-500 group-hover:border-medimoi-gold'
                }`}
              >
                {acceptedLiability && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-300 leading-relaxed">
              I understand that <span className="text-white font-bold">{clinicName}</span> and the treating practitioner
              are solely responsible for the delivery of <span className="text-white font-bold">{treatmentName}</span>.
              Medimoi operates as a booking platform only and bears no clinical liability for the treatment provided.
            </span>
          </label>

          {/* Terms checkbox */}
          <label className="flex items-start space-x-4 cursor-pointer group">
            <div className="mt-0.5 shrink-0">
              <button
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`w-5 h-5 border flex items-center justify-center transition-all ${
                  acceptedTerms
                    ? 'bg-medimoi-gold border-medimoi-gold'
                    : 'border-neutral-500 group-hover:border-medimoi-gold'
                }`}
              >
                {acceptedTerms && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-300 leading-relaxed">
              I confirm that the health information provided above is accurate and complete. I understand it is my
              responsibility to disclose any allergies or medical conditions that may affect my treatment. I agree
              to the <span className="text-medimoi-gold font-bold">Terms of Service</span> and <span className="text-medimoi-gold font-bold">Cancellation Policy</span>.
            </span>
          </label>
        </div>
      </section>

      {/* CTA */}
      <div className="pt-2">
        <button
          disabled={!canProceed}
          onClick={onConfirm}
          className="w-full h-16 bg-medimoi-black text-white text-[11px] uppercase tracking-[0.4em] font-bold disabled:opacity-20 shadow-xl transition-opacity"
        >
          Proceed to Payment
        </button>
        <p className="text-[8px] uppercase tracking-widest text-neutral-300 text-center mt-4">
          Your health declaration will be shared with your practitioner
        </p>
      </div>
    </div>
  );
};

export default HealthDeclaration;
