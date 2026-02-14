
import React from 'react';
import { Search, Calendar, User, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeView: string;
  onNavigate: (view: any) => void;
  isPartner?: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate, isPartner = false }) => {
  const clientTabs = [
    { id: 'home', label: 'Explore', icon: Search },
    { id: 'services', label: 'Treatments', icon: Sparkles },
    { id: 'login', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const partnerTabs = [
    { id: 'therapist_dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'therapist_appointments', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'therapist_profile', label: 'Settings', icon: User },
  ];

  const tabs = isPartner ? partnerTabs : clientTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-medimoi-black/5 pb-safe pt-2">
      <div className="flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id || (tab.id === 'home' && activeView === 'services');
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center py-2 px-4 space-y-1 transition-all group"
            >
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'text-medimoi-gold' : 'text-neutral-400'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'text-medimoi-black' : 'text-neutral-400'}`}>
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="mobile-active-indicator"
                  className="absolute -top-2 w-8 h-0.5 bg-medimoi-gold rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
