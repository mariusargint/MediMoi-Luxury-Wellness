
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBack: () => void;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBack, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-medimoi-bg flex flex-col md:flex-row">
      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex w-1/3 bg-medimoi-black relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            alt="Wellness Background"
          />
        </div>
        <div className="relative z-10">
          <button onClick={onBack} className="text-white flex items-center text-[10px] tracking-widest uppercase hover:text-medimoi-gold transition-colors">
            <ArrowLeft size={14} className="mr-2" /> Back to Home
          </button>
        </div>
        <div className="relative z-10">
          <h1 className="text-white font-serif text-5xl italic leading-tight mb-4">Elevate your <br/>wellbeing.</h1>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.2em]">Luxury clinical services at home.</p>
        </div>
      </div>

      {/* Right: Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full">
          <header className="mb-12 text-center lg:text-left">
            <button onClick={onBack} className="lg:hidden text-medimoi-black mb-8 flex items-center text-[10px] tracking-widest uppercase mx-auto">
              <ArrowLeft size={14} className="mr-2" /> Home
            </button>
            <h2 className="font-serif text-4xl mb-4 italic">{title}</h2>
            <p className="text-neutral-500 text-sm">{subtitle}</p>
          </header>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
