import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div 
        className="absolute w-[200%] h-[200%] -left-[50%]"
        style={{
            backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            transformOrigin: '50% 50%',
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
};