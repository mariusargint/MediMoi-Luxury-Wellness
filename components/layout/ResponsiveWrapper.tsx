
import React from 'react';
import Navbar from '../Navbar';
import BottomNav from '../navigation/BottomNav';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: any) => void;
  isDashboard?: boolean;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  activeView,
  onNavigate,
  isDashboard = false,
}) => {
  const isPartner = activeView.startsWith('therapist_');

  return (
    <div className="min-h-screen flex flex-col bg-medimoi-bg">
      <Navbar />

      {/* Main content area — extra bottom padding on mobile for BottomNav */}
      <main className={`flex-grow pb-20 md:pb-0 ${isDashboard ? 'pt-0' : 'pt-24 md:pt-32'}`}>
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <div className="md:hidden">
        <BottomNav activeView={activeView} onNavigate={onNavigate} isPartner={isPartner} />
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
