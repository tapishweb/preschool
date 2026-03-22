import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Puzzle, Leaf, Users, BookOpen, Activity, HeartHandshake, Trophy, GraduationCap, Heart, PartyPopper } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Creative Arts',
    description: 'Unleash imagination through painting, crafts, and music in our bright immersive studio.',
    color: 'from-pink-400 to-rose-400',
    iconColor: 'text-pink-500'
  },
  {
    icon: Puzzle,
    title: 'Problem Solving',
    description: 'Build critical thinking with tactile puzzles and interactive 3D games.',
    color: 'from-purple-400 to-indigo-400',
    iconColor: 'text-purple-500'
  },
  {
    icon: Leaf,
    title: 'Discover Nature',
    description: 'Explore the wonders of the environment in our bio-dome play area.',
    color: 'from-emerald-400 to-teal-400',
    iconColor: 'text-emerald-500'
  },
  {
    icon: Users,
    title: 'Social Synergy',
    description: 'Learn teamwork, emotional intelligence, and genuine friendship.',
    color: 'from-blue-400 to-cyan-400',
    iconColor: 'text-blue-500'
  },
  {
    icon: BookOpen,
    title: 'Early Literacy',
    description: 'A magical introduction to letters, numbers, and interactive storytelling.',
    color: 'from-amber-400 to-orange-400',
    iconColor: 'text-amber-500'
  },
  {
    icon: Activity,
    title: 'Kinetic Play',
    description: 'Stay active with structured dance, sports, and dynamic outdoor fun.',
    color: 'from-red-400 to-pink-400',
    iconColor: 'text-red-500'
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const IconComponent = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 80 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group perspective-1000 h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="relative glass-card rounded-3xl p-8 h-full flex flex-col items-start border border-white/50 group-hover:bg-white/80 transition-all shadow-xl">
        <motion.div
          animate={{ 
            rotateZ: [-2, 2, -2],
            y: [-3, 3, -3],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="mb-6 bg-white/50 p-4 rounded-2xl border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] group-hover:bg-white transition-colors"
        >
          <IconComponent className={`w-10 h-10 ${feature.iconColor} drop-shadow-sm`} />
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-wide">{feature.title}</h3>
        <p className="text-slate-600 leading-relaxed font-normal">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-32 px-4 bg-white/40 backdrop-blur-3xl relative overflow-hidden">
      {/* Soft bright background glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/80 to-purple-100/80 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-pink-100/80 to-yellow-100/80 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Subtle grid texture (Light) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02MCAwaC0xdjYwaDFWMHptLTI5IDBIMzB2NjBoMVYwaC0xeiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjwvZz48L3N2Zz4=')] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={titleInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', delay: 0.2, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass border border-white/80 shadow-[0_8px_32px_rgba(236,72,153,0.15)] mb-8 bg-white/40"
          >
            <PartyPopper className="w-10 h-10 text-pink-500 drop-shadow-md" />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight drop-shadow-sm">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Us?</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            We believe every child is a universe of potential. Our unique approach fuses 
            immersive play-based learning with nurturing care and premium playful environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Parallax Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-32 w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden relative shadow-2xl glass-card border-4 border-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Children playing"
            className="w-full h-full object-cover origin-center scale-110 hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
            <h3 className="text-4xl md:text-5xl font-black drop-shadow-xl tracking-tight mb-4">
              Where Journeys Begin
            </h3>
            <p className="max-w-xl text-lg md:text-xl font-medium drop-shadow-md text-white/90">
              We focus on cultivating a warm, enriching atmosphere that feels just like a second home for your little ones.
            </p>
          </div>
        </motion.div>

        {/* Stats Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 p-12 glass border border-white/60 shadow-2xl relative overflow-hidden rounded-[2.5rem]"
        >
          {/* Internal gradient for stats */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { number: '500+', label: 'Happy Explorers', icon: HeartHandshake },
              { number: '15+', label: 'Years Experience', icon: Trophy },
              { number: '50+', label: 'Expert Guides', icon: GraduationCap },
              { number: '100%', label: 'Joy Rate', icon: Heart },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 mb-4 transition-all">
                    {stat.number}
                  </div>
                  <div className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-4">
                    {stat.label}
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                    className="flex justify-center flex-row drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                  >
                    <StatIcon className="w-12 h-12 text-pink-500 fill-pink-500/20" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
