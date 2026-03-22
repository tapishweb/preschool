import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { MapPin, Phone, Mail, Castle, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [formState, setFormState] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    program: 'Little Explorers (1.5 - 2.5y)',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment App:', formState);
    alert('Magic sent! We will reach out shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 px-4 bg-white/40 backdrop-blur-2xl relative overflow-hidden flex justify-center">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-pink-200/50 to-orange-200/30 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/50 to-indigo-200/30 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl w-full relative z-10">
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
            <span className="font-bold tracking-widest uppercase text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Join Our Family
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">
            Start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Magic</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Enrollment is open for the upcoming season. Leave your details and our team will prepare a personalized magical tour for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Details & 3D Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-full flex flex-col justify-between"
          >
            <div className="glass-card p-10 rounded-[3rem] border border-white shadow-xl bg-white/60 mb-8 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-400 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex items-start gap-6 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm filter drop-shadow-md">
                    <MapPin className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1 tracking-wide uppercase">Location</h4>
                    <p className="text-slate-600 font-medium">123 Magic Lane, Wonderland<br />Creative City, CC 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm filter drop-shadow-md">
                    <Phone className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1 tracking-wide uppercase">Direct Line</h4>
                    <p className="text-slate-600 font-medium">+1 (555) 123-4567<br />Mon-Fri 8am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm filter drop-shadow-md">
                    <Mail className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1 tracking-wide uppercase">Email</h4>
                    <p className="text-slate-600 font-medium">hello@littlestars.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated 3D Map */}
            <div className="glass-card rounded-[3rem] border border-white overflow-hidden h-64 relative shadow-xl bg-white/60 group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-indigo-100" />
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwIDIwTDAgME00MCAwTDIwIDIwTTIwIDIwTDQwIDQwTTAgNDBMMjAgMjAiIHN0cm9rZT0icmdiYSgyMzYsNzIsMTUzLDAuMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(236,72,153,0.3)] border border-pink-100"
                >
                  <Castle className="w-8 h-8 text-pink-500 drop-shadow-md" />
                </motion.div>
                <a 
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-slate-800 text-white font-bold rounded-full text-sm shadow-xl tracking-wider hover:bg-slate-700 transition-colors"
                >
                  View Map
                </a>
              </div>
            </div>
          </motion.div>

          {/* Enrollment Matrix Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-card rounded-[3rem] p-10 md:p-14 border border-white shadow-2xl relative bg-white/80"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Parent's Name</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formState.parentName}
                    onChange={handleChange}
                    className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Child's Name</label>
                  <input
                    type="text"
                    name="childName"
                    required
                    value={formState.childName}
                    onChange={handleChange}
                    className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all font-medium"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all font-medium"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Program Selection</label>
                <div className="relative">
                  <select
                    name="program"
                    value={formState.program}
                    onChange={handleChange}
                    className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all font-medium appearance-none"
                  >
                    <option>Little Explorers (1.5 - 2.5y)</option>
                    <option>Curious Minds (2.5 - 4y)</option>
                    <option>Creative Stars (4 - 6y)</option>
                    <option>Summer Camp (All Ages)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-pink-500 text-xl pointer-events-none">
                    ▾
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 tracking-widest uppercase ml-2">Any special notes?</label>
                <textarea
                  name="message"
                  rows={3}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-white/80 hover:bg-white text-slate-800 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all font-medium resize-none"
                  placeholder="Tell us about your little one..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black rounded-2xl mt-4 text-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Submit Application
                <Sparkles className="w-6 h-6 ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
