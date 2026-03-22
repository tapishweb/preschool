import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import FloatingShapes from './FloatingShapes';

// --- MAGNETIC BUTTON COMPONENT ---
function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Pull strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// --- MAIN HERO COMPONENT ---
export default function HeroSection() {
  const { scrollY } = useScroll();
  const yElement = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityElement = useTransform(scrollY, [0, 600], [1, 0]);

  // Global Mouse tracking for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1 range
    const y = (e.clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Convert mouse location to 3D rotation angles
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { damping: 30, stiffness: 100 });

  // Text Reveal Animation Config
  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.05,
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    })
  };

  const titleWords = [
    { text: "Creative ", className: "text-slate-800 drop-shadow-sm" },
    { text: "Play School", className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pb-2" },
  ];

  return (
    <section 
      id="home"
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen overflow-hidden bg-transparent perspective-1000 flex items-center justify-center font-sans"
    >
      {/* Playful Ambient Environment (Beneath 3D Tilt) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/50 via-slate-50 to-slate-50 -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent -z-20"></div>

      {/* Tech Grid Effect for Premium Feel */}
      <div className="absolute inset-0 -z-10" 
           style={{
             backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)',
           }}
      />

      {/* Background 3D Floating Shapes */}
      <div className="-z-10 absolute inset-0">
        <FloatingShapes />
      </div>

      {/* 3D Tilted Interactive Content Wrapper */}
      <motion.div 
        style={{ 
          y: yElement, 
          opacity: opacityElement,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl"
      >
        {/* Glowing Central Tech Orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
          className="mb-10 relative group cursor-pointer"
          style={{ transform: "translateZ(80px)" }} // Pop out in 3D
        >
          {/* Dynamic Interactive Glow */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-pink-400 to-indigo-500 blur-2xl rounded-full" 
          />
          
          <motion.div 
            className="w-32 h-32 rounded-full glass-card bg-white/60 backdrop-blur-xl flex items-center justify-center relative shadow-2xl border border-white group-hover:bg-white/90 transition-colors"
          >
            {/* Tech Rotating Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-pink-400/60" 
            />
            {/* Inner Tech Ring (Reverse) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-dotted border-purple-300/60" 
            />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-14 h-14 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dynamic Tech Typography Title */}
        <div className="mb-6 perspective-1000" style={{ transform: "translateZ(60px)" }}>
          <h1 className="text-6xl md:text-8xl md:leading-[1.1] font-black tracking-tight flex flex-wrap justify-center">
            {titleWords.map((wordObj, wordIdx) => (
               <span key={wordIdx} className={`inline-block mr-4 ${wordObj.className}`}>
                 {wordObj.text.split("").map((char, charIdx) => {
                   const globalIdx = wordIdx * 10 + charIdx; // Stagger delay multiplier
                   return (
                     <motion.span
                       key={charIdx}
                       custom={globalIdx}
                       variants={textVariants}
                       initial="hidden"
                       animate="visible"
                       className="inline-block"
                       whileHover={{ y: -10, scale: 1.1, color: '#ec4899', textShadow: '0 10px 20px rgba(236,72,153,0.4)' }}
                     >
                       {char === " " ? "\u00A0" : char}
                     </motion.span>
                   )
                 })}
               </span>
            ))}
          </h1>
        </div>

        {/* Subtitle with Glassmorphism Float */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl font-bold text-slate-600 mb-12 max-w-2xl leading-relaxed px-6 py-4 glass-card bg-white/40 border-white/50 rounded-3xl backdrop-blur-sm shadow-xl"
          style={{ transform: "translateZ(40px)" }}
        >
          A vibrant interactive world designed to spark infinite curiosity and magical learning experiences.
        </motion.h2>

        {/* Magnetic High-Tech Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap justify-center gap-6"
          style={{ transform: "translateZ(80px)" }} // Extreme pop out
        >
          <MagneticButton 
            onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative overflow-hidden group px-10 py-5 rounded-full font-black text-lg text-white shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_60px_rgba(236,72,153,0.6)] transition-shadow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group-hover:scale-110 transition-transform duration-500" />
            <span className="absolute inset-0 rounded-full border border-white/40 group-hover:border-white/80 transition-colors" />
            <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase">
              Start The Magic 
              <motion.div 
                className="group-hover:translate-x-1 transition-transform"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </MagneticButton>
          
          <MagneticButton 
            onClick={() => document.getElementById('facilities')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 glass-card bg-white/70 backdrop-blur-xl text-purple-700 font-black tracking-widest uppercase rounded-full group hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-[2px] border-white transition-colors text-lg flex items-center gap-3"
          >
            Explore Campus
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </MagneticButton>
        </motion.div>

        {/* Floating Mouse scroll hint */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
          style={{ transform: "translateZ(20px)" }}
          whileHover={{ y: 5 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">Scroll</span>
          <motion.div 
            animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-16 bg-gradient-to-b from-purple-500 to-transparent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
          />
        </motion.div>
      </motion.div>

      {/* Soft gradient floor integration */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
