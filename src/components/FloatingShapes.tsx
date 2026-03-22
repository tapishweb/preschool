import { motion, useSpring, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect } from 'react';

export default function FloatingShapes() {
  // Mouse position tracking normalized from -1 to 1
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Shapes configuration
  const floatingItems = [
    { type: 'glass-sphere', x: '15%', y: '20%', size: 80, delay: 0.1, parallax: -30 },
    { type: 'glass-sphere', x: '85%', y: '15%', size: 120, delay: 0.3, parallax: 45 },
    { type: 'glass-cube', x: '75%', y: '75%', size: 90, delay: 0.5, parallax: -50 },
    { type: 'glass-pyramid', x: '10%', y: '70%', size: 70, delay: 0.7, parallax: 25 },
    { type: 'star', x: '50%', y: '15%', size: 48, delay: 0.2, parallax: -15 },
    { type: 'ring', x: '90%', y: '60%', size: 60, delay: 0.6, parallax: 35 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {floatingItems.map((item, index) => {
        // Individual parallax transforms based on item config
        const moveX = useTransform(mouseX, [-1, 1], [-item.parallax, item.parallax]);
        const moveY = useTransform(mouseY, [-1, 1], [-item.parallax, item.parallax]);

        return (
          <motion.div
            key={index}
            className="absolute flex justify-center items-center"
            style={{
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
              x: moveX,
              y: moveY,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: item.delay, ease: "easeOut" }}
          >
            {/* Inner animations per shape type */}
            {item.type === 'glass-sphere' && (
              <motion.div
                className="w-full h-full rounded-full bg-gradient-to-tr from-pink-300/40 to-white/60 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(236,72,153,0.15)]"
                animate={{ y: [-15, 15, -15], rotateZ: [0, 45, -45, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {item.type === 'glass-cube' && (
              <motion.div
                className="w-full h-full bg-gradient-to-br from-indigo-300/40 to-purple-300/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(139,92,246,0.15)]"
                animate={{ rotateY: 360, rotateX: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {item.type === 'glass-pyramid' && (
              <motion.div
                className="w-0 h-0 border-l-[35px] border-r-[35px] border-b-[70px] border-l-transparent border-r-transparent border-b-yellow-400/50 drop-shadow-[0_4px_15px_rgba(250,204,21,0.3)] filter backdrop-blur-sm"
                animate={{ rotateY: -360, y: [0, -20, 0] }}
                transition={{ rotateY: { duration: 10, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              />
            )}
            {item.type === 'star' && (
              <motion.div
                className="text-yellow-400/80 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center w-full h-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Star className="w-12 h-12 fill-current" />
              </motion.div>
            )}
            {item.type === 'ring' && (
              <motion.div
                className="w-full h-full rounded-full border-4 border-dashed border-cyan-400/50 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] filter"
                animate={{ rotateZ: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
