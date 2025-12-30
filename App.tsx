
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Solutions from './components/Solutions';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import SocialProof from './components/SocialProof';
import BookingPage from './components/BookingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'booking'>('home');

  const navigateToBooking = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('booking');
  };

  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('home');
  };

  return (
    <div className="relative min-h-screen w-full selection:bg-blue-100 selection:text-blue-900">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navbar onBookClick={navigateToBooking} onHomeClick={navigateToHome} />
        
        <main>
          <AnimatePresence mode="wait">
            {view === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Hero onBookClick={navigateToBooking} />
                <SocialProof />
                <Comparison />
                <Solutions />
                <Benefits />
                <HowItWorks />
                <CTASection onBookClick={navigateToBooking} />
                <FAQ />
              </motion.div>
            ) : (
              <motion.div
                key="booking"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <BookingPage onBack={navigateToHome} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <Footer onHomeClick={navigateToHome} onBookClick={navigateToBooking} />
      </div>
    </div>
  );
};

export default App;
