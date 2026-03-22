import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Palette, Music, Activity, BookOpen, FlaskConical, Theater, Sunrise, Brain, Apple, Utensils, Hand, Sun, Wind, Cloud } from 'lucide-react';

export default function ParallaxSection() {
  const ref = useRef(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const activities = [
    { icon: Palette, name: 'Creative Arts', color: 'from-pink-400 to-rose-400', iconColor: 'text-pink-500' },
    { icon: Music, name: 'Sonic Harmony', color: 'from-purple-400 to-indigo-400', iconColor: 'text-purple-500' },
    { icon: Activity, name: 'Kinetic Movement', color: 'from-emerald-400 to-teal-400', iconColor: 'text-emerald-500' },
    { icon: BookOpen, name: 'Literacy Orbits', color: 'from-blue-400 to-cyan-400', iconColor: 'text-blue-500' },
    { icon: FlaskConical, name: 'Quantum Science', color: 'from-orange-400 to-amber-400', iconColor: 'text-orange-500' },
    { icon: Theater, name: 'Dramatic Play', color: 'from-red-400 to-pink-400', iconColor: 'text-red-500' },
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 bg-white/30 backdrop-blur-2xl overflow-hidden">
      {/* Light Parallax Background Bubbles */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"
      />
      
      {/* Parallax Floating 3D Icons */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-32 left-[10%] opacity-60 drop-shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-pink-400">
        <Sun className="w-20 h-20 fill-pink-400/20" />
      </motion.div>
      <motion.div style={{ y: y2, rotate: useTransform(rotate, v => -v) }} className="absolute top-1/2 right-[15%] opacity-60 drop-shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-purple-400">
        <Wind className="w-24 h-24 stroke-[1.5]" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-32 left-1/4 opacity-80 drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-emerald-400">
        <Cloud className="w-16 h-16 fill-emerald-400/20" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <motion.div
            style={{ scale }}
            className="inline-flex justify-center items-center w-24 h-24 rounded-full glass border border-white mb-8 shadow-xl bg-white/50"
          >
            <Sun className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] fill-yellow-500/20" />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6 tracking-tight">
            A Magical Day
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Every moment is designed to inspire awe, educate deeply, and provoke infinite imagination.
          </p>
        </motion.div>

        {/* 3D Activity Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {activities.map((activity, index) => {
            const IconComp = activity.icon;
            return (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="perspective-1000 group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} rounded-[2rem] blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                <div className={`relative glass-card rounded-[2rem] p-8 text-center shadow-xl transition-all border border-white bg-white/60 group-hover:bg-white h-full flex flex-col items-center justify-center`}>
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-6 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                  >
                    <IconComp className={`w-14 h-14 ${activity.iconColor} drop-shadow-sm`} />
                  </motion.div>
                  <h3 className="font-bold text-xl text-slate-800 tracking-wide">{activity.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cinematic Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32"
        >
          <div className="inline-flex glass-card border border-white px-8 py-3 rounded-full mx-auto justify-center w-full max-w-xs mb-16 shadow-lg bg-white/80">
            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase tracking-widest text-center">
              Daily Rhythm
            </h3>
          </div>
          
          <div className="relative">
            {/* Illuminated core timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-30 rounded-full" />
            
            {[
              { time: '08:00 AM', activity: 'Morning Welcome', icon: Sunrise, side: 'left', iconColor: 'text-amber-500' },
              { time: '09:00 AM', activity: 'Core Learning', icon: Brain, side: 'right', iconColor: 'text-purple-500' },
              { time: '10:30 AM', activity: 'Healthy Snack', icon: Apple, side: 'left', iconColor: 'text-red-500' },
              { time: '11:00 AM', activity: 'Creative Arts', icon: Palette, side: 'right', iconColor: 'text-pink-500' },
              { time: '12:30 PM', activity: 'Lunch & Rest', icon: Utensils, side: 'left', iconColor: 'text-orange-500' },
              { time: '02:00 PM', activity: 'Outdoor Play', icon: Activity, side: 'right', iconColor: 'text-emerald-500' },
              { time: '03:30 PM', activity: 'Music & Story', icon: Music, side: 'left', iconColor: 'text-indigo-500' },
              { time: '04:30 PM', activity: 'Happy Goodbyes', icon: Hand, side: 'right', iconColor: 'text-cyan-500' },
            ].map((item, index) => {
              const TimelineIcon = item.icon;
              return (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                  className={`relative flex items-center mb-10 ${
                    item.side === 'left' ? 'justify-start md:justify-end md:pr-14' : 'justify-start md:justify-start md:pl-14'
                  } ${item.side === 'right' ? 'md:ml-[50%]' : 'md:mr-[50%]'}`}
                >
                  <div className="glass-card rounded-2xl p-6 border border-white flex items-center gap-5 w-full max-w-sm relative group hover:bg-white shadow-lg transition-colors">
                    {/* Glowing dot on timeline */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.6)] hidden md:block border-4 border-white ${item.side === 'left' ? '-right-[62px]' : '-left-[62px]'}`} />

                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      className="filter drop-shadow-md"
                    >
                      <TimelineIcon className={`w-10 h-10 ${item.iconColor}`} />
                    </motion.div>
                    <div>
                      <div className="text-sm font-black tracking-widest text-pink-500 mb-1">{item.time}</div>
                      <div className="font-bold text-slate-800 text-lg">{item.activity}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
