
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const navigate = (view: string) => {
    if ((window as any)._setView) {
      (window as any)._setView(view);
    }
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { id: 'services', label: 'Treatments' },
    { id: 'about', label: 'About' },
    { id: 'therapist_onboarding', label: 'Become a Partner' },
    { id: 'login', label: 'Log In' },
    { id: 'signup', label: 'Sign Up' },
    { id: 'admin_dashboard', label: 'Admin Portal', admin: true },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-medimoi-black/5' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile: Hamburger Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-medimoi-black"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Links - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-10 text-[11px] font-sans uppercase tracking-[0.2em] text-medimoi-black">
            <button onClick={() => navigate('services')} className="hover:text-medimoi-gold transition-colors">Treatments</button>
            <button onClick={() => navigate('about')} className="hover:text-medimoi-gold transition-colors">About</button>
            <button onClick={() => navigate('therapist_onboarding')} className="hover:text-medimoi-gold transition-colors italic">Become a Partner</button>
          </div>

          {/* Logo - Stays Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <button onClick={() => navigate('home')} className={`font-serif tracking-widest lowercase transition-all duration-500 ${isScrolled || isMenuOpen ? 'text-2xl' : 'text-3xl'}`}>
              Medimoi<span className="text-medimoi-gold">.</span>
            </button>
          </div>

          {/* Right Links */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden lg:flex items-center space-x-8 text-[11px] font-sans uppercase tracking-[0.2em]">
              <button onClick={() => navigate('services')} className="flex items-center hover:text-medimoi-gold transition-colors">
                <Search size={14} className="mr-2" />
                Search
              </button>
              <button onClick={() => navigate('login')} className="flex items-center hover:text-medimoi-gold transition-colors">
                <User size={14} className="mr-2" />
                Login
              </button>
              <button onClick={() => navigate('signup')} className="text-medimoi-gold font-bold hover:text-medimoi-goldLight transition-colors">
                Sign Up
              </button>
            </div>
            
            {/* Action Button - Smarter Mobile sizing */}
            <Button 
              variant="gold" 
              size="sm" 
              className="hidden sm:inline-flex px-6 py-2.5" 
              onClick={() => navigate('services')}
            >
              Book Now
            </Button>

            {/* Mobile-only Search Icon */}
            <button onClick={() => navigate('services')} className="lg:hidden p-2 -mr-2 text-medimoi-black">
              <Search size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Editorial Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white lg:hidden flex flex-col pt-32 px-10 pb-12 overflow-y-auto"
          >
            <div className="flex-1 space-y-12">
              <div className="space-y-8">
                {menuLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => navigate(link.id)}
                    className={`w-full text-left flex items-center justify-between group ${link.admin ? 'opacity-40 mt-12' : ''}`}
                  >
                    <span className={`font-serif text-4xl italic transition-colors group-hover:text-medimoi-gold`}>
                      {link.label}
                    </span>
                    <ArrowRight size={20} className="text-medimoi-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-12 border-t border-medimoi-black/5 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-2">Support</p>
                  <p className="text-[12px] uppercase tracking-widest font-bold">Concierge Service</p>
                </div>
                <div className="w-10 h-10 bg-medimoi-bg flex items-center justify-center">
                  <User size={16} />
                </div>
              </div>
              <Button variant="primary" fullWidth size="lg" onClick={() => navigate('services')}>
                Book an Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
