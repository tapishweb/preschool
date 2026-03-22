import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Mother of Two',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content: 'Little Stars transformed our mornings! Emma literally jumps out of bed because she is so excited to see her teachers and friends. It is pure magic.',
    rating: 5,
    color: 'from-pink-400 to-rose-400',
  },
  {
    id: 2,
    name: 'David & Lisa Chen',
    role: 'Parents of Leo (4)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content: 'The 3D interactive play approach is incredible. Leo has developed problem-solving skills we never expected at this age. Highly recommended!',
    rating: 5,
    color: 'from-purple-400 to-indigo-400',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content: 'As an artist, I value creative expression. The environments here are stunningly designed to provoke imagination. It is the premium standard.',
    rating: 5,
    color: 'from-emerald-400 to-teal-400',
  },
];

export default function TestimonialsSection() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-32 px-4 bg-white/40 backdrop-blur-2xl relative overflow-hidden">
      {/* Animated geometric nodes background */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nodes" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#d97706" />
              <path d="M50 50 L150 50 M50 50 L50 150" stroke="#d97706" strokeWidth="0.5" strokeDasharray="5,5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nodes)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
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
            className="inline-flex glass-card border border-white px-6 py-2 rounded-full mb-8 shadow-sm bg-white"
          >
            <span className="font-bold tracking-widest uppercase text-sm text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Happy Families
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">
            Words of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Joy</span>
          </h2>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <div className="relative w-full max-w-4xl mx-auto perspective-1000">
          <div className="relative h-[480px] md:h-[400px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              // Calculate relative position (-1, 0, 1)
              let position = index - activeIndex;
              if (position < -1) position += testimonials.length;
              if (position > 1) position -= testimonials.length;

              const isActive = position === 0;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={false}
                  animate={{
                    x: position * 100 + '%',
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.3,
                    rotateY: position * -15,
                    zIndex: isActive ? 10 : 0
                  }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
                  className={`absolute w-full max-w-2xl cursor-pointer ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  onClick={() => !isActive && setActiveIndex(index)}
                >
                  <div className={`glass-card p-10 md:p-14 rounded-[3rem] border border-white relative shadow-2xl bg-white/70 overflow-hidden`}>
                    {/* Glowing highlight */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${testimonial.color} blur-[50px] opacity-40 rounded-full`} />
                    <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${testimonial.color} blur-[50px] opacity-30 rounded-full`} />

                    {/* Quotation icon */}
                    <div className="absolute top-10 right-10 text-6xl opacity-20 filter drop-shadow-sm text-slate-800 font-serif leading-none">
                      "
                    </div>

                    <div className="flex flex-col h-full relative z-10">
                      {/* Rating */}
                      <div className="flex gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10 italic">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-5 mt-auto">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} p-1 shadow-md overflow-hidden flex items-center justify-center`}>
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-full border-2 border-white" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                          <div className="text-sm font-medium text-purple-600 tracking-wider uppercase">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-4 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-10 h-3 bg-gradient-to-r from-orange-400 to-pink-400 shadow-md' 
                    : 'w-3 h-3 bg-orange-200 hover:bg-orange-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
