
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, List, Search, Filter, ArrowRight, Activity, TrendingUp, Users, MapPin } from 'lucide-react';
import MapPlaceholder from '../ui/MapPlaceholder';
import { Therapist } from '../../types';
import Button from '../ui/Button';

// Updated with realistic London locations for Mayfair, Chelsea, Marylebone
const MOCK_MAP_MARKERS = [
  { id: '1', lat: 51.5100, lng: -0.1450, label: 'Mayfair Wellness Suite', status: 'verified' as const },
  { id: '2', lat: 51.4875, lng: -0.1687, label: 'Chelsea Ritual Lab', status: 'verified' as const },
  { id: '3', lat: 51.4935, lng: -0.1485, label: 'Belgravia Recovery', status: 'pending' as const },
  { id: '4', lat: 51.5186, lng: -0.1548, label: 'Marylebone Clinical', status: 'verified' as const },
  { id: '5', lat: 51.5014, lng: -0.1921, label: 'Kensington Spa', status: 'pending' as const },
  { id: '6', lat: 51.5165, lng: -0.1298, label: 'Covent Garden Wellness', status: 'verified' as const },
];

const AdminMapOverview: React.FC = () => {
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  const regionStats = [
    { region: 'West London', clinics: 64, growth: '+12%', color: 'bg-medimoi-gold' },
    { region: 'Central London', clinics: 42, growth: '+5%', color: 'bg-medimoi-black' },
    { region: 'North London', clinics: 18, growth: '+22%', color: 'bg-neutral-400' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-medimoi-bg min-h-screen overflow-auto">
      {/* Header */}
      <header className="p-4 md:p-8 lg:p-12 pb-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="font-serif text-3xl md:text-5xl italic mb-2 md:mb-4">Clinic Cartography.</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Geographical footprint & market density</p>
        </motion.div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex bg-white border border-medimoi-black/5 p-1 shadow-sm">
            <button className="px-4 py-2 bg-medimoi-black text-white text-[9px] uppercase tracking-widest font-bold">Map View</button>
            <button className="px-4 py-2 hover:bg-neutral-50 text-neutral-400 text-[9px] uppercase tracking-widest font-bold">Grid View</button>
          </div>
          <button className="p-4 bg-white border border-medimoi-black/5 hover:text-medimoi-gold transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:gap-12 overflow-hidden">
        {/* Left: Interactive Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative group min-h-[300px] lg:min-h-0"
        >
          <MapPlaceholder 
            markers={MOCK_MAP_MARKERS} 
            className="w-full h-full shadow-2xl border border-medimoi-black/5 rounded-none"
            onMarkerClick={(m) => setSelectedClinicId(m.id)}
          />
          
          {/* Overlay Quick Search */}
          <div className="absolute top-8 left-8 w-64 z-20">
            <div className="bg-white/90 backdrop-blur-md border border-medimoi-black/5 p-4 flex items-center shadow-lg">
              <Search size={14} className="text-neutral-300 mr-3" />
              <input 
                type="text" 
                placeholder="FIND CLINIC OR POSTCODE..." 
                className="bg-transparent text-[9px] uppercase tracking-widest focus:outline-none w-full placeholder:text-neutral-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Sidebar Analytics & List */}
        <div className="w-full lg:w-96 flex flex-col space-y-6 lg:space-y-8 overflow-y-auto no-scrollbar pb-12 shrink-0">
          
          {/* Active List */}
          <section className="bg-white border border-medimoi-black/5 p-8 space-y-8 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-neutral-100 pb-6">Verified Partners</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar">
              {MOCK_MAP_MARKERS.filter(m => m.status === 'verified').map(m => (
                <button 
                  key={m.id}
                  onClick={() => setSelectedClinicId(m.id)}
                  className={`w-full flex items-center justify-between p-4 border transition-all ${selectedClinicId === m.id ? 'border-medimoi-gold bg-medimoi-gold/5' : 'border-neutral-50 hover:border-neutral-200 bg-neutral-50/30'}`}
                >
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-widest font-bold">{m.label}</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mt-1">London, UK</p>
                  </div>
                  <ArrowRight size={14} className={selectedClinicId === m.id ? 'text-medimoi-gold' : 'text-neutral-200'} />
                </button>
              ))}
            </div>
          </section>

          {/* regional summary */}
          <section className="bg-white border border-medimoi-black/5 p-8 space-y-8 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-neutral-100 pb-6">Regional Density</h3>
            <div className="space-y-6">
              {regionStats.map((stat) => (
                <div key={stat.region} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">{stat.region}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">{stat.clinics}</span>
                  </div>
                  <div className="h-1 bg-neutral-100 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.clinics / 70) * 100}%` }}
                      className={`absolute h-full top-0 left-0 ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recently Verified */}
          <section className="bg-medimoi-black text-white p-8 space-y-8 shadow-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-medimoi-gold">Live Market Status</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={16} className="text-medimoi-gold" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold">Chelsea Surge</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">IV Drip demand up 24% in SW3</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                  <Users size={16} className="text-medimoi-gold" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold">Partner Onboarding</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">4 pending in Marylebone (W1G)</p>
                </div>
              </div>
            </div>
            
            <Button variant="gold" fullWidth className="py-4 text-[9px]">Generate Density Report</Button>
          </section>

          {/* Visual Legend Card */}
          <div className="bg-white border border-medimoi-black/5 p-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <Activity className="text-medimoi-gold" size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">System Status</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-green-500 font-bold">All nodes active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMapOverview;
