
import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import Button from './ui/Button';

interface SearchBarProps {
  onSearch?: (postcode?: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [treatment, setTreatment] = useState('');
  const [postcode, setPostcode] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(postcode || undefined);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden mt-12 flex flex-col md:flex-row border border-medimoi-black/5">
      <div className="flex-1 border-b md:border-b-0 md:border-r border-medimoi-black/10 px-6 py-4 flex items-center bg-white group transition-all">
        <Sparkles size={18} className="text-medimoi-gold mr-4 group-hover:scale-110 transition-transform" />
        <input 
          type="text" 
          placeholder="TREATMENT (E.G. IV DRIP)" 
          className="w-full bg-transparent focus:outline-none text-[12px] font-sans uppercase tracking-widest placeholder:text-neutral-300 py-2"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <div className="flex-1 px-6 py-4 flex items-center bg-white group transition-all">
        <MapPin size={18} className="text-neutral-400 mr-4 group-hover:text-medimoi-gold transition-colors" />
        <input 
          type="text" 
          placeholder="POSTCODE" 
          className="w-full bg-transparent focus:outline-none text-[12px] font-sans uppercase tracking-widest placeholder:text-neutral-300 py-2"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <Button 
        variant="primary" 
        className="md:w-64 rounded-none !py-6 !px-12 text-[12px]"
        onClick={handleSearch}
      >
        Search Treatments
      </Button>
    </div>
  );
};

export default SearchBar;
