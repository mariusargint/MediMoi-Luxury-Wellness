
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle, Clock, ShieldAlert, CreditCard, X, AlertTriangle } from 'lucide-react';
import { Appointment } from '../../types';
import { calculateSplit, formatCurrency } from '../../lib/payments';

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'ap1', clientName: 'Eleanor Vance', treatmentName: 'The Body by Soph Method\u00AE', date: '2024-06-20', time: '14:30', status: 'confirmed', postcode: 'W1K', totalPrice: 140 },
  { id: 'ap2', clientName: 'James Sterling', treatmentName: 'Lymphatic Drainage', date: '2024-06-21', time: '10:00', status: 'pending', postcode: 'SW3', totalPrice: 80 },
  { id: 'ap3', clientName: 'Olivia Thorne', treatmentName: 'Facial Sculpting', date: '2024-06-22', time: '16:00', status: 'confirmed', postcode: 'W1J', totalPrice: 120 },
];

const TherapistDashboard: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [acceptedInsurance, setAcceptedInsurance] = useState(false);
  const [acceptedQualified, setAcceptedQualified] = useState(false);
  const [acceptedLiability, setAcceptedLiability] = useState(false);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  const stats = [
    { label: 'Pending Bookings', value: '4', icon: Clock, color: 'text-medimoi-gold' },
    { label: 'Total Earned (80%)', value: formatCurrency(2450), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Platform Fees (20%)', value: formatCurrency(612.50), icon: CreditCard, color: 'text-medimoi-black' },
  ];

  const verificationStatus: 'verified' | 'pending' | 'action' = 'verified';

  const canAccept = acceptedInsurance && acceptedQualified && acceptedLiability;

  const handleAcceptBooking = () => {
    if (selectedAppointment) {
      setAppointments(prev =>
        prev.map(a => a.id === selectedAppointment.id ? { ...a, status: 'confirmed' as const } : a)
      );
      setSelectedAppointment(null);
      setAcceptedInsurance(false);
      setAcceptedQualified(false);
      setAcceptedLiability(false);
    }
  };

  const openConfirmation = (app: Appointment) => {
    setSelectedAppointment(app);
    setAcceptedInsurance(false);
    setAcceptedQualified(false);
    setAcceptedLiability(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto no-scrollbar bg-medimoi-bg">
      <header className="mb-8 md:mb-16 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl italic mb-2 md:mb-4">Bonjour, Alexandra.</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Managing The Mayfair Wellness Suite</p>
        </div>

        {verificationStatus === 'verified' ? (
          <div className="flex items-center space-x-3 bg-green-50 text-green-700 px-6 py-3 border border-green-100">
            <CheckCircle size={16} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Partner Verified</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3 bg-amber-50 text-amber-700 px-6 py-3 border border-amber-100">
            <ShieldAlert size={16} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Verification Pending</span>
          </div>
        )}
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-8 border border-medimoi-black/5 hover:border-medimoi-gold transition-colors duration-500"
          >
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</p>
            <p className="font-serif text-3xl">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Appointment Queue */}
      <div className="bg-white border border-medimoi-black/5 p-4 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6 md:mb-10 border-b border-neutral-100 pb-4 md:pb-8">
          <h2 className="font-serif text-xl md:text-3xl italic">Upcoming Appointments</h2>
          <button className="text-[10px] uppercase tracking-widest font-bold text-medimoi-gold">View Calendar</button>
        </div>

        <div className="space-y-6">
          {appointments.map(app => (
            <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border border-neutral-50 hover:bg-medimoi-bg transition-colors gap-4">
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-medimoi-bg flex items-center justify-center font-serif italic text-lg md:text-xl shrink-0">
                  {app.clientName[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base md:text-xl italic truncate">{app.clientName}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 truncate">{app.treatmentName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:contents gap-4">
                <div className="text-left md:text-center">
                  <p className="text-[11px] uppercase tracking-widest text-medimoi-black font-bold">{app.date}</p>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">{app.time}</p>
                </div>

                <div className="text-center hidden lg:block">
                  <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">Location</p>
                  <span className="bg-white border border-medimoi-black/10 px-3 py-1 text-[9px] tracking-widest font-bold">{app.postcode}</span>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="text-right hidden md:block">
                    <p className="font-serif text-lg mb-1">{formatCurrency(calculateSplit(app.totalPrice).balance)}</p>
                    <p className="text-[8px] uppercase tracking-widest text-neutral-400">Balance at Clinic</p>
                  </div>
                  {app.status === 'pending' ? (
                    <button
                      onClick={() => openConfirmation(app)}
                      className="px-4 md:px-5 py-2 bg-medimoi-gold text-white text-[9px] uppercase tracking-widest font-bold hover:bg-medimoi-goldLight transition-colors whitespace-nowrap"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="px-3 md:px-4 py-2 bg-green-50 text-green-600 border border-green-100 text-[9px] uppercase tracking-widest font-bold whitespace-nowrap">
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Acceptance Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="fixed inset-0 z-[200] bg-medimoi-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] z-[201] bg-white border border-medimoi-black/5 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl italic">Accept Booking</h3>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1">Practitioner confirmation required</p>
                </div>
                <button onClick={() => setSelectedAppointment(null)} className="p-2 hover:bg-neutral-50 transition-colors">
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>

              {/* Booking Details */}
              <div className="p-8 bg-medimoi-bg border-b border-neutral-100 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Client</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest">{selectedAppointment.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Treatment</span>
                  <span className="text-[11px] font-serif italic">{selectedAppointment.treatmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Date & Time</span>
                  <span className="text-[11px] tracking-widest">{selectedAppointment.date} at {selectedAppointment.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Your Earnings (80%)</span>
                  <span className="text-[11px] font-bold text-green-600">{formatCurrency(calculateSplit(selectedAppointment.totalPrice).balance)}</span>
                </div>
              </div>

              {/* Confirmation Checkboxes */}
              <div className="p-8 space-y-5">
                <div className="flex items-center space-x-4 mb-6">
                  <AlertTriangle size={18} className="text-medimoi-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Practitioner Declaration</h4>
                </div>

                {/* Insurance */}
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <button
                    onClick={() => setAcceptedInsurance(!acceptedInsurance)}
                    className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      acceptedInsurance ? 'bg-medimoi-gold border-medimoi-gold' : 'border-neutral-300 group-hover:border-medimoi-gold'
                    }`}
                  >
                    {acceptedInsurance && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-600 leading-relaxed">
                    I confirm that I hold <span className="font-bold text-medimoi-black">valid and current professional indemnity insurance</span> covering the treatment being provided.
                  </span>
                </label>

                {/* Qualifications */}
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <button
                    onClick={() => setAcceptedQualified(!acceptedQualified)}
                    className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      acceptedQualified ? 'bg-medimoi-gold border-medimoi-gold' : 'border-neutral-300 group-hover:border-medimoi-gold'
                    }`}
                  >
                    {acceptedQualified && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-600 leading-relaxed">
                    I confirm that I hold the <span className="font-bold text-medimoi-black">correct qualifications and certifications</span> required to perform <span className="font-bold italic">{selectedAppointment.treatmentName}</span>.
                  </span>
                </label>

                {/* Liability */}
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <button
                    onClick={() => setAcceptedLiability(!acceptedLiability)}
                    className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      acceptedLiability ? 'bg-medimoi-gold border-medimoi-gold' : 'border-neutral-300 group-hover:border-medimoi-gold'
                    }`}
                  >
                    {acceptedLiability && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-600 leading-relaxed">
                    I understand that <span className="font-bold text-medimoi-black">I am solely liable</span> for the treatment provided. Medimoi acts exclusively as a booking platform and bears no clinical responsibility for any outcomes, adverse reactions, or disputes arising from this appointment.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="p-8 border-t border-neutral-100 space-y-3">
                <button
                  disabled={!canAccept}
                  onClick={handleAcceptBooking}
                  className="w-full h-14 bg-medimoi-black text-white text-[11px] uppercase tracking-[0.3em] font-bold disabled:opacity-20 transition-opacity"
                >
                  Accept & Confirm Booking
                </button>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="w-full h-10 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-medimoi-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TherapistDashboard;
