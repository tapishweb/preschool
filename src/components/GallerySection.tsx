import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Palette, Headphones, Trees, BookOpen, Puzzle, Theater, Activity, Sparkles, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Art Expressions', colSpan: 'col-span-12 md:col-span-8', rowSpan: 'row-span-2', height: 'h-[400px]', color: 'from-pink-500/80 to-purple-500/80', icon: Palette, image: 'https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Sonic Play', colSpan: 'col-span-12 md:col-span-4', rowSpan: 'row-span-1', height: 'h-[190px]', color: 'from-blue-500/80 to-cyan-500/80', icon: Headphones, image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Nature Walks', colSpan: 'col-span-12 md:col-span-4', rowSpan: 'row-span-1', height: 'h-[190px]', color: 'from-emerald-500/80 to-teal-500/80', icon: Trees, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Story Readers', colSpan: 'col-span-12 md:col-span-4', rowSpan: 'row-span-2', height: 'h-[400px]', color: 'from-orange-500/80 to-red-500/80', icon: BookOpen, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Puzzle Solvers', colSpan: 'col-span-12 md:col-span-4', rowSpan: 'row-span-1', height: 'h-[190px]', color: 'from-indigo-500/80 to-purple-500/80', icon: Puzzle, image: 'https://images.unsplash.com/photo-1558021211-6d1403321394?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Dramatic Play', colSpan: 'col-span-12 md:col-span-4', rowSpan: 'row-span-1', height: 'h-[190px]', color: 'from-fuchsia-500/80 to-pink-500/80', icon: Theater, image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Kinetic Movement', colSpan: 'col-span-12 md:col-span-8', rowSpan: 'row-span-1', height: 'h-[190px]', color: 'from-cyan-500/80 to-blue-500/80', icon: Activity, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Starry Events', colSpan: 'col-span-12', rowSpan: 'row-span-1', height: 'h-[250px]', color: 'from-yellow-500/80 to-orange-500/80', icon: Sparkles, image: 'https://images.unsplash.com/photo-1530047139082-54337d11ce3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring" }}
      className={`${item.colSpan} ${item.rowSpan} ${item.height} relative group cursor-pointer overflow-hidden rounded-[2rem] glass-card border border-white shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Photo Background with Gradient Blend */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-multiply opacity-50`} />
      </div>
      
      {/* Simulated 3D Elements floating in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <IconComp className={`w-24 h-24 ${item.color.includes('pink') ? 'text-white' : item.color.includes('blue') ? 'text-white' : 'text-white'} filter blur-sm`} />
      </div>

      {/* Cinematic Content Reveal Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-20 border-[6px] border-white/40 rounded-[2rem]">
        <motion.div
          animate={isHovered ? {
            y: [20, 0],
            opacity: [0, 1]
          } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center mb-4 shadow-xl border border-slate-100">
            <IconComp className={`w-8 h-8 ${item.color.includes('pink') ? 'text-pink-500' : item.color.includes('blue') ? 'text-blue-500' : 'text-purple-500'}`} />
          </div>
          <h4 className="text-2xl font-black tracking-widest uppercase text-slate-800 drop-shadow-sm mb-2">
            {item.title}
          </h4>
          <span className="text-sm font-bold text-slate-500 tracking-wider">VIEW MEMORY</span>
        </motion.div>
      </div>

      {/* Initial state title badge */}
      <div className="absolute bottom-6 left-6 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div className="glass-card px-4 py-2 rounded-xl bg-white/60 border border-white shadow-sm flex items-center gap-2">
           <IconComp className="w-4 h-4 text-slate-700" />
           <span className="font-bold text-slate-800 text-sm">{item.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="gallery" ref={containerRef} className="py-32 px-4 bg-white/40 backdrop-blur-2xl relative overflow-hidden">
      {/* Light animated nebula background */}
      <motion.div 
        style={{ y: parallaxY }}
        className="absolute top-0 left-0 w-full h-[150%] pointer-events-none z-0 opacity-40"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-[120px]" />
        <div className="absolute top-3/4 right-1/4 w-[800px] h-[800px] bg-gradient-to-l from-cyan-200 to-emerald-200 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={titleInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white border border-slate-100 shadow-sm px-6 py-2 rounded-full mb-8"
          >
            <Camera className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-600 tracking-wider uppercase text-sm">Visual Logs</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight drop-shadow-sm">
            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Little Stars</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium">
            Explore the vibrant memories, creative projects, and smiling faces that make up our magical universe.
          </p>
        </motion.div>

        {/* CSS Grid Masonry-style Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-slate-800 border-[3px] border-slate-100 font-bold rounded-full group hover:bg-slate-50 transition-colors shadow-lg shadow-slate-200/50 uppercase tracking-widest text-sm inline-block text-center"
          >
            Load More Memories
          </motion.a>
        </div>
      </div>
    </section>
  );
}
