
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, FileSearch, ExternalLink } from 'lucide-react';
import { TherapistApplication } from '../types';

const MOCK_APPLICATIONS: TherapistApplication[] = [
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
  {
    id: 'app2',
    name: 'Julian Thorne',
    clinicName: 'The Recovery Lounge',
    rating: 0,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    bio: 'Osteopath and functional movement specialist.',
    startingPrice: '£80',
    verified: false,
    status: 'pending',
    appliedDate: '2024-06-11',
    postcode: 'SW3 5RL',
    // Fix: Added missing clinicAddress required by Therapist interface
    clinicAddress: '15 Chelsea Manor Street, Chelsea, London'
  }
];

const AdminVerification: React.FC = () => {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <header className="mb-16">
        <div className="flex items-center space-x-4 mb-4">
          <ShieldAlert className="text-medimoi-gold" size={32} />
          <h1 className="font-serif text-4xl italic">Verification Queue</h1>
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Reviewing pending partner applications</p>
      </header>

      <div className="space-y-6">
        {applications.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-neutral-200">
            <CheckCircle2 size={48} className="mx-auto text-medimoi-gold mb-6 opacity-20" />
            <p className="font-serif text-2xl italic text-neutral-300">Queue is clear.</p>
          </div>
        ) : (
          applications.map(app => (
            <motion.div 
              layout
              key={app.id}
              className="bg-white border border-medimoi-black/5 p-8 flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="flex items-center space-x-8 flex-1">
                <img src={app.image} className="w-20 h-20 rounded-full object-cover grayscale" alt="" />
                <div>
                  <h3 className="font-serif text-2xl italic mb-1">{app.clinicName}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">{app.name} • {app.postcode}</p>
                  <p className="text-[9px] text-medimoi-gold mt-2 font-bold tracking-widest uppercase">Applied: {app.appliedDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-12 border-l border-neutral-100 pl-12">
                <div className="space-y-4">
                  <button className="flex items-center text-[10px] uppercase tracking-widest font-bold hover:text-medimoi-gold">
                    <FileSearch size={14} className="mr-2" /> View Certs <ExternalLink size={10} className="ml-1" />
                  </button>
                  <button className="flex items-center text-[10px] uppercase tracking-widest font-bold hover:text-medimoi-gold">
                    <FileSearch size={14} className="mr-2" /> View Insurance <ExternalLink size={10} className="ml-1" />
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => updateStatus(app.id, 'rejected')}
                    className="p-4 border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
                  <button 
                    onClick={() => updateStatus(app.id, 'approved')}
                    className="p-4 border border-green-100 text-green-500 hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminVerification;
