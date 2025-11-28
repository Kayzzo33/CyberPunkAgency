import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { Content } from './components/Content';
import { BackgroundGrid } from './components/BackgroundGrid';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State to track if we've passed the "portal" to allow pointer events on content
  const [passedPortal, setPassedPortal] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current || !heroRef.current || !contentRef.current) return;

    // --- 1. SETUP THREE.JS ---
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. CREATE CYBERPUNK OBJECT ---
    // Using a TorusKnot for that complex "portal" feel
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 1
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.z = -200; // Start far away
    scene.add(torusKnot);

    // Add some ambient particles/stars
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100; // Spread around center
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xff00ff
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);


    // --- 3. ANIMATION LOOP ---
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Constant smooth rotation
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;
      
      // Gentle particle movement
      particlesMesh.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // --- 4. SCROLL ANIMATION (GSAP) ---
    // We use a specific scroll trigger attached to the wrapper to simulate the timeline
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current, // The long container
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          
          // --- LOGIC FROM PROMPT ---
          
          // FASE 1-2: Text moves towards camera (Progress 0 -> 0.5)
          if (progress < 0.5) {
            const textProgress = progress * 2; // Normalize 0-0.5 to 0-1
            
            // Animate Hero Text Z-position to fly past camera
            // Initial Z is 0 (CSS). Camera is effectively at Z=0 in CSS 3D terms, 
            // but here we fake it by scaling and translating.
            // A simpler approach for the text is CSS transform via GSAP.
            
            if (heroRef.current) {
                // Simulate flying into the text
                const scale = 1 + (textProgress * 4); 
                const opacity = 1 - Math.pow(textProgress, 3); // Fade out faster at end
                const z = textProgress * 500;
                
                heroRef.current.style.transform = `perspective(1000px) translateZ(${z}px)`;
                heroRef.current.style.opacity = `${opacity}`;
                heroRef.current.style.filter = `blur(${textProgress * 10}px)`;
            }

            // Object approaches slightly
            torusKnot.position.z = -200 + (textProgress * 100); // -200 to -100
            
            // Content hidden
            if (contentRef.current) contentRef.current.style.opacity = '0';
            setPassedPortal(false);
          } 
          
          // FASE 3: Flying through object (Progress 0.5 -> 1.0)
          else {
            const objectProgress = (progress - 0.5) * 2; // Normalize 0.5-1.0 to 0-1
            
            // Hero is gone
            if (heroRef.current) heroRef.current.style.opacity = '0';

            // Object comes VERY close and we fly through
            torusKnot.position.z = -100 + (objectProgress * 200); // -100 to 100
            // Scale up slightly to ensure we go "through" the hole
            const scaleVal = 1 + objectProgress * 2;
            torusKnot.scale.set(scaleVal, scaleVal, scaleVal);

            // Camera moves forward to pass it
            camera.position.z = 50 - (objectProgress * 100); // 50 to -50

            // Fade out object as we pass through (last 20% of movement)
            if (objectProgress > 0.6) {
                torusKnot.material.opacity = 1 - ((objectProgress - 0.6) * 2.5);
            } else {
                torusKnot.material.opacity = 1;
            }

            // Show Content (Fade in at the very end)
            if (objectProgress > 0.8) {
               const fadeIn = (objectProgress - 0.8) * 5; // 0 to 1
               if (contentRef.current) {
                   contentRef.current.style.opacity = `${fadeIn}`;
                   contentRef.current.style.transform = `scale(${0.9 + (fadeIn * 0.1)})`;
               }
               setPassedPortal(true);
            } else {
               setPassedPortal(false);
            }
          }
        }
      }
    });

    // --- 5. RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      tl.kill(); // Kill GSAP timeline
      if (renderer) renderer.dispose();
      // Simple cleanup for geometry/material to avoid leaks in dev HMR
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-neon-cyan font-mono overflow-hidden selection:bg-neon-magenta selection:text-black">
      
      {/* 1. Fixed Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundGrid />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* 2. Scroll Track (Invisible, just provides height for scroll) */}
      <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-[4000px] z-10 pointer-events-none" />

      {/* 3. Hero Section (Fixed, animated by GSAP) */}
      <div 
        ref={heroRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <Hero />
      </div>

      {/* 4. Main Content (Fixed, fades in at end) */}
      <div 
        ref={contentRef}
        className={`fixed inset-0 z-30 flex flex-col opacity-0 overflow-y-auto ${passedPortal ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Content />
      </div>

      {/* 5. Scroll Indicator (Only visible at start) */}
      {!passedPortal && (
        <div className="fixed bottom-10 w-full text-center z-40 animate-bounce pointer-events-none mix-blend-difference text-white">
          <p className="text-sm tracking-[0.5em]">INITIALIZING DIVE SEQUENCE...</p>
          <p className="text-xs text-neon-magenta mt-2">SCROLL TO HACK</p>
        </div>
      )}

      {/* Global Styles for Glitch & Animations */}
      <style>{`
        @keyframes gridMove {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
        }
        .text-glow {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
        }
        .text-glow-magenta {
            text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
        }
        .box-glow {
            box-shadow: 0 0 10px #00ffff;
        }
        .box-glow:hover {
            box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
        }
      `}</style>
    </div>
  );
}