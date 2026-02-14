import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Sparkles, Heart, Brain, Wind, Flower2, ChevronRight } from 'lucide-react';
import { Treatment } from '../types';
import { TREATMENTS } from '../data/treatments';

interface WellnessQuizProps {
  onClose: () => void;
  onBook: (treatment: Treatment) => void;
}

interface Category {
  id: string;
  label: string;
  icon: React.FC<any>;
  description: string;
}

interface Concern {
  id: string;
  label: string;
  treatmentIds: string[];
}

const CATEGORIES: Category[] = [
  { id: 'body', label: 'Body & Physical', icon: Heart, description: 'Pain, tension, recovery, lymphatic health, or body sculpting' },
  { id: 'mind', label: 'Mind & Emotions', icon: Brain, description: 'Stress, anxiety, emotional weight, or life transitions' },
  { id: 'energy', label: 'Energy & Balance', icon: Wind, description: 'Fatigue, hormonal changes, nervous system dysregulation' },
  { id: 'beauty', label: 'Skin & Beauty', icon: Flower2, description: 'Facial sculpting, skin health, or luxury beauty treatments' },
];

const CONCERNS: Record<string, Concern[]> = {
  body: [
    { id: 'inflammation', label: 'Inflammation & Water Retention', treatmentIds: ['soph-1', 'body-1', 'body-2'] },
    { id: 'sculpting', label: 'Body Sculpting & Contouring', treatmentIds: ['soph-2', 'body-2', 'body-3'] },
    { id: 'pain', label: 'Muscle Pain & Tension', treatmentIds: ['body-7', 'body-8', 'body-6'] },
    { id: 'recovery', label: 'Post-Surgery or Postpartum Recovery', treatmentIds: ['body-9', 'body-1', 'body-10'] },
    { id: 'digestion', label: 'Digestion & Gut Health', treatmentIds: ['soph-1', 'soph-2', 'body-4'] },
  ],
  mind: [
    { id: 'stress', label: 'Stress & Burnout', treatmentIds: ['soph-1', 'energy-1', 'mind-4'] },
    { id: 'anxiety', label: 'Anxiety & Overwhelm', treatmentIds: ['soph-1', 'mind-3', 'mind-1'] },
    { id: 'emotional', label: 'Emotional Release & Letting Go', treatmentIds: ['soph-1', 'mind-3', 'energy-1'] },
    { id: 'confidence', label: 'Confidence & Clarity', treatmentIds: ['mind-2', 'mind-1', 'mind-3'] },
  ],
  energy: [
    { id: 'fatigue', label: 'Chronic Fatigue & Low Energy', treatmentIds: ['soph-1', 'body-5', 'energy-1'] },
    { id: 'hormones', label: 'Hormonal Imbalance', treatmentIds: ['mind-4', 'body-4', 'body-5'] },
    { id: 'nervous', label: 'Nervous System Dysregulation', treatmentIds: ['soph-1', 'mind-3', 'body-11'] },
    { id: 'sleep', label: 'Sleep & Rest Issues', treatmentIds: ['soph-1', 'energy-1', 'body-11'] },
  ],
  beauty: [
    { id: 'facial', label: 'Facial Sculpting & Lifting', treatmentIds: ['beauty-1'] },
    { id: 'skin', label: 'Skin Tightening & Firmness', treatmentIds: ['soph-2', 'beauty-1'] },
    { id: 'glow', label: 'Glow & Radiance', treatmentIds: ['beauty-1', 'body-1', 'body-11'] },
  ],
};

