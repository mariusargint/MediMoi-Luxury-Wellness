
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Clock, CheckCircle2, Navigation, Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { OperatingHour } from '../../types';

const INITIAL_HOURS: OperatingHour[] = [
  { day: 'Monday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'Tuesday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'Wednesday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'Thursday', open: '09:00', close: '20:00', isClosed: false },
  { day: 'Friday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'Saturday', open: '10:00', close: '16:00', isClosed: false },
  { day: 'Sunday', open: '10:00', close: '16:00', isClosed: true },
];

const ClinicSettings: React.FC = () => {
  const [hours, setHours] = useState<OperatingHour[]>(INITIAL_HOURS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].isClosed = !newHours[index].isClosed;
    setHours(newHours);
  };

  const updateTime = (index: number, field: 'open' | 'close', value: string) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto no-scrollbar bg-medimoi-bg">
      <header className="mb-8 md:mb-16">
        <h1 className="font-serif text-3xl md:text-5xl italic mb-2 md:mb-4">Clinic Sanctuary.</h1>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Managing physical presence and availability</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        {/* Left Column: Location Form */}
        <div className="lg:col-span-2 space-y-6 md:space-y-12">
          <section className="bg-white border border-medimoi-black/5 p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10">
            <div className="flex items-center space-x-4 border-b border-neutral-100 pb-6">
              <Building2 className="text-medimoi-gold" size={20} />
              <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Clinic Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Clinic Name" defaultValue="The Mayfair Wellness Suite" />
              <Input label="Clinic Phone Number" defaultValue="+44 20 7123 4567" />
              <Input label="Physical Address" defaultValue="12 Berkeley Square, Mayfair, London" className="md:col-span-2" />
              <Input label="Postcode" defaultValue="W1J 6BD" />
              
              <div className="flex items-end">
                <Button 
                  variant={verified ? "ghost" : "primary"} 
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full"
                >
                  {isVerifying ? 'Locating...' : verified ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 size={16} className="mr-2" /> Verified on Map
                    </span>
                  ) : 'Verify Location on Map'}
                </Button>
              </div>
            </div>
          </section>

          {/* Availability Grid */}
          <section className="bg-white border border-medimoi-black/5 p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10">
            <div className="flex items-center space-x-4 border-b border-neutral-100 pb-6">
              <Clock className="text-medimoi-gold" size={20} />
              <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Standard Opening Hours</h2>
            </div>

            <div className="space-y-4">
              {hours.map((hour, idx) => (
                <div key={hour.day} className={`flex flex-col md:flex-row items-center justify-between p-4 border transition-colors ${hour.isClosed ? 'border-neutral-50 bg-neutral-50/50 opacity-60' : 'border-neutral-100 bg-white'}`}>
                  <div className="flex items-center space-x-6 w-full md:w-48 mb-4 md:mb-0">
                    <button 
                      onClick={() => toggleDay(idx)}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${hour.isClosed ? 'border-neutral-300' : 'border-medimoi-gold bg-medimoi-gold'}`}
                    >
                      {!hour.isClosed && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                    <span className="text-[11px] uppercase tracking-widest font-bold">{hour.day}</span>
                  </div>

                  {!hour.isClosed ? (
                    <div className="flex items-center space-x-4 flex-1 justify-end">
                      <input 
                        type="time" 
                        value={hour.open} 
                        onChange={(e) => updateTime(idx, 'open', e.target.value)}
                        className="bg-transparent border-b border-neutral-200 text-[11px] tracking-widest focus:outline-none focus:border-medimoi-gold p-1"
                      />
                      <span className="text-[10px] text-neutral-300">to</span>
                      <input 
                        type="time" 
                        value={hour.close} 
                        onChange={(e) => updateTime(idx, 'close', e.target.value)}
                        className="bg-transparent border-b border-neutral-200 text-[11px] tracking-widest focus:outline-none focus:border-medimoi-gold p-1"
                      />
                    </div>
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold flex-1 text-right">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Mini Map Preview */}
        <div className="space-y-8">
          <section className="bg-white border border-medimoi-black/5 p-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Discovery Preview</h3>
            <div className="aspect-[4/3] bg-medimoi-bg border border-medimoi-black/5 flex flex-col items-center justify-center mb-6 relative group overflow-hidden">
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 group-hover:opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="" 
                />
              </div>
              <MapPin className="text-medimoi-gold relative z-10" size={32} />
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 relative z-10 mt-2">W1J 6BD</p>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed italic uppercase tracking-wider">
              Clients within 5 miles will see your clinic in their discovery results.
            </p>
          </section>

          <section className="bg-medimoi-black text-white p-8 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-medimoi-gold">Status Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Profile Quality</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-medimoi-gold">Excellent</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Discovery Rate</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">84%</span>
              </div>
            </div>
            <Button variant="gold" fullWidth className="py-4">Save Changes</Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClinicSettings;
