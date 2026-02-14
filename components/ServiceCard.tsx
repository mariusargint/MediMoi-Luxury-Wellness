
import React from 'react';
import { motion } from 'framer-motion';
import { Treatment } from '../types';
import Button from './ui/Button';

interface ServiceCardProps {
  treatment: Treatment;
  onBook?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ treatment, onBook }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-medimoi-black/5 hover:border-medimoi-gold/30 transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img 
          src={treatment.image} 
          alt={treatment.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest uppercase font-sans">
            {treatment.price}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="text-[9px] uppercase tracking-[0.3em] text-medimoi-gold mb-3">
          {treatment.category}
        </div>
        <h3 className="font-serif text-2xl mb-4 italic leading-tight group-hover:text-medimoi-gold transition-colors">
          {treatment.title}
        </h3>
        <p className="text-neutral-500 text-xs leading-relaxed mb-8 line-clamp-2 h-8">
          {treatment.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
          <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
            {treatment.duration}
          </span>
          <Button variant="ghost" className="!p-0 !text-[10px] hover:!text-medimoi-gold" onClick={onBook}>
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
