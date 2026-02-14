
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { VerificationDocument } from '../../types';
import Button from '../ui/Button';

interface DocumentReviewCardProps {
  doc: VerificationDocument;
  partnerName: string;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

const DocumentReviewCard: React.FC<DocumentReviewCardProps> = ({ doc, partnerName, onApprove, onReject }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-medimoi-black/5 overflow-hidden flex flex-col md:flex-row h-[600px]"
    >
      {/* Document View Area */}
      <div className="flex-1 bg-medimoi-bg border-r border-medimoi-black/5 p-12 flex flex-col items-center justify-center relative group">
        <div className="absolute top-6 left-6 flex items-center space-x-4">
          <div className="p-3 bg-white shadow-sm">
            {doc.type === 'insurance' ? <ShieldCheck className="text-medimoi-gold" size={20} /> : <FileText className="text-medimoi-gold" size={20} />}
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Document Source</p>
            <p className="text-[11px] uppercase tracking-widest font-bold">{doc.fileName}</p>
          </div>
        </div>

        <button className="absolute top-6 right-6 p-3 bg-white border border-medimoi-black/5 hover:bg-medimoi-black hover:text-white transition-all">
          <ExternalLink size={16} />
        </button>

        {/* Mock Document Preview */}
        <div className="w-full h-full max-w-lg mt-12 bg-white shadow-2xl p-12 border border-medimoi-black/5 relative overflow-hidden">
          <div className="space-y-6 opacity-30 select-none">
            <div className="h-4 bg-neutral-200 w-1/3" />
            <div className="h-12 bg-neutral-100 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-neutral-50 w-full" />
              <div className="h-4 bg-neutral-50 w-full" />
            </div>
            <div className="h-32 bg-neutral-50/50 w-full" />
            <div className="h-4 bg-neutral-200 w-1/4" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-300 font-serif italic rotate-[-15deg]">Verification Preview Only</span>
          </div>
        </div>
      </div>

      {/* Review & Actions Sidebar */}
      <div className="w-full md:w-96 p-12 flex flex-col justify-between">
        <div className="space-y-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-medimoi-gold mb-2 block">Board Review</span>
            <h3 className="font-serif text-3xl italic">{partnerName}</h3>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-2">Uploaded on {doc.uploadedAt}</p>
          </div>

          <div className="space-y-6 pt-6 border-t border-neutral-100">
            <h4 className="text-[10px] uppercase tracking-widest font-bold">Compliance Checklist</h4>
            <div className="space-y-4">
              {['Name matches registration', 'Valid expiration date', 'Official watermark present'].map(check => (
                <label key={check} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-neutral-200 flex items-center justify-center group-hover:border-medimoi-gold">
                    <Check size={10} className="text-medimoi-gold opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500">{check}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold">Reviewer Notes</h4>
            <textarea 
              className="w-full bg-medimoi-bg border border-medimoi-black/5 p-4 text-[11px] focus:outline-none focus:border-medimoi-gold min-h-[100px]" 
              placeholder="OPTIONAL FEEDBACK FOR PARTNER..."
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 pt-10">
          <Button variant="gold" fullWidth onClick={() => onApprove(doc.id)} className="py-5">
            Approve & Publish
          </Button>
          <Button variant="ghost" fullWidth onClick={() => onReject(doc.id, "Documents unclear")} className="text-red-500 hover:bg-red-50">
            Reject Document
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentReviewCard;
