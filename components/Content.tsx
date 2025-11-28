import React from 'react';
import { Terminal, Database, Cpu, Wifi, Globe, Shield } from 'lucide-react'; // Simulating icons with text fallback if lucide isn't available, but standard lucide import is safe.
// To ensure icons work without package installation, I'll use SVG directly in a helper component for safety in this strict output format.

const Icon = ({ path, color = "currentColor" }: { path: string, color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

const Icons = {
    Code: () => <Icon path="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
    Shield: () => <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    Cpu: () => <Icon path="M4 4h16v16H4z M9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />,
    Zap: () => <Icon path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
};

export const Content: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black/90 backdrop-blur-md pt-20 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header visible after transition */}
        <header className="flex justify-between items-center py-6 border-b border-neon-cyan/30 mb-12">
            <div className="text-2xl font-bold tracking-widest text-neon-cyan">CP_AGENCY_V.2.0</div>
            <nav className="hidden md:flex gap-8">
                {['SERVICES', 'PORTFOLIO', 'CONTACT'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-neon-magenta hover:text-neon-cyan transition-colors tracking-widest text-sm font-bold">
                        {`// ${item}`}
                    </a>
                ))}
            </nav>
        </header>

        {/* Services Section */}
        <section id="services" className="mb-32">
            <h3 className="text-4xl md:text-6xl mb-12 text-white font-bold border-l-4 border-neon-cyan pl-6">
                OUR_PROTOCOLS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Code Injection', desc: 'Immersive web experiences that hijack the senses.', icon: <Icons.Code /> },
                    { title: 'Digital Warfare', desc: 'Aggressive marketing strategies to dominate the sector.', icon: <Icons.Zap /> },
                    { title: 'Neural Networks', desc: 'AI integration for automated dominance.', icon: <Icons.Cpu /> },
                    { title: 'Cyber Security', desc: 'Impenetrable defense systems for your assets.', icon: <Icons.Shield /> },
                ].map((service, idx) => (
                    <div key={idx} className="border border-neon-cyan/50 p-6 bg-black/50 hover:bg-neon-cyan/10 transition-all group hover:-translate-y-2 duration-300">
                        <div className="text-neon-magenta mb-4 scale-150 origin-top-left">{service.icon}</div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan">{service.title}</h4>
                        <p className="text-gray-400 text-sm">{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="mb-32">
             <h3 className="text-4xl md:text-6xl mb-12 text-white font-bold text-right border-r-4 border-neon-magenta pr-6">
                DEPLOYED_UNITS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: 'PROJECT: GHOST', type: 'Stealth Tech', color: 'border-neon-cyan' },
                    { name: 'OP: NEON DREAMS', type: 'Visual Synthesis', color: 'border-neon-magenta' },
                    { name: 'DIGITAL RONIN', type: 'Mercenary AI', color: 'border-yellow-400' },
                ].map((project, idx) => (
                    <div key={idx} className={`relative aspect-square border-2 ${project.color} group overflow-hidden cursor-pointer`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                        
                        {/* Abstract visuals for placeholder */}
                        <div className={`absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500 bg-[url('https://picsum.photos/600/600?random=${idx}')] bg-cover bg-center grayscale group-hover:grayscale-0`}></div>
                        
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <div className="text-xs font-bold bg-black/80 inline-block px-2 py-1 mb-2 text-white border border-white/20">CONFIDENTIAL</div>
                            <h4 className="text-2xl font-bold text-white mb-1">{project.name}</h4>
                            <p className="text-sm text-gray-300">{project.type}</p>
                        </div>

                        {/* Scanline overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>
                    </div>
                ))}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20 max-w-3xl mx-auto">
            <div className="border-2 border-neon-cyan p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-neon-cyan text-black font-bold text-xs">ENCRYPTED CONNECTION</div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center text-glow">
                    INITIATE_UPLINK
                </h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-neon-magenta tracking-widest">AGENT ID (NAME)</label>
                            <input type="text" className="w-full bg-black/50 border border-gray-700 focus:border-neon-cyan p-3 text-white outline-none transition-colors" placeholder="Neo..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-neon-magenta tracking-widest">FREQUENCY (EMAIL)</label>
                            <input type="email" className="w-full bg-black/50 border border-gray-700 focus:border-neon-cyan p-3 text-white outline-none transition-colors" placeholder="neo@matrix.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-neon-magenta tracking-widest">PAYLOAD (MESSAGE)</label>
                        <textarea rows={4} className="w-full bg-black/50 border border-gray-700 focus:border-neon-cyan p-3 text-white outline-none transition-colors" placeholder="I need guns. Lots of guns." />
                    </div>
                    
                    <button className="w-full bg-neon-cyan/10 border border-neon-cyan text-neon-cyan py-4 font-bold tracking-[0.2em] hover:bg-neon-cyan hover:text-black transition-all duration-300 group relative overflow-hidden">
                        <span className="relative z-10">TRANSMIT DATA</span>
                        <div className="absolute inset-0 bg-neon-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                    </button>
                </form>
            </div>
        </section>

        <footer className="text-center text-gray-600 text-xs py-10 border-t border-gray-900">
            <p>&copy; 2077 CYBERPUNK AGENCY. ALL RIGHTS RESERVED.</p>
            <p className="mt-2">SYSTEM STATUS: <span className="text-green-500">ONLINE</span></p>
        </footer>

      </div>
    </div>
  );
};