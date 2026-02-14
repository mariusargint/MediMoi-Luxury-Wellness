
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Stethoscope, CheckCircle2, MapPin, Phone, Mail, Lock, Sparkles } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

interface ClientSignupProps {
  onBack: () => void;
  onComplete: () => void;
  onPartnerRedirect: () => void;
}

const ClientSignup: React.FC<ClientSignupProps> = ({ onBack, onComplete, onPartnerRedirect }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    password: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // go to success screen
  };

  return (
    <div className="min-h-screen bg-medimoi-bg flex flex-col md:flex-row">
      {/* Left: Branding Panel — desktop only */}
      <div className="hidden lg:flex w-1/3 bg-medimoi-black relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="relative z-10">
          <button onClick={onBack} className="text-white flex items-center text-[10px] tracking-widest uppercase hover:text-medimoi-gold transition-colors">
            <ArrowLeft size={14} className="mr-2" /> Back to Home
          </button>
        </div>
        <div className="relative z-10">
          <h1 className="text-white font-serif text-5xl italic leading-tight mb-4">
            {step === 1 && <>Your wellness<br />journey starts here.</>}
            {step === 2 && <>Almost<br />there.</>}
            {step === 3 && <>Welcome to<br />the circle.</>}
          </h1>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.2em]">
            {step === 1 && 'Choose how you want to join Medimoi.'}
            {step === 2 && 'A few details and you are in.'}
            {step === 3 && 'Premium wellness, curated for you.'}
          </p>
        </div>
      </div>

      {/* Right: Form Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full">
          {/* Mobile back button */}
          <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="lg:hidden text-medimoi-black mb-8 flex items-center text-[10px] tracking-widest uppercase">
            <ArrowLeft size={14} className="mr-2" /> {step === 1 ? 'Home' : 'Back'}
          </button>

          {/* Progress indicator */}
          {step < 3 && (
            <div className="flex items-center space-x-3 mb-12">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center">
                  <div className={`h-[2px] w-16 transition-all duration-500 ${step >= s ? 'bg-medimoi-gold' : 'bg-neutral-100'}`} />
                </div>
              ))}
              <span className="text-[9px] uppercase tracking-widest text-neutral-300 ml-2">Step {step} of 2</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <header className="text-center lg:text-left">
                  <h2 className="font-serif text-4xl mb-4 italic">Join Medimoi.</h2>
                  <p className="text-neutral-500 text-sm">How would you like to use the platform?</p>
                </header>

                <div className="space-y-4">
                  {/* Client Option */}
                  <button
                    onClick={() => setStep(2)}
                    className="w-full text-left p-8 border border-neutral-100 bg-white hover:border-medimoi-gold transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="p-4 bg-medimoi-bg group-hover:bg-medimoi-gold/10 transition-colors">
                        <User size={24} className="text-medimoi-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl italic mb-2">I want to book treatments</h3>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 leading-relaxed">
                          Browse elite practitioners, book luxury wellness sessions, and manage your appointments.
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Partner Option */}
                  <button
                    onClick={onPartnerRedirect}
                    className="w-full text-left p-8 border border-neutral-100 bg-white hover:border-medimoi-gold transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="p-4 bg-medimoi-bg group-hover:bg-medimoi-gold/10 transition-colors">
                        <Stethoscope size={24} className="text-medimoi-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl italic mb-2">I am a practitioner</h3>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 leading-relaxed">
                          List your clinic, manage bookings, and grow your practice on the Medimoi network.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <p className="text-center text-[10px] uppercase tracking-widest text-neutral-300">
                  Already have an account?{' '}
                  <button onClick={onBack} className="text-medimoi-gold font-bold hover:underline">Log In</button>
                </p>
              </motion.div>
            )}

            {/* Step 2: Client Details Form */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <header className="text-center lg:text-left">
                  <h2 className="font-serif text-4xl mb-4 italic">Your details.</h2>
                  <p className="text-neutral-500 text-sm">We keep things minimal. Just the essentials.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    placeholder="JANE DOE"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="JANE@EXAMPLE.COM"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+44 7000 000 000"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                    <Input
                      label="Postcode"
                      placeholder="W1K 7AA"
                      value={formData.postcode}
                      onChange={(e) => updateField('postcode', e.target.value)}
                    />
                  </div>

                  <Input
                    label="Create Password"
                    type="password"
                    placeholder="MIN. 8 CHARACTERS"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                  />

                  <div className="pt-4 space-y-6">
                    <Button variant="gold" fullWidth className="h-14">
                      Create Account
                    </Button>

                    <p className="text-[8px] uppercase tracking-widest text-neutral-300 text-center leading-relaxed">
                      By creating an account, you agree to our{' '}
                      <span className="text-medimoi-black font-bold">Terms of Service</span> and{' '}
                      <span className="text-medimoi-black font-bold">Privacy Policy</span>.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-center space-y-10 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <div className="w-24 h-24 mx-auto bg-medimoi-gold/10 flex items-center justify-center mb-8">
                    <CheckCircle2 size={48} className="text-medimoi-gold" />
                  </div>
                </motion.div>

                <div>
                  <h2 className="font-serif text-4xl italic mb-4">Welcome, {formData.name.split(' ')[0] || 'there'}.</h2>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Your account has been created. You are now part of London's most exclusive wellness network.
                  </p>
                </div>

                <div className="bg-white border border-medimoi-black/5 p-8 space-y-4 text-left max-w-sm mx-auto">
                  <div className="flex items-center space-x-4">
                    <Mail size={14} className="text-medimoi-gold" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">{formData.email || 'your@email.com'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin size={14} className="text-medimoi-gold" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">{formData.postcode || 'London'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Sparkles size={14} className="text-medimoi-gold" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">Client Member</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Button variant="gold" fullWidth className="h-14" onClick={onComplete}>
                    Start Browsing Treatments
                  </Button>
                  <Button variant="ghost" fullWidth onClick={onComplete}>
                    Go to Homepage
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;
