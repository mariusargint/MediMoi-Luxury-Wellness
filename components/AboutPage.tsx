import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, BookOpen } from 'lucide-react';
import Button from './ui/Button';

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const AboutPage: React.FC = () => {
  return (
    <div className="bg-medimoi-bg">
      {/* Hero */}
      <section className="pt-24 pb-20 px-6 md:px-12">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-6">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl italic mb-8">About MediMoi</h1>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            MediMoi was created by Soph London, founder of the internationally recognised Body by Soph Method® — a new standard in natural wellness and nervous system care.
          </p>
        </motion.div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fade} className="relative">
            <div className="aspect-square w-full max-w-md mx-auto rounded-full overflow-hidden">
              <img
                src="https://medimoi.co.uk/assets/soph-london-CyyLw3q4.jpg"
                alt="Soph London"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-medimoi-gold px-8 py-4 hidden md:block">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white font-bold">Founder & Creator</p>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }} className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-medimoi-gold font-bold">The Beginning</p>
            <h2 className="font-serif text-3xl md:text-4xl italic leading-tight">A personal journey that became a movement.</h2>
            <div className="space-y-5 text-neutral-500 text-sm leading-relaxed">
              <p>
                After developing an autoimmune condition herself, Soph found herself at a crossroads. Traditional healthcare treated symptoms in isolation. Natural therapies existed, but they were scattered, inconsistent, and difficult to access. There was no trusted bridge between modern life and natural medicine.
              </p>
              <p className="font-serif text-xl italic text-medimoi-black">
                So she built one.
              </p>
              <p>
                MediMoi was born from the belief that true healing happens when the mind, body, and nervous system are treated together — not separately.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Author / Book */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-medimoi-black/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fade} className="order-2 md:order-1 space-y-6">
            <div className="flex items-center space-x-3">
              <BookOpen size={18} className="text-medimoi-gold" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-medimoi-gold font-bold">Author</p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl italic leading-tight">Be Happy On Purpose</h2>
            <div className="space-y-5 text-neutral-500 text-sm leading-relaxed">
              <p>
                Beyond her work in wellness, Soph is also the author of Be Happy On Purpose — a guide to intentional living, emotional resilience, and finding joy in the everyday.
              </p>
              <p>
                Drawing from her personal journey and years of helping others heal, the book offers practical wisdom for creating a life that feels aligned, purposeful, and deeply fulfilling.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://www.amazon.com/dp/B0FSF25LPD?ref=cm_sw_r_ffobk_cp_ud_dp_5JPG58K7GQFYHKVB0QAJ&ref_=cm_sw_r_ffobk_cp_ud_dp_5JPG58K7GQFYHKVB0QAJ&social_share=cm_sw_r_ffobk_cp_ud_dp_5JPG58K7GQFYHKVB0QAJ&bestFormat=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">Buy The Book</Button>
              </a>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }} className="order-1 md:order-2">
            <div className="aspect-[3/4] overflow-hidden border border-medimoi-black/5">
              <img
                src="https://medimoi.co.uk/assets/soph-book-D9QfzmOn.jpg"
                alt="Be Happy On Purpose by Soph London"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Vision */}
      <section className="py-24 px-6 md:px-12">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-6">The Platform</p>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-8">A New Way to Access Natural Medicine</h2>
          <p className="text-neutral-500 text-sm leading-relaxed">
            MediMoi is a curated wellness platform that connects you to the very best natural therapies, practitioners, and treatments near you.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Sparkles, title: 'Personalised', text: 'Select your symptoms — physical, emotional, hormonal, digestive, or stress related — and receive intelligently matched therapy recommendations.' },
            { icon: ShieldCheck, title: 'Vetted', text: 'Every practitioner is verified. Every recommendation is intentional. Every pathway is designed to feel calm, premium, and supportive.' },
            { icon: Heart, title: 'Holistic', text: 'From lymphatic therapies and nervous system regulation to functional bodywork and evidence-informed natural medicine approaches.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white border border-medimoi-black/5 p-10 text-center hover:border-medimoi-gold/30 transition-colors duration-500"
            >
              <item.icon size={24} className="text-medimoi-gold mx-auto mb-6" />
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-4">{item.title}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} className="max-w-2xl mx-auto text-center space-y-3">
          <p className="font-serif text-xl italic text-medimoi-black">No guesswork. No overwhelm. No one-size-fits-all advice.</p>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.2em]">MediMoi begins with you.</p>
        </motion.div>
      </section>

      {/* Social Proof / Press */}
      <section className="py-24 px-6 md:px-12 bg-medimoi-black text-white">
        <motion.div {...fade} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-6">Recognition</p>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-4">Trusted by Icons</h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto">
              The Body by Soph Method® has transformed the wellness routines of some of the most recognised names.
            </p>
          </div>

          <div className="mb-16">
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 text-center mb-8">As featured in</p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-50">
              {['VOGUE', 'ELLE', "HARPER'S BAZAAR", 'TATLER', 'GRAZIA', 'THE TIMES'].map((name) => (
                <span key={name} className="font-serif text-lg md:text-xl tracking-wide">{name}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: 'https://medimoi.co.uk/assets/testimonial-sienna-B7vbG-aW.jpg', alt: 'Testimonial Sienna' },
              { src: 'https://medimoi.co.uk/assets/testimonial-zoe-Bff55KQ2.jpg', alt: 'Testimonial Zoe' },
              { src: 'https://medimoi.co.uk/assets/testimonial-suranne-Sp1_NcUf.jpg', alt: 'Testimonial Suranne' },
              { src: 'https://medimoi.co.uk/assets/testimonial-emma-D17MFq5p.jpg', alt: 'Testimonial Emma' },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="overflow-hidden"
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
