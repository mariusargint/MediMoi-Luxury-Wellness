
import React from 'react';
import { Search, Calendar, User, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: any) => void;
  isPartner?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate, isPartner = false }) => {
  const tabs = isPartner ? [
    { id: 'therapist_dashboard', label: 'Home', icon: Sparkles },
    { id: 'therapist_appointments', label: 'Schedule', icon: Calendar },
    { id: 'messages', label: 'Chat', icon: MessageSquare },
    { id: 'therapist_profile', label: 'You', icon: User },
  ] : [
    { id: 'home', label: 'Home', icon: Search },
    { id: 'services', label: 'Menu', icon: Sparkles },
    { id: 'login', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-medimoi-black/5 pb-safe pt-2 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
      <div className="max-w-md mx-auto flex items-center justify-around px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id || (tab.id === 'home' && activeView === 'services');
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center py-2 px-3 flex-1 transition-all"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-medimoi-gold scale-110' : 'text-neutral-300'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] uppercase tracking-[0.15em] font-bold mt-1.5 transition-colors ${isActive ? 'text-medimoi-black' : 'text-neutral-300'}`}>
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-2 w-8 h-0.5 bg-medimoi-gold rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
