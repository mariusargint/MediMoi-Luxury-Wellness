
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Map, ShieldCheck, Search, ArrowUpRight } from 'lucide-react';
import { TherapistApplication } from '../../types';
import VerificationModal from '../admin/VerificationModal';
import { formatCurrency } from '../../lib/payments';

const MOCK_QUEUE: TherapistApplication[] = [
  {
    id: 'app1',
    name: 'Dr. Sarah James',
    clinicName: 'Harley Street Aesthetics',
    rating: 0,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200',
    bio: 'Medical doctor specialising in non-surgical facial rejuvenation.',
    startingPrice: '£250',
    verified: false,
    status: 'pending',
    appliedDate: '2024-06-12',
    postcode: 'W1G 9PH',
    // Fix: Added missing clinicAddress required by Therapist interface
    clinicAddress: '45 Harley Street, Marylebone, London'
  },
];

const AdminDashboard: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<TherapistApplication | null>(null);

  const stats = [
    { label: 'Commission Collected (20%)', value: formatCurrency(18450), trend: '+12%', icon: TrendingUp },
    { label: 'Total Partners', value: '142', trend: '+4 New', icon: Users },
    { label: 'Pending Verifications', value: '7', trend: 'Priority', icon: ShieldCheck },
  ];

  return (
    <div className="flex-1 p-12 overflow-y-auto no-scrollbar bg-medimoi-bg">
      <header className="mb-16">
        <h1 className="font-serif text-5xl italic mb-4">Revenue Tower.</h1>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Medimoi Platform Governance</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-medimoi-black text-white p-10 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-medimoi-gold/10 blur-3xl group-hover:bg-medimoi-gold/20 transition-all" />
            <stat.icon className="text-medimoi-gold mb-8" size={24} />
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">{stat.label}</p>
            <div className="flex items-baseline space-x-4">
              <p className="font-serif text-4xl">{stat.value}</p>
              <span className="text-medimoi-gold text-[10px] tracking-widest font-bold uppercase">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification Queue */}
        <div className="bg-white border border-medimoi-black/5 p-10">
          <div className="flex items-center justify-between mb-10 border-b border-neutral-100 pb-8">
            <h2 className="font-serif text-3xl italic">Verification Queue</h2>
            <button className="text-[10px] uppercase tracking-widest font-bold text-medimoi-gold">View All</button>
          </div>

          <div className="space-y-6">
            {MOCK_QUEUE.map(app => (
              <div key={app.id} className="flex items-center justify-between p-6 bg-medimoi-bg border border-medimoi-black/5">
                <div className="flex items-center space-x-6">
                  <img src={app.image} className="w-12 h-12 rounded-full object-cover grayscale" alt="" />
                  <div>
                    <h3 className="font-serif text-xl italic">{app.clinicName}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400">{app.name} • Applied {app.appliedDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(app)}
                  className="px-6 py-2 border border-medimoi-black text-[9px] uppercase tracking-widest font-bold hover:bg-medimoi-black hover:text-white transition-all"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Global Booking Map Placeholder */}
        <div className="bg-white border border-medimoi-black/5 p-10">
          <div className="flex items-center justify-between mb-10 border-b border-neutral-100 pb-8">
            <h2 className="font-serif text-3xl italic">Demand Heatmap</h2>
            <div className="flex items-center text-[10px] uppercase tracking-widest font-bold text-neutral-400">
              <Map size={14} className="mr-2" /> London, UK
            </div>
          </div>
          
          <div className="aspect-video bg-medimoi-bg border border-medimoi-black/5 flex flex-col items-center justify-center space-y-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300 font-bold">Heatmap Placeholder</p>
            <div className="flex flex-col space-y-2 w-full px-12">
              <div className="flex justify-between text-[9px] tracking-widest uppercase mb-1">
                <span>Mayfair (W1K)</span>
                <span className="text-medimoi-gold">42%</span>
              </div>
              <div className="h-1 bg-white relative">
                <div className="absolute h-full bg-medimoi-gold w-[42%]" />
              </div>
              
              <div className="flex justify-between text-[9px] tracking-widest uppercase mt-4 mb-1">
                <span>Chelsea (SW3)</span>
                <span className="text-medimoi-gold">28%</span>
              </div>
              <div className="h-1 bg-white relative">
                <div className="absolute h-full bg-medimoi-gold w-[28%]" />
              </div>

              <div className="flex justify-between text-[9px] tracking-widest uppercase mt-4 mb-1">
                <span>Harley St (W1G)</span>
                <span className="text-medimoi-gold">15%</span>
              </div>
              <div className="h-1 bg-white relative">
                <div className="absolute h-full bg-medimoi-gold w-[15%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VerificationModal 
        application={selectedApp} 
        onClose={() => setSelectedApp(null)}
        onApprove={(id) => { console.log('Approved', id); setSelectedApp(null); }}
        onReject={(id) => { console.log('Rejected', id); setSelectedApp(null); }}
      />
    </div>
  );
};

export default AdminDashboard;
