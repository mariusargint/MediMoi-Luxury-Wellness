import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Sparkles, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { Treatment } from '../types';
import Button from './ui/Button';

interface TreatmentDetailProps {
  treatment: Treatment;
  onBack: () => void;
  onBook: () => void;
}

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const TreatmentDetail: React.FC<TreatmentDetailProps> = ({ treatment, onBack, onBook }) => {
  return (
    <div className="min-h-screen bg-medimoi-bg">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-medimoi-black/70 via-medimoi-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            {treatment.isPremium && (
              <div className="inline-flex items-center space-x-2 bg-medimoi-gold/20 backdrop-blur-sm border border-medimoi-gold/30 px-4 py-1.5 mb-4">
                <Sparkles size={12} className="text-medimoi-gold" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-medimoi-gold font-bold">Signature Method</span>
              </div>
            )}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-white mb-4 leading-tight">{treatment.title}</h1>
            <div className="flex items-center space-x-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/70 flex items-center">
                <Clock size={14} className="mr-2" /> {treatment.duration}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-medimoi-gold font-bold">{treatment.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Description */}
        <motion.div {...fade} className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold">About This Treatment</p>
          <div className="space-y-5">
            {treatment.description.split('. ').reduce((paragraphs: string[], sentence, i, arr) => {
              // Group ~3 sentences per paragraph
              const groupIndex = Math.floor(i / 3);
              if (!paragraphs[groupIndex]) paragraphs[groupIndex] = '';
              paragraphs[groupIndex] += sentence + (i < arr.length - 1 ? '. ' : '');
              return paragraphs;
            }, []).map((paragraph, i) => (
              <p key={i} className="text-neutral-600 text-sm md:text-base leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* What to Expect */}
        {treatment.expectations && treatment.expectations.length > 0 && (
          <motion.div {...fade} className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-2">What to Expect</p>
              <div className="h-[1px] bg-medimoi-gold/20 w-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {treatment.expectations.map((exp, i) => {
                const colonIndex = exp.indexOf(':');
                const title = colonIndex > -1 ? exp.slice(0, colonIndex) : null;
                const body = colonIndex > -1 ? exp.slice(colonIndex + 1).trim() : exp;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-medimoi-black/5 p-8 hover:border-medimoi-gold/20 transition-colors duration-500"
                  >
                    <div className="flex items-start space-x-5">
                      <div className="w-8 h-8 bg-medimoi-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-medimoi-gold" />
                      </div>
                      <div>
                        {title && (
                          <h3 className="font-serif text-lg italic mb-2">{title}</h3>
                        )}
                        <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Eligibility */}
        {treatment.eligibility && (
          <motion.div {...fade}>
            <div className="bg-amber-50 border border-amber-100 p-8 flex items-start space-x-5">
              <ShieldCheck size={22} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-700 mb-3">Eligibility & Considerations</h3>
                <p className="text-amber-700/80 text-sm leading-relaxed">{treatment.eligibility}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contraindications */}
        {treatment.contraindications && treatment.contraindications.length > 0 && (
          <motion.div {...fade}>
            <div className="bg-medimoi-black text-white p-8 md:p-10 space-y-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle size={20} className="text-medimoi-gold" />
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-medimoi-gold">Please Read Carefully Before Booking</h3>
              </div>
              <p className="text-neutral-400 text-xs uppercase tracking-widest">
                You cannot have cavitation and radio frequency if you:
              </p>
              <ul className="space-y-3">
                {treatment.contraindications.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-medimoi-gold rounded-full mt-1.5 shrink-0" />
                    <span className="text-neutral-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Booking CTA */}
        <motion.div {...fade} className="border-t border-medimoi-black/5 pt-12">
          <div className="bg-white border border-medimoi-black/5 p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Book Your Session</p>
              <div className="flex items-baseline space-x-4">
                <span className="font-serif text-3xl italic">{treatment.price}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">{treatment.duration} &middot; Full session</span>
              </div>
            </div>
            <Button variant="primary" className="px-12 py-5 text-[11px]" onClick={onBook}>
              Book Treatment
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
