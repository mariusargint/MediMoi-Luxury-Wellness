
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ResponsiveWrapper from './components/layout/ResponsiveWrapper';
import SearchBar from './components/SearchBar';
import WellnessQuiz from './components/WellnessQuiz';
import TreatmentCard from './components/TreatmentCard';
import TreatmentDetail from './components/TreatmentDetail';
import Input from './components/ui/Input';
import Button from './components/ui/Button';
import AuthLayout from './components/AuthLayout';
import Footer from './components/Footer';
import AnchorNav from './components/AnchorNav';
import SignatureHero from './components/SignatureHero';
import TreatmentSection from './components/TreatmentSection';
import QuizBanner from './components/QuizBanner';
import BookingFlow from './components/booking/BookingFlow';
import ClientSignup from './components/ClientSignup';
import TherapistOnboarding from './components/TherapistOnboarding';
import AdminVerification from './components/AdminVerification';
import TherapistDashboard from './components/dashboard/TherapistDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ClinicSettings from './components/dashboard/ClinicSettings';
import AdminMapOverview from './components/dashboard/AdminMapOverview';
import AdminFinance from './components/dashboard/AdminFinance';
import PartnerVerification from './components/dashboard/PartnerVerification';
import AboutPage from './components/AboutPage';
import { Treatment } from './types';
import { TREATMENTS } from './data/treatments';

