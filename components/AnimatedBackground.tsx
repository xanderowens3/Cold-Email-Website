import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Leaf = ({ x, y, rot, scale = 1 }: { x: number, y: number, rot: number, scale?: number }) => (
  <path 
    d="M 0 0 C 15 -15, 35 -15, 50 0 C 35 15, 15 15, 0 0" 
    transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
  />
);

const OliveBranch = ({ className, animate, transition }: any) => (
  <motion.svg 
    viewBox="0 0 200 200" 
    className={className}
    animate={animate}
    transition={transition}
  >
    <g fill="#1e293b">
      {/* Main Stem */}
      <path d="M 200 -20 Q 150 100 0 200" stroke="#1e293b" strokeWidth="4" fill="none" />
      <path d="M 140 45 Q 90 90 40 120" stroke="#1e293b" strokeWidth="2" fill="none" />
      
      {/* Leaves */}
      <Leaf x={175} y={0} rot={115} scale={0.8} />
      <Leaf x={155} y={30} rot={20} scale={1} />
      <Leaf x={135} y={60} rot={135} scale={0.9} />
      <Leaf x={105} y={85} rot={25} scale={1.1} />
      <Leaf x={85} y={115} rot={150} scale={0.8} />
      <Leaf x={55} y={140} rot={45} scale={1} />
      <Leaf x={35} y={165} rot={160} scale={0.9} />
      <Leaf x={15} y={185} rot={60} scale={0.7} />
      
      {/* Secondary Branch Leaves */}
      <Leaf x={110} y={65} rot={15} scale={0.7} />
      <Leaf x={80} y={90} rot={125} scale={0.8} />
      <Leaf x={60} y={110} rot={35} scale={0.6} />

      {/* Olives */}
      <circle cx={145} cy={45} r={5} />
      <circle cx={95} cy={100} r={6} />
      <circle cx={50} cy={155} r={5} />
      <circle cx={100} cy={75} r={4} />
    </g>
  </motion.svg>
);

const AnimatedBackground: React.FC = () => {
  // scrollYProgress goes from 0 to 1 based on the full height of the page
  const { scrollYProgress } = useScroll();
  
  // By using scrollYProgress, we guarantee the movement continues all the way to the bottom!
  const shadowX = useTransform(scrollYProgress, [0, 1], ["0px", "-300px"]);
  const shadowY = useTransform(scrollYProgress, [0, 1], ["0px", "-600px"]);
  const shadowRotate = useTransform(scrollYProgress, [0, 1], [0, 20]); // The sun angle changes!

  return (
    <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden hardware-accelerated bg-[#f8fafc]">
      
      {/* SVG Filters for organic shadows (Fully animated) */}
      <svg className="hidden">
        <filter id="organic-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="12" result="blurred" />
        </filter>
      </svg>

      <style>{`
        @keyframes drift1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes sunPulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }
        .bg-drift-1 { animation: drift1 25s infinite ease-in-out; will-change: transform; }
        .bg-drift-2 { animation: drift2 30s infinite ease-in-out; will-change: transform; }
        .sun-pulse { animation: sunPulse 10s infinite ease-in-out; }
        .hardware-accelerated { transform: translate3d(0,0,0); backface-visibility: hidden; will-change: transform; }
      `}</style>

      {/* Balanced Sunlight Atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-amber-50/50 blur-[120px] bg-drift-1 sun-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-50/40 blur-[100px] bg-drift-2" />
      <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-yellow-50/40 blur-[100px] bg-drift-1" />

      {/* Linear Grid Pattern (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
        }} 
      />

      {/* Organic Monument & Olive Branch Shadows */}
      <motion.div 
        className="absolute inset-[-60%] mix-blend-multiply opacity-[0.04] origin-center hardware-accelerated"
        style={{
          x: shadowX,
          y: shadowY,
          rotate: shadowRotate,
        }}
      >
        {/* The Temple Roof/Architrave Shadow */}
        <div className="absolute top-[-5%] left-[-20%] w-[150%] h-[18%] bg-[#1e293b] transform -rotate-[15deg]" style={{ filter: 'url(#organic-shadow)' }} />

        {/* The Column Shadows */}
        <div className="absolute top-[5%] left-[10%] w-[8%] h-[200%] bg-[#1e293b] transform -rotate-[15deg]" style={{ filter: 'url(#organic-shadow)' }} />
        <div className="absolute top-[5%] left-[35%] w-[8%] h-[200%] bg-[#1e293b] transform -rotate-[15deg]" style={{ filter: 'url(#organic-shadow)' }} />
        <div className="absolute top-[5%] left-[60%] w-[8%] h-[200%] bg-[#1e293b] transform -rotate-[15deg]" style={{ filter: 'url(#organic-shadow)' }} />
        <div className="absolute top-[5%] left-[85%] w-[8%] h-[200%] bg-[#1e293b] transform -rotate-[15deg]" style={{ filter: 'url(#organic-shadow)' }} />

        {/* --- Swaying Olive Branches --- */}
        
        {/* Top Right Branch */}
        <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px]">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [-2, 3, -1, 2, -2], x: [0, -5, 3, 0], y: [0, 4, -2, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Mid Left Branch (flipped) */}
        <div className="absolute top-[35%] left-[-5%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] transform -scale-x-100 rotate-12">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [2, -4, 1, -3, 2], x: [0, 8, -4, 0], y: [0, -5, 3, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Bottom Right Branch (upside down) */}
        <div className="absolute bottom-[-15%] right-[15%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] transform -scale-y-100 -rotate-45">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [-3, 4, -2, 5, -3], x: [0, -6, 4, 0], y: [0, 5, -3, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>

        {/* Top Left small branch */}
        <div className="absolute top-[-10%] left-[20%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] transform -scale-x-100 -rotate-[100deg]">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [-1, 2, 0, 3, -1], x: [0, 4, -2, 0], y: [0, -3, 2, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Mid Right Branch */}
        <div className="absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] transform rotate-[10deg]">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [-4, 3, -2, 4, -4], x: [0, -5, 4, 0], y: [0, 3, -4, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </div>

        {/* Bottom Left Branch */}
        <div className="absolute top-[80%] left-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] transform -scale-x-100 -rotate-[30deg]">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [3, -2, 4, -1, 3], x: [0, 6, -3, 0], y: [0, -4, 2, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>

        {/* Far Top Left Branch */}
        <div className="absolute top-[5%] left-[-15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] transform -scale-x-100 rotate-[45deg]">
          <OliveBranch 
            className="w-full h-full origin-top-right"
            animate={{ rotate: [-2, 5, -1, 3, -2], x: [0, 9, -5, 0], y: [0, -7, 4, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />
        </div>

      </motion.div>

    </div>
  );
};

export default AnimatedBackground;