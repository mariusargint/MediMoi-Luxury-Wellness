
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Wind } from 'lucide-react';
import { Treatment } from '../types';
import Button from './ui/Button';

interface SignatureHeroProps {
  treatments: Treatment[];
  onBook: () => void;
}

const SignatureHero: React.FC<SignatureHeroProps> = ({ treatments, onBook }) => {
  const sophMethod = treatments[0];

  return (
    <section id="signature" className="bg-[#F3EEE7] py-16 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-sans mb-4 block">The Signature Method</span>
              <h2 className="font-serif text-3xl md:text-6xl italic leading-tight mb-6">
                The Body by <br /> Soph Method®
              </h2>
              <p className="font-sans text-neutral-600 text-sm leading-relaxed max-w-lg">
                Our signature approach to wellness recalibrates your entire being through physical touch and emotional release.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Wind, label: 'Nervous System Reset', desc: 'Calming cues for deep repair.' },
                { icon: Heart, label: 'Emotional Release', desc: 'Letting go of stored stress.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="p-3 bg-white mr-4 shadow-sm">
                    <item.icon size={16} className="text-medimoi-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold mb-0.5">{item.label}</h4>
                    <p className="text-[10px] text-neutral-400 leading-tight uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button variant="primary" className="h-14 md:px-10" onClick={onBook}>Book Session</Button>
            </div>
          </motion.div>

          <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden">
            <img 
              src={sophMethod.image} 
              alt="Soph Method" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute bottom-6 left-6 p-6 bg-white shadow-xl max-w-[200px]">
              <p className="font-serif text-xl italic mb-1">Featured</p>
              <p className="text-[8px] uppercase tracking-widest text-neutral-400">Medimoi Elite Partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureHero;
