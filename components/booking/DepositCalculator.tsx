
import React from 'react';

interface DepositCalculatorProps {
  totalPrice: number;
  className?: string;
}

const DepositCalculator: React.FC<DepositCalculatorProps> = ({ totalPrice, className = '' }) => {
  const deposit = totalPrice * 0.2;
  const balance = totalPrice * 0.8;

  return (
    <div className={`space-y-6 border border-medimoi-black/5 bg-white p-8 ${className}`}>
      <div className="flex justify-between items-center border-b border-medimoi-black/5 pb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Treatment Total</span>
        <span className="font-serif text-xl italic">£{totalPrice.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-medimoi-gold font-bold">Platform Deposit (20%)</span>
          <span className="text-[8px] uppercase tracking-widest text-neutral-400">Payable now to secure booking</span>
        </div>
        <span className="font-serif text-2xl text-medimoi-gold">£{deposit.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-medimoi-black">Clinic Balance (80%)</span>
          <span className="text-[8px] uppercase tracking-widest text-neutral-400">Payable at clinic after treatment</span>
        </div>
        <span className="font-serif text-xl italic text-neutral-400">£{balance.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default DepositCalculator;
