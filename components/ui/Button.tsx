
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans tracking-widest uppercase text-[11px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-medimoi-black text-white hover:bg-opacity-90 px-8 py-3.5",
    outline: "border border-medimoi-black text-medimoi-black hover:bg-medimoi-black hover:text-white px-8 py-3.5",
    gold: "bg-medimoi-gold text-white hover:bg-medimoi-goldLight px-8 py-3.5",
    ghost: "text-medimoi-black hover:text-medimoi-gold px-4 py-2"
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-[11px] px-8 py-3.5",
    lg: "text-[12px] px-10 py-4.5"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
