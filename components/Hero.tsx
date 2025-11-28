import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  // Glitch effect loop
  useEffect(() => {
    const interval = setInterval(() => {
        // Random small burst of glitch
        if (Math.random() > 0.8) {
            setGlitchOffset({
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5
            });
            setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
        }
    }, 2000); // Occurs periodically
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-6 relative">
      <div 
        className="relative"
        style={{
            textShadow: glitchOffset.x !== 0 
                ? `${glitchOffset.x}px ${glitchOffset.y}px 0 #ff00ff, ${-glitchOffset.x}px ${-glitchOffset.y}px 0 #00ffff`
                : '0 0 20px #00ffff'
        }}
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white mix-blend-lighten">
          CYBERPUNK
          <br />
          <span className="text-neon-cyan">AGENCY</span>
        </h1>
      </div>
      
      <div className="h-px w-32 bg-neon-magenta mx-auto my-6 shadow-[0_0_10px_#ff00ff]"></div>
      
      <h2 className="text-xl md:text-3xl text-neon-magenta tracking-[0.3em] font-bold typewriter-effect">
        WE HACK THE FUTURE
      </h2>

      <div className="mt-12">
        <button className="bg-transparent border-2 border-neon-cyan text-neon-cyan px-8 py-3 text-lg font-bold uppercase tracking-widest transition-all hover:bg-neon-cyan hover:text-black box-glow">
          Enter The Matrix
        </button>
      </div>
    </div>
  );
};