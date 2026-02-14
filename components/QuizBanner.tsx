
import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface QuizBannerProps {
  onStart?: () => void;
}

const QuizBanner: React.FC<QuizBannerProps> = ({ onStart }) => {
  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border border-medimoi-gold/30 bg-white p-12 md:p-24 text-center relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-medimoi-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-medimoi-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold mb-6 block">Not sure where to start?</span>
          <h2 className="font-serif text-4xl md:text-5xl italic mb-8 leading-tight">
            Discover the treatment <br /> curated for your wellbeing.
          </h2>
          <p className="text-neutral-500 text-sm tracking-wide leading-relaxed mb-12 uppercase">
            Take our 2-minute wellness quiz to get <br /> personalised practitioner recommendations.
          </p>
          <Button variant="primary" className="px-12 py-5 text-[11px]" onClick={onStart}>Get Personalised Recommendations</Button>
        </div>
      </motion.div>
    </section>
  );
};

export default QuizBanner;
