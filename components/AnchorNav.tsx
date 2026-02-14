
import React, { useState } from 'react';

const categories = [
  { id: 'signature', label: 'Signature' },
  { id: 'body', label: 'Body' },
  { id: 'energy-mind', label: 'Energy' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'aesthetics', label: 'Aesthetics' },
  { id: 'concierge', label: 'Concierge' }
];

const AnchorNav: React.FC = () => {
  const [active, setActive] = useState('signature');

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[60px] md:top-[112px] z-40 w-full bg-white/80 backdrop-blur-md border-y border-medimoi-black/5">
      <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar snap-x px-6 md:px-12 py-4 md:py-5">
        <div className="flex items-center justify-center min-w-full space-x-8 md:space-x-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all flex flex-col items-center group snap-center
                ${active === cat.id ? 'text-medimoi-black font-bold' : 'text-neutral-400 hover:text-medimoi-gold'}`}
            >
              <span>{cat.label}</span>
              <div className={`h-[2px] w-4 mt-1 transition-all duration-300 ${active === cat.id ? 'bg-medimoi-gold opacity-100' : 'bg-transparent opacity-0 group-hover:bg-medimoi-gold/30 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnchorNav;
