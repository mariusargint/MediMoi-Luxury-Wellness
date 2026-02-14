
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LocationFormProps {
  onSubmit: (location: string, notes: string) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-16 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="font-serif text-4xl italic mb-4">Treatment location</h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Where should your expert meet you?</p>
      </div>

      <div className="space-y-10">
        <Input 
          label="Full Address" 
          placeholder="ENTER HOUSE NUMBER AND STREET" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        <div className="flex flex-col space-y-4">
          <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
            Special requirements (Parking, access, allergies)
          </label>
          <textarea 
            rows={4}
            className="bg-transparent border border-neutral-200 p-6 text-sm font-sans focus:outline-none focus:border-medimoi-gold transition-colors duration-300 placeholder:text-neutral-300 tracking-wide"
            placeholder="OPTIONAL DETAILS TO HELP YOUR PRACTITIONER..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="pt-12 text-center">
          <Button 
            disabled={!address} 
            variant="primary" 
            className="px-16"
            onClick={() => onSubmit(address, notes)}
          >
            Review Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
