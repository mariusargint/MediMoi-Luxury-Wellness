
import React from 'react';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, ShieldCheck, Map, Building2, FileCheck } from 'lucide-react';

interface SidebarProps {
  type: 'admin' | 'therapist';
  activeView: string;
  onNavigate: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ type, activeView, onNavigate }) => {
  const adminLinks = [
    { id: 'admin_dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'admin_map', label: 'Clinic Map', icon: Map },
    { id: 'admin_verification', label: 'Verifications', icon: ShieldCheck },
    { id: 'admin_finance', label: 'Financials', icon: CreditCard },
  ];

  const therapistLinks = [
    { id: 'therapist_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'therapist_clinic', label: 'Clinic Settings', icon: Building2 },
    { id: 'therapist_verification', label: 'Verification', icon: FileCheck },
    { id: 'therapist_appointments', label: 'Appointments', icon: Users },
    { id: 'therapist_profile', label: 'Personal Profile', icon: Settings },
  ];

  const links = type === 'admin' ? adminLinks : therapistLinks;

  return (
    <aside className="w-64 bg-white border-r border-medimoi-black/5 h-screen sticky top-0 flex flex-col pt-32 pb-12">
      <div className="px-8 mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-medimoi-gold font-bold">
          {type === 'admin' ? 'Management' : 'Partner Portal'}
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeView === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 text-[11px] uppercase tracking-widest transition-all duration-300 group
                ${isActive ? 'text-medimoi-black bg-medimoi-bg font-bold' : 'text-neutral-400 hover:text-medimoi-black'}`}
            >
              <Icon size={16} className={isActive ? 'text-medimoi-gold' : 'group-hover:text-medimoi-gold'} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <button 
          onClick={() => onNavigate('home')}
          className="w-full flex items-center space-x-4 px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
