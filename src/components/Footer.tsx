import { motion } from 'framer-motion';
import { Star, HeartHandshake, Sparkles, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { icon: Facebook, key: 'fb' },
    { icon: Instagram, key: 'ig' },
    { icon: Twitter, key: 'tw' },
    { icon: Youtube, key: 'yt' },
  ];

  return (
    <footer className="bg-white/50 backdrop-blur-xl border-t border-white/40 relative overflow-hidden pt-24 pb-12">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-pink-100/50 to-transparent blur-[50px] pointer-events-none" />

      {/* Floating Shapes in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <motion.div animate={{ rotate: 360, y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute flex items-center justify-center top-10 left-[10%]">
          <Star className="w-12 h-12 text-yellow-500 fill-yellow-500/20 drop-shadow-sm" />
        </motion.div>
        <motion.div animate={{ rotate: -360, y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute flex items-center justify-center bottom-20 right-[15%]">
          <HeartHandshake className="w-10 h-10 text-pink-400 drop-shadow-sm" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16 border-b border-pink-100 pb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="text-3xl font-black text-slate-800 tracking-tighter flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg text-white text-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500">
                Little Stars
              </span>
            </motion.div>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              A premium, immersive learning environment where every child discovers their inner brilliance and magic.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <motion.a
                    key={social.key}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-pink-500 hover:border-pink-200 transition-colors"
                  >
                    <SocialIcon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-lg font-black text-slate-800 tracking-widest uppercase mb-6 drop-shadow-sm">Campus Map</h4>
            <ul className="space-y-4">
              {['Home Base', 'Our Approach', 'Programs', 'Facilities', 'Gallery Archive'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 font-medium hover:text-pink-500 hover:translate-x-2 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-lg font-black text-slate-800 tracking-widest uppercase mb-6 drop-shadow-sm">Ages</h4>
            <ul className="space-y-4">
              {[
                { name: 'Little Explorers', age: '1.5 - 2.5 yrs' },
                { name: 'Curious Minds', age: '2.5 - 4 yrs' },
                { name: 'Creative Stars', age: '4 - 6 yrs' },
                { name: 'Summer Camp', age: 'All Ages' },
              ].map((prog) => (
                <li key={prog.name} className="group">
                  <a href="#" className="flex flex-col">
                    <span className="text-slate-600 font-bold group-hover:text-purple-500 transition-colors">{prog.name}</span>
                    <span className="text-slate-400 font-medium text-sm">{prog.age}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-black text-slate-800 tracking-widest uppercase mb-6 drop-shadow-sm">Magic Newsletter</h4>
            <p className="text-slate-500 font-medium mb-4">
              Subscribe to get magical updates, activity ideas, and enrollment alerts.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Parent's email address"
                className="w-full bg-white border border-slate-200 text-slate-800 font-medium px-4 py-3 rounded-xl outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.1)] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-800 text-white font-bold tracking-widest uppercase px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Little Stars Play School. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
