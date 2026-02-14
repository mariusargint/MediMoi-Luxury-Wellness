
import React from 'react';
import { motion } from 'framer-motion';
import { Treatment } from '../types';

interface TreatmentCardProps {
  treatment: Treatment;
  onClick?: () => void;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          src={treatment.image} 
          alt={treatment.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-medimoi-black/10 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-widest mb-3 border border-medimoi-gold/20">
            {treatment.category}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="font-serif text-xl mb-1 group-hover:text-medimoi-gold transition-colors italic">
          {treatment.title}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          From {treatment.price} • {treatment.duration}
        </p>
      </div>
    </motion.div>
  );
};

export default TreatmentCard;