const WellnessQuiz: React.FC<WellnessQuizProps> = ({ onClose, onBook }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [results, setResults] = useState<Treatment[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedConcerns([]);
    setStep(2);
  };

  const toggleConcern = (concernId: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concernId) ? prev.filter(c => c !== concernId) : [...prev, concernId]
    );
  };

  const generateResults = () => {
    if (!selectedCategory) return;
    const concerns = CONCERNS[selectedCategory];
    const selected = concerns.filter(c => selectedConcerns.includes(c.id));

    // Count how many times each treatment is recommended
    const scores: Record<string, number> = {};
    selected.forEach(concern => {
      concern.treatmentIds.forEach((id, idx) => {
        scores[id] = (scores[id] || 0) + (3 - idx); // Higher weight for first-listed
      });
    });

    // Sort by score and get top treatments
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([id]) => TREATMENTS.find(t => t.id === id))
      .filter(Boolean) as Treatment[];

    setResults(sorted);
    setStep(3);
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedCategory(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-medimoi-bg flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 md:px-12 py-8 flex items-center justify-between border-b border-medimoi-black/5 bg-white">
        <div className="flex items-center space-x-6">
          {step > 1 ? (
            <button onClick={goBack} className="hover:text-medimoi-gold transition-colors">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button onClick={onClose} className="hover:text-medimoi-gold transition-colors">
              <X size={20} />
            </button>
          )}
          <div className="hidden md:block">
            <h1 className="font-serif text-xl italic">Wellness Quiz</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex space-x-4 md:space-x-8">
          {['Focus', 'Concerns', 'Results'].map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              <span className={`text-[9px] uppercase tracking-[0.2em] mb-2 hidden md:block ${step >= i + 1 ? 'text-medimoi-black' : 'text-neutral-300'}`}>
                {label}
              </span>
              <div className={`h-[1px] w-6 md:w-8 transition-all duration-500 ${step >= i + 1 ? 'bg-medimoi-black' : 'bg-neutral-100'}`} />
            </div>
          ))}
        </div>

        <button onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold hidden md:block">Cancel</button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="max-w-3xl mx-auto px-6 py-16 w-full"
          >
            {/* Step 1: Category */}
            {step === 1 && (
              <div className="space-y-12">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-4">Step 1</p>
                  <h2 className="font-serif text-3xl md:text-4xl italic mb-4">What would you like to focus on?</h2>
                  <p className="text-neutral-400 text-xs uppercase tracking-widest">Select the area that resonates most with you right now</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CATEGORIES.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="bg-white border border-medimoi-black/5 p-8 text-left hover:border-medimoi-gold/40 transition-all duration-500 group"
                      >
                        <Icon size={24} className="text-medimoi-gold mb-5" />
                        <h3 className="font-serif text-xl italic mb-2 group-hover:text-medimoi-gold transition-colors">{cat.label}</h3>
                        <p className="text-neutral-400 text-xs leading-relaxed">{cat.description}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Concerns */}
            {step === 2 && selectedCategory && (
              <div className="space-y-12">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold mb-4">Step 2</p>
                  <h2 className="font-serif text-3xl md:text-4xl italic mb-4">What are your main concerns?</h2>
                  <p className="text-neutral-400 text-xs uppercase tracking-widest">Select all that apply to you</p>
                </div>

                <div className="space-y-3">
                  {CONCERNS[selectedCategory].map((concern, i) => {
                    const isSelected = selectedConcerns.includes(concern.id);
                    return (
                      <motion.button
                        key={concern.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => toggleConcern(concern.id)}
                        className={`w-full p-6 border text-left flex items-center justify-between transition-all duration-300 ${
                          isSelected
                            ? 'border-medimoi-gold bg-medimoi-gold/5'
                            : 'border-medimoi-black/5 bg-white hover:border-medimoi-gold/30'
                        }`}
                      >
                        <span className={`text-[11px] uppercase tracking-[0.15em] font-bold ${isSelected ? 'text-medimoi-gold' : 'text-medimoi-black'}`}>
                          {concern.label}
                        </span>
                        <div className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'bg-medimoi-gold border-medimoi-gold' : 'border-neutral-300'
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  disabled={selectedConcerns.length === 0}
                  onClick={generateResults}
                  className="w-full h-16 bg-medimoi-black text-white text-[11px] uppercase tracking-[0.3em] font-bold disabled:opacity-20 transition-opacity"
                >
                  See My Recommendations
                </button>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-medimoi-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles size={28} className="text-medimoi-gold" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl italic mb-4">Your Personalised Pathway</h2>
                  <p className="text-neutral-400 text-xs uppercase tracking-widest">Based on your wellness profile, we recommend</p>
                </div>

                <div className="space-y-4">
                  {results.map((treatment, i) => (
                    <motion.div
                      key={treatment.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-medimoi-black/5 hover:border-medimoi-gold/30 transition-all duration-500 flex overflow-hidden"
                    >
                      <div className="w-28 md:w-40 shrink-0">
                        <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            {i === 0 && (
                              <span className="text-[8px] uppercase tracking-widest font-bold text-medimoi-gold bg-medimoi-gold/10 px-2 py-0.5">Top Match</span>
                            )}
                            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">{treatment.category}</span>
                          </div>
                          <h3 className="font-serif text-lg md:text-xl italic mb-1">{treatment.title}</h3>
                          <p className="text-[10px] uppercase tracking-widest text-neutral-400">{treatment.duration} &middot; {treatment.price}</p>
                        </div>
                        <button
                          onClick={() => onBook(treatment)}
                          className="mt-4 self-start flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-medimoi-gold hover:text-medimoi-black transition-colors"
                        >
                          <span>Book Now</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => { setStep(1); setSelectedCategory(null); setSelectedConcerns([]); setResults([]); }}
                    className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-medimoi-black transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default WellnessQuiz;
