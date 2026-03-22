import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';

import InteractiveBackground from './components/InteractiveBackground';

// Lazy load sections for better performance
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProgramsSection = lazy(() => import('./components/ProgramsSection'));
const ParallaxSection = lazy(() => import('./components/ParallaxSection'));
const FacilitiesSection = lazy(() => import('./components/FacilitiesSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="overflow-x-hidden bg-transparent">
      <InteractiveBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </section>

      {/* Programs Section */}
      <section id="programs">
        <Suspense fallback={<SectionLoader />}>
          <ProgramsSection />
        </Suspense>
      </section>

      {/* Parallax Activities Section */}
      <Suspense fallback={<SectionLoader />}>
        <ParallaxSection />
      </Suspense>

      {/* Facilities Section */}
      <section id="facilities">
        <Suspense fallback={<SectionLoader />}>
          <FacilitiesSection />
        </Suspense>
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </section>

      {/* Footer */}
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

      {/* Floating Action Button - WhatsApp */}
      <motion.a
        href="https://wa.me/1234567890" // Placeholder WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center z-50 group hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border-2 border-white transition-shadow"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
        </motion.div>
      </motion.a>
    </div>
  );
}
