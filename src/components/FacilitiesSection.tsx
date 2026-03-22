import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Palette, Castle, Headphones, Microscope, Moon, Utensils, Map } from 'lucide-react';

const facilities = [
  {
    icon: Palette,
    name: 'Art Studio',
    description: 'Bright open spaces filled with premium supplies to ignite imagination and creative expression.',
    color: 'from-pink-400 to-rose-400',
    iconColor: 'text-pink-500',
    details: 'Features washable walls, pottery wheels, and natural sunlight.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: Castle,
    name: 'Play Castle',
    description: 'A massive modular indoor structure for safe climbing, sliding, and active kinetic play.',
    color: 'from-orange-400 to-amber-400',
    iconColor: 'text-orange-500',
    details: 'Includes ball pits, soft foam obstacles, and interactive panels.',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: Headphones,
    name: 'Music Room',
    description: 'Sound-proofed acoustic room loaded with beginner instruments to discover sonic harmony.',
    color: 'from-blue-400 to-cyan-400',
    iconColor: 'text-blue-500',
    details: 'Stocked with keyboards, little drum kits, and recording software.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: Microscope,
    name: 'Discovery Lab',
    description: 'Miniature science stations for safe, messy, and totally wondrous early stage experiments.',
    color: 'from-emerald-400 to-teal-400',
    iconColor: 'text-emerald-500',
    details: 'Safe chemistry sets, light tables, and natural specimens.',
    image: 'https://images.unsplash.com/photo-1579344465499-522194d2f00e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: Moon,
    name: 'Cozy Nap Area',
    description: 'Calm, darkened starlit rooms designed specifically for restful, supervised afternoon recharging.',
    color: 'from-purple-400 to-indigo-400',
    iconColor: 'text-purple-500',
    details: 'Individual premium cots with ambient white noise machines.',
    image: 'https://images.unsplash.com/photo-1518331165997-8898b9f1d0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: Utensils,
    name: 'Magic Cafeteria',
    description: 'Colorful dining spaces where healthy, organic meals are served and social bonds are formed.',
    color: 'from-red-400 to-orange-400',
    iconColor: 'text-red-500',
    details: 'Nut free, allergy-friendly menu curated by pediatric nutritionists.',
    image: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];

function FacilityCard({ facility, index }: { facility: typeof facilities[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = facility.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} rounded-[2rem] blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        <img src={facility.image} alt={facility.name} className="w-full h-full object-cover opacity-[0.15] group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 mix-blend-overlay" />
      </div>

      <div className="relative glass-card border border-white/80 p-8 rounded-[2rem] h-full overflow-hidden shadow-xl bg-white/70 group-hover:bg-white/90 transition-all flex flex-col items-center text-center">
        {/* Animated corner accent */}
        <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${facility.color} rounded-full blur-[20px] opacity-20 transition-transform duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />

        <motion.div
          animate={isHovered ? {
            rotateZ: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm filter drop-shadow-md z-10"
        >
          <IconComp className={`w-10 h-10 ${facility.iconColor} drop-shadow-sm`} />
        </motion.div>

        <h3 className="text-2xl font-black text-slate-800 mb-4 z-10 tracking-tight">{facility.name}</h3>
        <p className="text-slate-600 font-medium leading-relaxed z-10 mb-6 flex-grow">
          {facility.description}
        </p>

        {/* Hidden detail section that reveals on hover */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          className="overflow-hidden z-10"
        >
          <div className="pt-4 border-t border-slate-100 text-sm font-bold text-slate-500">
            {facility.details}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function FacilitiesSection() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="facilities" className="py-32 px-4 bg-white/30 backdrop-blur-2xl relative overflow-hidden">
      {/* Light animated stardust background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-300 opacity-30 shadow-[0_0_10px_rgba(244,114,182,0.8)] blur-[2px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
              scale: [0, Math.random() + 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotateZ: -180 }}
            animate={titleInView ? { scale: 1, rotateZ: 0 } : {}}
            transition={{ type: 'spring', delay: 0.2, damping: 15 }}
            className="inline-flex glass border border-white p-5 rounded-full mb-8 shadow-xl bg-white/50"
          >
             <Castle className="w-10 h-10 text-pink-500 drop-shadow-md" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight drop-shadow-sm">
            Magical <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Spaces</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Architecturally designed to maximize natural light, safety, and pure unadulterated youthful joy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {facilities.map((facility, index) => (
            <FacilityCard key={facility.name} facility={facility} index={index} />
          ))}
        </div>

        {/* 3D Map Tour Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 text-center"
        >
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex group items-center justify-center px-10 py-5 rounded-full font-black text-lg text-white shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)] overflow-hidden border border-white/50 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-shadow"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
            <span className="relative z-10 flex items-center gap-3 drop-shadow-md tracking-widest uppercase">
              Take Virtual Campus Tour <Map className="w-6 h-6 ml-2" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
