import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

const HandDrawnUnderline = () => {
  return (
    <motion.svg
      viewBox="0 0 350 30"
      preserveAspectRatio="none"
      className="absolute -bottom-4 left-0 w-full h-5 pointer-events-none z-0"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 5,14 C 60,12 120,11 155,10 L 165,15 C 220,13 280,12 310,13 L 318,25 L 328,5 L 338,22 L 348,3"
        fill="transparent"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.8,
            transition: {
              pathLength: { delay: 1.2, duration: 1.6, ease: "easeOut" },
              opacity: { delay: 1.2, duration: 0.3 }
            }
          }
        }}
      />
    </motion.svg>
  );
};

const HandDrawnCircle = () => {
  return (
    <motion.svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[180%] pointer-events-none z-0"
      initial="hidden"
      animate="visible"
    >
      <motion.ellipse
        cx="100"
        cy="50"
        rx="95"
        ry="45"
        fill="transparent"
        stroke="#2563eb"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 100 50)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.8,
            transition: {
              pathLength: { delay: 1.2, duration: 1.6, ease: "easeOut" },
              opacity: { delay: 1.2, duration: 0.3 }
            }
          }
        }}
        style={{ strokeDasharray: '565' }}
      />
    </motion.svg>
  );
};

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">For Cybersecurity Firms</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] font-bold text-slate-900 mb-10 tracking-tight"
          >
            Generate <span className="italic font-medium text-blue-600">10-15</span> Qualified<br className="hidden md:block" />
            Meetings Per Month<br className="hidden md:block" />
            <span className="italic font-medium text-blue-600">With One Simple System</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-light"
          >
            Our AI cold email system automates personalized outreach for cybersecurity service firms, so you can fill your pipeline with ready-to-buy prospects while focusing on what you do best.
          </motion.p>

          <motion.div variants={item} className="flex justify-center w-full">
            <motion.button
              onClick={onBookClick}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              <span className="relative z-10">Sign Up</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;