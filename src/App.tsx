/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Lock, 
  Mail, 
  Globe, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  Smartphone
} from 'lucide-react';
import { translations } from './translations';

type Language = 'vi' | 'en';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'vi' ? 'en' : 'vi');

  const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a 
      href={href} 
      className="text-sm font-bold text-slate-600 hover:text-siemens-petrol transition-colors relative group"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-siemens-petrol transition-all group-hover:w-full" />
    </a>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-siemens-light selection:text-siemens-dark">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-siemens-accent to-siemens-dark rounded-xl flex items-center justify-center text-white shadow-siemens">
              <Smartphone size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-siemens-petrol to-siemens-dark">
              SerenaAppPortfolio
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#apps">{t.nav.apps}</NavLink>
            <NavLink href="#security">{t.nav.security}</NavLink>
            <NavLink href="#contact">{t.nav.contact}</NavLink>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-siemens-light transition-all text-slate-700"
              title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            >
              <Globe size={20} className="text-siemens-petrol" />
              <span className="text-xs font-black tracking-tighter uppercase">
                {lang === 'vi' ? 'EN' : 'VI'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <NavLink href="#apps">{t.nav.apps}</NavLink>
              <NavLink href="#security">{t.nav.security}</NavLink>
              <NavLink href="#contact">{t.nav.contact}</NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-siemens-petrol/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-siemens-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-siemens-petrol uppercase bg-white border border-siemens-light rounded-full shadow-siemens">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-siemens-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-siemens-petrol"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.9] lg:max-w-5xl mx-auto">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#apps" 
                className="group px-10 py-5 bg-gradient-to-br from-siemens-accent to-siemens-dark text-white rounded-2xl font-bold shadow-siemens-lg hover:brightness-110 transition-all flex items-center gap-3"
              >
                {t.hero.cta}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                {t.nav.contact}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{t.apps.title}</h2>
              <p className="text-lg text-slate-500 font-medium">{t.apps.subtitle}</p>
            </div>
            <div className="hidden md:block h-px flex-grow bg-slate-100 mx-12 mb-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* HealthNote247 */}
            <AppCard 
              icon={<Heart className="text-rose-500" size={32} />}
              name={t.apps.healthnote.name}
              desc={t.apps.healthnote.desc}
              features={t.apps.healthnote.features}
              color="rose"
              link="https://healthnote247.online"
              index={0}
            />
            {/* One4AllPass */}
            <AppCard 
              icon={<Lock className="text-siemens-petrol" size={32} />}
              name={t.apps.one4all.name}
              desc={t.apps.one4all.desc}
              features={t.apps.one4all.features}
              color="siemens"
              link="https://one4allpass.online"
              index={1}
            />
            {/* TraCuuDiaChi */}
            <AppCard 
              icon={<MapPin className="text-emerald-500" size={32} />}
              name={t.apps.tracuudiachi.name}
              desc={t.apps.tracuudiachi.desc}
              features={t.apps.tracuudiachi.features}
              color="emerald"
              link="https://tracuudiachi.online"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Security Commitment */}
      <section id="security" className="py-24 bg-gradient-to-b from-siemens-dark to-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-siemens-petrol rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-siemens-accent rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-siemens-petrol/20 text-siemens-accent text-sm font-bold mb-6 border border-siemens-petrol/30">
                <ShieldCheck size={16} />
                {lang === 'vi' ? 'Bảo mật tuyệt đối' : 'Absolute Security'}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.security.title}
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                {t.security.intro}
              </p>
              <div className="space-y-6">
                {t.security.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-siemens-accent group-hover:bg-siemens-petrol/20 transition-all">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{point.title}</h3>
                      <p className="text-slate-400">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-siemens-petrol/20 to-siemens-accent/20 border border-white/10 flex items-center justify-center p-12">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="w-full h-full rounded-2xl bg-slate-800 shadow-siemens-lg flex flex-col items-center justify-center gap-6 border border-white/5"
                >
                  <Lock size={80} className="text-siemens-accent" />
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">Encrypted Data</div>
                    <div className="text-slate-500 font-mono text-sm">AES-256-GCM-SIV</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-slate-600">{t.contact.subtitle}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-siemens p-8 md:p-12 border border-slate-100">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t.contact.name}</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-siemens-petrol focus:ring-2 focus:ring-siemens-light outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t.contact.email}</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-siemens-petrol focus:ring-2 focus:ring-siemens-light outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t.contact.message}</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-siemens-petrol focus:ring-2 focus:ring-siemens-light outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-siemens-accent to-siemens-dark text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-siemens">
                <Mail size={20} />
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-siemens-accent to-siemens-dark rounded-lg flex items-center justify-center text-white">
              <Smartphone size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight">
              SerenaAppPortfolio
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SerenaAppPortfolio. {t.footer.rights}
          </div>
          <div className="text-slate-400 text-xs font-medium">
            Developed: Hoangld988
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-siemens-petrol transition-colors">
              <Smartphone size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-siemens-petrol transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-siemens-petrol transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppCard({ icon, name, desc, features, color, link, index }: { 
  icon: ReactNode; 
  name: string; 
  desc: string; 
  features: string[];
  color: string;
  link: string;
  index: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -12 }}
      className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-siemens-light to-white rounded-bl-[5rem] -z-10 group-hover:from-siemens-petrol/10 group-hover:to-siemens-accent/5 transition-colors duration-500" />
      
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-siemens-light to-white flex items-center justify-center mb-10 group-hover:scale-110 group-hover:from-white group-hover:to-white group-hover:shadow-siemens transition-all duration-500">
        {icon}
      </div>
      
      <h3 className="text-3xl font-black tracking-tight mb-6 group-hover:text-siemens-petrol transition-colors">{name}</h3>
      <p className="text-slate-500 mb-10 leading-relaxed font-medium">
        {desc}
      </p>
      
      <div className="space-y-4 mb-12">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-siemens-petrol" />
            {f}
          </div>
        ))}
      </div>
      
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-siemens-accent to-siemens-dark text-white text-sm font-bold hover:brightness-110 transition-all shadow-siemens"
      >
        {translations.en.hero.cta}
        <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}
