
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Upload, FileText, CheckCircle2, XCircle, Info, Clock } from 'lucide-react';
import Button from '../ui/Button';

interface DocumentStatus {
  type: 'insurance' | 'certification';
  status: 'pending' | 'approved' | 'rejected' | 'empty';
  label: string;
  desc: string;
}

const PartnerVerification: React.FC = () => {
  const [docs, setDocs] = useState<DocumentStatus[]>([
    { type: 'insurance', status: 'approved', label: 'Indemnity Insurance', desc: 'Valid until June 2025' },
    { type: 'certification', status: 'pending', label: 'Clinical Certifications', desc: 'Medical Grade Aesthetics' },
  ]);

  const isFullyVerified = docs.every(d => d.status === 'approved');

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto no-scrollbar bg-medimoi-bg">
      <header className="mb-8 md:mb-16">
        <h1 className="font-serif text-3xl md:text-5xl italic mb-2 md:mb-4">Verification Portal.</h1>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Maintaining professional clinical standards</p>
      </header>

      {!isFullyVerified && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-100 p-4 md:p-8 flex flex-col md:flex-row items-start gap-4 md:space-x-6 mb-8 md:mb-16"
        >
          <ShieldAlert className="text-amber-600 shrink-0" size={24} />
          <div className="flex-1">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-800 mb-2">Account Restricted</h3>
            <p className="text-[11px] text-amber-700/70 leading-relaxed uppercase tracking-wider">
              Your profile is currently <span className="font-bold">hidden from public search</span>. Our clinical board is reviewing your certifications. This usually takes 24–48 hours.
            </p>
          </div>
          <Button variant="ghost" className="text-amber-800 border border-amber-200 shrink-0">View Guidelines</Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {docs.map((doc) => (
          <div key={doc.type} className="bg-white border border-medimoi-black/5 p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10 group relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-4 ${doc.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-medimoi-bg text-medimoi-gold'}`}>
                  {doc.type === 'insurance' ? <ShieldCheck size={24} /> : <FileText size={24} />}
                </div>
                <div>
                  <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">{doc.label}</h2>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{doc.desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {doc.status === 'approved' && <CheckCircle2 className="text-green-600" size={16} />}
                {doc.status === 'pending' && <Clock className="text-medimoi-gold" size={16} />}
                {doc.status === 'rejected' && <XCircle className="text-red-500" size={16} />}
                <span className={`text-[9px] uppercase tracking-widest font-bold ${
                  doc.status === 'approved' ? 'text-green-600' : 
                  doc.status === 'pending' ? 'text-medimoi-gold' : 'text-red-500'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>

            <div className="aspect-video border border-dashed border-neutral-100 bg-neutral-50/30 flex flex-col items-center justify-center space-y-4 group-hover:border-medimoi-gold transition-all cursor-pointer">
              <Upload className="text-neutral-300 group-hover:text-medimoi-gold" size={32} />
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold">Update Document</p>
                <p className="text-[8px] text-neutral-400 mt-1">PDF, JPG, PNG (MAX 5MB)</p>
              </div>
            </div>

            {doc.status === 'approved' && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[8px] uppercase tracking-widest font-bold text-neutral-300 hover:text-medimoi-black">View Active File</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <section className="mt-8 md:mt-16 bg-medimoi-black text-white p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4">
          <Info className="text-medimoi-gold shrink-0" size={24} />
          <h2 className="font-serif text-xl md:text-3xl italic">Compliance Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Insurance Policy</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed tracking-wider uppercase">
              Partners must maintain at least £1m in public liability insurance. Certificates must be updated annually.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Board Oversight</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed tracking-wider uppercase">
              Every document is manually reviewed by the Medimoi clinical board to ensure safety and quality.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Legal Duty</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed tracking-wider uppercase">
              By uploading, you warrant that documents are authentic and your qualifications are current.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerVerification;
