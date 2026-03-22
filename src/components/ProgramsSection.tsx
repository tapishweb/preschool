import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Sparkles, Rocket, Star } from 'lucide-react';

const programs = [
  {
    id: 1,
    name: 'Little Explorers',
    age: '1.5 - 2.5 years',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-400',
    iconColor: 'text-pink-500',
    borderColor: 'border-pink-300',
    description: 'Gentle introduction to structured play with sensory activities, music, and immersive movement.',
    activities: ['Sensory Play', 'Music & Rhythm', 'Story Orbits', 'Guided Exploration'],
    image: 'https://images.unsplash.com/photo-1558021211-6d1403321394?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Curious Minds',
    age: '2.5 - 4 years',
    icon: Rocket,
    color: 'from-orange-400 to-amber-400',
    iconColor: 'text-orange-500',
    borderColor: 'border-orange-300',
    description: 'Curiosity-driven learning with hands-on experiments and creative 3D expression.',
    activities: ['Science Fun', 'Tactile Arts', 'Building Blocks', 'Nature Walks'],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Creative Stars',
    age: '4 - 6 years',
    icon: Star,
    color: 'from-indigo-400 to-cyan-400',
    iconColor: 'text-indigo-500',
    borderColor: 'border-cyan-300',
    description: 'Pre-school readiness with early literacy, interactive logic, and social synergy.',
    activities: ['Reading Core', 'Logic Games', 'Drama Pods', 'Sports'],
    image: 'https://images.unsplash.com/photo-1427805191076-2fde6d8fa8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
];

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComp = program.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
      className="relative h-[420px] cursor-pointer perspective-1000 group w-full max-w-sm mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ y: -10 }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
        className="relative w-full h-full preserve-3d shadow-xl rounded-[2.5rem]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-[2.5rem] bg-white border-2 ${program.borderColor} backface-hidden overflow-hidden flex flex-col items-center text-center`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Base Background Image */}
          <div className="absolute inset-0">
            <img src={program.image} alt={program.name} className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
            <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-10`} />
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col items-center glass-card bg-white/70">
            {/* Internal Glow */}
          <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${program.color} rounded-full blur-[40px] opacity-40`} />
          <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr ${program.color} rounded-full blur-[40px] opacity-30`} />
          
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${program.color} p-[2px] mb-6 shadow-md`}
          >
            <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center">
              <IconComp className={`w-10 h-10 ${program.iconColor}`} />
            </div>
          </motion.div>
          
          <h3 className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${program.color} mb-3 tracking-tight`}>
            {program.name}
          </h3>
          <div className="inline-block px-4 py-1.5 bg-white border border-gray-100 rounded-full text-sm font-bold text-slate-500 mb-4 shadow-sm">
            Age: {program.age}
          </div>
          <p className="text-slate-600 leading-relaxed font-medium flex-grow">{program.description}</p>
          
          <div className="mt-auto flex items-center justify-center gap-2 text-purple-600 text-sm font-bold w-full uppercase tracking-wider">
            Tap to explore
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-[2.5rem] p-8 shadow-2xl backface-hidden flex flex-col justify-center relative overflow-hidden`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Back background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-95`} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvc3ZnPg==')] opacity-50" />

          <div className="relative z-10 text-center">
            <h4 className="text-2xl font-black text-white mb-8 drop-shadow-md">Curriculum Highlights</h4>
            <div className="grid grid-cols-2 gap-4">
              {program.activities.map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFlipped ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-slate-800 font-bold border border-white/50 shadow-md"
                >
                  {activity}
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 w-full bg-white text-purple-700 font-black py-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow text-lg uppercase tracking-wider block text-center"
            >
              Enroll Now
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProgramsSection() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="programs" className="py-32 px-4 bg-white/20 backdrop-blur-2xl relative overflow-hidden">
      {/* Animated ambient background */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[100px] opacity-[0.15]"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              background: `linear-gradient(135deg, ${['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b'][i % 4]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
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
            initial={{ scale: 0 }}
            animate={titleInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white border border-purple-100 shadow-md px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-600 tracking-wider uppercase text-sm">Learning Modules</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">World</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Carefully crafted stages designed to nurture curiosity, creativity, and foundational skills tailored to every age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
