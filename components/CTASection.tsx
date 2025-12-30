import React from 'react';
import { motion } from 'framer-motion';

interface CTASectionProps {
  onBookClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onBookClick }) => {
  return (
    <section id="book-call" className="scroll-mt-32 py-12 px-6 md:px-12">
      <motion.div 
        initial="initial"
        whileHover="hovered"
        variants={{
          initial: { y: 0 },
          hovered: { y: -5 }
        }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto rounded-[3rem] md:rounded-[4rem] bg-slate-900 p-10 md:py-16 md:px-24 text-center relative overflow-hidden group cursor-default"
      >
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[30%] h-[30%] bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 z-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-blue-400 mb-6 block">Final Step</span>
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight serif italic">
            Ready to Fill Your Pipeline?
          </h2>
          <p className="text-lg text-slate-400 mb-10 font-light leading-relaxed">
            Understand your next move for cold outreach success.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={onBookClick}
              initial="initial"
              whileHover="btnHovered"
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/20 transition-all text-lg group/btn overflow-hidden relative"
            >
              <motion.div
                variants={{
                  initial: { opacity: 0, backgroundPosition: '0% 50%' },
                  btnHovered: { 
                    opacity: 1,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    transition: {
                      opacity: { duration: 0.3 },
                      backgroundPosition: { 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }
                    }
                  }
                }}
                style={{
                  background: 'linear-gradient(90deg, #2563eb, #3b82f6, #1d4ed8, #60a5fa, #2563eb)',
                  backgroundSize: '300% 100%',
                }}
                className="absolute inset-0 z-0"
              />
              
              <span className="relative z-10">Sign Up</span>
              
              <motion.div 
                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
              />
            </motion.button>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">No Commitment. Just Strategy.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;