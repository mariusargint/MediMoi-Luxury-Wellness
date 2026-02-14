
import React from 'react';
import { motion } from 'framer-motion';
import { Treatment } from '../types';

interface TreatmentSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  treatments: Treatment[];
  onBook: (treatment: Treatment) => void;
}

const TreatmentSection: React.FC<TreatmentSectionProps> = ({ id, title, subtitle, treatments, onBook }) => {
  return (
    <section id={id} className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full overflow-hidden">
      <header className="mb-12">
        <h2 className="font-serif text-3xl md:text-4xl italic mb-2">{title}</h2>
        {subtitle && <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{subtitle}</p>}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {treatments.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="group bg-white border border-medimoi-black/5 hover:border-medimoi-gold transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-[9px] uppercase tracking-[0.2em] text-medimoi-gold mb-2">{t.category}</div>
                <h3 className="font-serif text-2xl italic mb-2 leading-tight">{t.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6">{t.duration} • {t.price}</p>
                <button 
                  onClick={() => onBook(t)} 
                  className="w-full h-12 bg-medimoi-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-medimoi-gold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentSection;
