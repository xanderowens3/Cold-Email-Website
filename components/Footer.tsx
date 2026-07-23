import React from 'react';
import { motion } from 'framer-motion';
import KairosLogo from './KairosLogo';

interface FooterProps {
  onHomeClick: () => void;
  onBookClick: () => void;
}

interface NavLinkProps {
  label: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, onClick }) => (
  <li className="h-8 flex items-center">
    <button
      onClick={onClick}
      className="py-1 text-slate-500 hover:text-blue-400 transition-colors duration-300 relative z-10 font-bold uppercase tracking-widest text-[11px]"
    >
      {label}
    </button>
  </li>
);

const Footer: React.FC<FooterProps> = ({ onHomeClick, onBookClick }) => {
  const scrollToSection = (id: string) => {
    onHomeClick();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <footer className="py-24 px-6 md:px-12 border-t border-slate-100 bg-white/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-16 mb-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={onHomeClick}
              className="flex items-center mb-8 transition-all group h-12 text-slate-900 hover:text-blue-600"
            >
              <KairosLogo className="h-full w-auto select-none fill-current transition-colors duration-300" />
            </button>
            <p className="text-slate-500 max-w-md font-light text-lg leading-relaxed">
              Automating high-conversion cold email outreach for modern digital marketing agencies. Scaling your pipeline with intelligence and precision.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h5 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">Navigation</h5>
            <ul className="flex flex-col gap-6 text-slate-500 font-bold md:items-end">
              <NavLink label="Home" onClick={onHomeClick} />
              <NavLink label="The Difference" onClick={() => scrollToSection('the-difference')} />
              <NavLink label="How It Works" onClick={() => scrollToSection('how-it-works')} />
              <NavLink label="FAQ" onClick={() => scrollToSection('faq')} />
              <NavLink label="Sign Up" onClick={onBookClick} />
            </ul>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            © 2024 Kairos AI Agency. All Rights Reserved.
          </span>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <button className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-900 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;