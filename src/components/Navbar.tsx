import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, Sparkles, BookOpen, Palette, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0, 0, 0, 0)', '0 4px 30px rgba(0, 0, 0, 0.1)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: Sparkles },
    { name: 'Programs', icon: BookOpen },
    { name: 'Gallery', icon: Palette },
    { name: 'Contact', icon: PhoneCall },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-purple-700' : 'text-purple-700'}`}>
              Little Stars
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {item.name}
                </motion.a>
              );
            })}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg flex items-center gap-2"
            >
              Enroll Now <Sparkles className="w-4 h-4 ml-1" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-purple-700 rounded-full"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-purple-700 rounded-full"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-purple-700 rounded-full"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-100 hover:text-purple-700 font-medium flex items-center gap-3"
                >
                  <IconComp className="w-5 h-5 text-purple-500" />
                  {item.name}
                </motion.a>
              );
            })}
            <motion.a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ y: 20, opacity: 0 }}
              animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg mt-4 flex items-center justify-center gap-2 block text-center"
            >
              Enroll Now <Sparkles className="w-5 h-5 ml-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
