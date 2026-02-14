
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans ml-1">
        {label}
      </label>
      <input
        {...props}
        className={`
          bg-white border border-medimoi-black/5 px-4 h-14 text-[16px] font-sans 
          focus:outline-none focus:border-medimoi-gold transition-colors duration-300
          placeholder:text-neutral-300 tracking-wide rounded-none
          ${error ? 'border-red-400' : ''}
        `}
      />
      {error && <span className="text-[9px] text-red-500 uppercase tracking-widest">{error}</span>}
    </div>
  );
};

export default Input;
