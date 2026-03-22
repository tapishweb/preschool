import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Check if it's a touch device to disable custom cursor on mobile
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full pointer-events-none z-[9999] shadow-md"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(236, 72, 153, 0.6)' : 'rgba(168, 85, 247, 0.6)',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      />
    </>
  );
}
