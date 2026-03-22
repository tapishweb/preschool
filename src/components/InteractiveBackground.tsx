import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function InteractiveBackground() {
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });
  
  // A secondary spring that tracks slower for a fluid, lagging effect
  const mouseXSlow = useSpring(0, { stiffness: 10, damping: 30 });
  const mouseYSlow = useSpring(0, { stiffness: 10, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtract half of the blob's size to ensure the center tracks the mouse precisely.
      mouseX.set(e.clientX - 500); 
      mouseY.set(e.clientY - 500);

      mouseXSlow.set(e.clientX - 400); // Slightly offset sizes
      mouseYSlow.set(e.clientY - 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, mouseXSlow, mouseYSlow]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Base Light Canvas */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Primary responsive glowing gradient blob */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-[120px] mix-blend-multiply opacity-50"
        style={{
          x: mouseX,
          y: mouseY,
          background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(168,85,247,0.3) 40%, rgba(99,102,241,0.1) 70%, transparent 100%)'
        }}
      />

      {/* Secondary fluid blob trailing the first */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-multiply opacity-40"
        style={{
          x: mouseXSlow,
          y: mouseYSlow,
          background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 100%)'
        }}
      />
    </div>
  );
}