type View =
  | 'home'
  | 'services'
  | 'about'
  | 'login'
  | 'signup'
  | 'booking'
  | 'treatment_detail'
  | 'quiz'
  | 'therapist_onboarding'
  | 'admin_dashboard'
  | 'therapist_dashboard'
  | 'admin_verification'
  | 'admin_finance'
  | 'admin_map'
  | 'therapist_clinic'
  | 'therapist_appointments'
  | 'therapist_verification'
  | 'therapist_profile'
  | 'profile'
  | 'messages';
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [searchPostcode, setSearchPostcode] = useState('');

  useEffect(() => {
    (window as any)._setView = (view: View) => {
      setCurrentView(view);
      window.scrollTo(0, 0);
    };
  }, []);

  const handleTreatmentClick = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    if (treatment.isPremium) {
      setCurrentView('treatment_detail');
    } else {
      setCurrentView('booking');
    }
    window.scrollTo(0, 0);
  };

  const handleBookNow = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setCurrentView('booking');
  };

  const isDashboardView = (currentView.includes('dashboard') ||
                         currentView.includes('admin_') ||
                         currentView.includes('therapist_')) &&
                         currentView !== 'therapist_onboarding';

  const renderHome = () => (
    <ResponsiveWrapper activeView={currentView} onNavigate={(v) => setCurrentView(v)}>
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-medimoi-gold font-sans mb-4 block">Redefining London's Wellness</span>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl leading-tight mb-6 italic">Wellness, delivered <br /><span className="not-italic">to your door.</span></h1>
          <p className="font-sans text-neutral-500 text-xs md:text-base tracking-wide max-w-2xl mx-auto leading-relaxed">Medical-grade treatments, beauty experts, and recovery therapists. Book premium services anywhere in London.</p>
        </motion.div>
        
        <SearchBar onSearch={(postcode) => { if (postcode) setSearchPostcode(postcode); setCurrentView('services'); }} />
      </section>

      <section className="px-6 mb-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 md:mb-16 border-b border-medimoi-black/10 pb-4">
          <h2 className="font-serif text-2xl md:text-4xl italic">Signature Method</h2>
          <button onClick={() => setCurrentView('services')} className="text-[10px] uppercase tracking-widest border-b border-medimoi-black pb-0.5">Explore All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {TREATMENTS.filter(t => t.category === 'Signature Method').map((t) => (
            <TreatmentCard key={t.id} treatment={t} onClick={() => handleTreatmentClick(t)} />
          ))}
        </div>
      </section>

      <section className="bg-white/50 border-y border-medimoi-black/5 py-12 mb-16 overflow-hidden">
        <div className="flex justify-center space-x-12 grayscale opacity-40 font-serif text-xl italic whitespace-nowrap px-6">
          <span>VOGUE</span>
          <span>BAZAAR</span>
          <span>TATLER</span>
          <span>GQ</span>
        </div>
      </section>

      <QuizBanner onStart={() => setCurrentView('quiz')} />
      <Footer />
    </ResponsiveWrapper>
  );

  const renderServices = () => (
    <ResponsiveWrapper activeView={currentView} onNavigate={(v) => setCurrentView(v)}>
      <header className="px-6 pt-10 pb-12 max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl italic mb-4">The Menu</h1>
        <p className="text-neutral-500 uppercase tracking-widest text-[10px]">Curated wellness practitioners</p>
      </header>

      <AnchorNav />

      <div className="space-y-4">
        <SignatureHero treatments={TREATMENTS.filter(t => t.category === 'Signature Method')} onBook={() => handleTreatmentClick(TREATMENTS[0])} />
        <TreatmentSection id="body" title="Body" treatments={TREATMENTS.filter(t => t.category === 'Body Treatments')} onBook={handleTreatmentClick} />
        <TreatmentSection id="energy" title="Energy" treatments={TREATMENTS.filter(t => t.category === 'Energy & Mind')} onBook={handleTreatmentClick} />
      </div>

      <Footer />
    </ResponsiveWrapper>
  );

  const renderAbout = () => (
    <ResponsiveWrapper activeView={currentView} onNavigate={(v) => setCurrentView(v)}>
      <AboutPage />
      <Footer />
    </ResponsiveWrapper>
  );

  if (currentView === 'home') return renderHome();
  if (currentView === 'services') return renderServices();
  if (currentView === 'about') return renderAbout();
  
  if (isDashboardView) {
    const isAdmin = currentView.startsWith('admin_');
    return (
      <div className="flex min-h-screen bg-medimoi-bg">
        <div className="hidden lg:block">
          <Sidebar type={isAdmin ? 'admin' : 'therapist'} activeView={currentView} onNavigate={(v) => setCurrentView(v)} />
        </div>
        <div className="flex-1 flex flex-col">
          <ResponsiveWrapper activeView={currentView} onNavigate={(v) => setCurrentView(v)} isDashboard={true}>
            <div className="p-4 md:p-12 h-full">
              {currentView === 'therapist_dashboard' && <TherapistDashboard />}
              {currentView === 'therapist_clinic' && <ClinicSettings />}
              {currentView === 'therapist_verification' && <PartnerVerification />}
              {currentView === 'admin_dashboard' && <AdminDashboard />}
              {currentView === 'admin_map' && <AdminMapOverview />}
              {currentView === 'admin_finance' && <AdminFinance />}
              {currentView === 'admin_verification' && <AdminVerification />}
              {(currentView === 'therapist_appointments' || currentView === 'therapist_profile' || currentView === 'profile' || currentView === 'messages') && <TherapistDashboard />}
            </div>
          </ResponsiveWrapper>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {currentView === 'login' && (
          <AuthLayout onBack={() => setCurrentView('home')} title="Welcome back." subtitle="Enter your details to manage your bookings.">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setCurrentView('home'); }}>
              <Input label="Email" type="email" placeholder="email@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button variant="primary" fullWidth className="h-14">Log In</Button>
            </form>
            <div className="mt-8 text-center space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-neutral-300">
                Don't have an account?{' '}
                <button onClick={() => setCurrentView('signup')} className="text-medimoi-gold font-bold hover:underline">Sign Up</button>
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex-1 h-[1px] bg-neutral-100" />
                <span className="text-[9px] uppercase tracking-widest text-neutral-300">or access as</span>
                <div className="flex-1 h-[1px] bg-neutral-100" />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" fullWidth className="!text-[9px]" onClick={() => setCurrentView('therapist_dashboard')}>Partner Portal</Button>
                <Button variant="outline" fullWidth className="!text-[9px]" onClick={() => setCurrentView('admin_dashboard')}>Admin Portal</Button>
              </div>
            </div>
          </AuthLayout>
        )}
        {currentView === 'signup' && (
          <ClientSignup
            onBack={() => setCurrentView('login')}
            onComplete={() => setCurrentView('services')}
            onPartnerRedirect={() => setCurrentView('therapist_onboarding')}
          />
        )}
        {currentView === 'therapist_onboarding' && (
          <TherapistOnboarding onComplete={() => setCurrentView('therapist_dashboard')} />
        )}
        {currentView === 'treatment_detail' && selectedTreatment && (
          <TreatmentDetail
            treatment={selectedTreatment}
            onBack={() => setCurrentView('services')}
            onBook={() => { setCurrentView('booking'); }}
          />
        )}
        {currentView === 'quiz' && (
          <WellnessQuiz onClose={() => setCurrentView('home')} onBook={handleBookNow} />
        )}
        {currentView === 'booking' && selectedTreatment && (
          <BookingFlow treatment={selectedTreatment} initialPostcode={searchPostcode} onClose={() => setCurrentView('services')} onComplete={() => setCurrentView('home')} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
