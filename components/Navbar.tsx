import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import KairosLogo from './KairosLogo';

interface NavbarProps {
  onBookClick: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onHomeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['The Difference', 'How It Works', 'FAQ'];

  const scrollToSection = (id: string) => {
    onHomeClick();
    setIsMenuOpen(false);
    // Allow state to update and section to mount if we were on booking page
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleDifferenceClick = () => scrollToSection('the-difference');
  const handleHowItWorksClick = () => scrollToSection('how-it-works');
  const handleFAQClick = () => scrollToSection('faq');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav 
        className={`w-full transition-all duration-500 ease-in-out pointer-events-auto ${
          isScrolled 
            ? 'mt-4 mx-4 md:mx-10 rounded-[2.5rem] py-3 glass ring-1 ring-white/20' 
            : 'mt-0 py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between md:grid md:grid-cols-[250px_1fr_250px]">
          {/* Logo (Left side) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer -ml-4 md:-ml-8"
            onClick={onHomeClick}
          >
            <div className="flex items-center justify-center transition-all group-hover:scale-105 h-16 text-slate-900 group-hover:text-blue-600">
              <KairosLogo className="h-full w-auto select-none fill-current transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Desktop Nav Links (Centerized) */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navItems.map((item) => {
              const isDifference = item === 'The Difference';
              const isHowItWorks = item === 'How It Works';
              const isFAQ = item === 'FAQ';
              
              let clickHandler = undefined;
              if (isDifference) clickHandler = handleDifferenceClick;
              if (isHowItWorks) clickHandler = handleHowItWorksClick;
              if (isFAQ) clickHandler = handleFAQClick;

              const isClickable = isDifference || isHowItWorks || isFAQ;

              return (
                <motion.span
                  key={item}
                  onClick={clickHandler}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-all ${
                    isScrolled ? 'text-slate-900' : 'text-slate-700'
                  } hover:text-blue-600 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {item}
                </motion.span>
              );
            })}
          </div>

          {/* Desktop CTA Button (Right side) */}
          <div className="hidden md:flex items-center justify-end">
            <motion.button
              onClick={onBookClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-[0.25em] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all border border-blue-500 text-center"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-900 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass mx-4 mt-2 rounded-[2rem] overflow-hidden border border-white/30"
            >
              <div className="px-6 py-10 flex flex-col gap-8">
                {navItems.map((item) => {
                  const isDifference = item === 'The Difference';
                  const isHowItWorks = item === 'How It Works';
                  const isFAQ = item === 'FAQ';
                  
                  let clickHandler = undefined;
                  if (isDifference) clickHandler = handleDifferenceClick;
                  if (isHowItWorks) clickHandler = handleHowItWorksClick;
                  if (isFAQ) clickHandler = handleFAQClick;

                  const isClickable = isDifference || isHowItWorks || isFAQ;

                  return (
                    <span
                      key={item}
                      onClick={clickHandler}
                      className={`text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-blue-600 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {item}
                    </span>
                  );
                })}
                <button 
                  onClick={() => {
                    onBookClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl text-lg text-center"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;