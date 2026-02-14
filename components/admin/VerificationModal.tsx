
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react';
import { TherapistApplication } from '../../types';
import Button from '../ui/Button';

interface VerificationModalProps {
  application: TherapistApplication | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ application, onClose, onApprove, onReject }) => {
  if (!application) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-medimoi-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-medimoi-black/5 flex justify-between items-center">
            <div>
              <h2 className="font-serif text-3xl italic">Review Practitioner</h2>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Application ID: {application.id}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
            {/* Profile Info */}
            <div className="flex items-center space-x-8">
              <img src={application.image} alt="" className="w-24 h-24 rounded-full object-cover grayscale" />
              <div>
                <h3 className="font-serif text-2xl mb-1">{application.name}</h3>
                <p className="text-[11px] uppercase tracking-widest text-medimoi-gold font-bold">{application.clinicName}</p>
                <p className="text-xs text-neutral-500 mt-2">{application.bio}</p>
              </div>
            </div>

            {/* Verification Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-medimoi-black/5 bg-medimoi-bg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 text-medimoi-black">
                    <FileText size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Medical Certificate</span>
                  </div>
                  <ExternalLink size={14} className="text-neutral-300" />
                </div>
                <button className="w-full py-2 bg-white text-[9px] uppercase tracking-widest border border-medimoi-black/5 hover:border-medimoi-gold transition-colors">
                  View Document
                </button>
              </div>

              <div className="p-6 border border-medimoi-black/5 bg-medimoi-bg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 text-medimoi-black">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Insurance Policy</span>
                  </div>
                  <ExternalLink size={14} className="text-neutral-300" />
                </div>
                <button className="w-full py-2 bg-white text-[9px] uppercase tracking-widest border border-medimoi-black/5 hover:border-medimoi-gold transition-colors">
                  View Document
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300">Approval Checklist</h4>
              <label className="flex items-center space-x-4 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-medimoi-gold" />
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 group-hover:text-medimoi-black transition-colors">Identity verified with Government ID</span>
              </label>
              <label className="flex items-center space-x-4 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-medimoi-gold" />
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 group-hover:text-medimoi-black transition-colors">Clinic address matches registration</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-medimoi-black/5 bg-medimoi-bg/50 flex space-x-4">
            <Button variant="outline" fullWidth onClick={() => onReject(application.id)}>Reject Application</Button>
            <Button variant="gold" fullWidth onClick={() => onApprove(application.id)}>Approve Partner</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VerificationModal;
