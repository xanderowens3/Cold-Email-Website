import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden hardware-accelerated">
      {/* Base Light Layer */}
      <div className="absolute inset-0 bg-[#f8fafc]" />
      
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
        @keyframes beamRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .bg-drift-1 { animation: drift1 20s infinite linear; }
        .bg-drift-2 { animation: drift2 25s infinite linear; }
        .beam-animate { animation: beamRotate var(--duration) infinite linear; }
        .hardware-accelerated { transform: translate3d(0,0,0); backface-visibility: hidden; }
      `}</style>

      {/* Animated Gradients for Atmosphere */}
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-50/50 blur-[100px] bg-drift-1" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-50/40 blur-[80px] bg-drift-2" />

      {/* Linear Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
        }} 
      />

      {/* Floating Beams */}
      <div className="absolute inset-0">
        {[0, 45, 90].map((rot, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-blue-300/20 to-transparent beam-animate"
            style={{ 
              '--duration': `${30 + i * 10}s`,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              opacity: 0.1
            } as any}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;