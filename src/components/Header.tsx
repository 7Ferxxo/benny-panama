'use client';

import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section on scroll
      const sections = ['hero', 'features', 'stats', 'tours', 'testimonials', 'about', 'gallery', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Inicio' },
    { id: 'tours', label: 'Tours' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'gallery', label: 'Galería' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 border-b border-primary/20 shadow-md py-4'
          : 'bg-transparent border-b border-white/10 py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button
          onClick={() => handleScrollTo('hero')}
          className="text-2xl font-headings font-extrabold text-white tracking-tight focus:outline-none cursor-pointer"
        >
          <span className="text-accent">Benny</span>Panamá
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleScrollTo(link.id)}
                  className={`text-sm font-medium relative py-1 focus:outline-none cursor-pointer transition-colors ${
                    activeSection === link.id
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-accent hover:text-dark border border-white/15 text-white text-sm font-headings font-semibold transition-all duration-300 shadow-sm cursor-pointer"
          >
            Contactar
            <MessageCircle className="w-4 h-4 fill-current" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-accent focus:outline-none cursor-pointer"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-[80%] max-w-[320px] h-screen bg-dark/98 backdrop-blur-lg z-40 flex flex-col justify-center items-center shadow-2xl border-l border-white/10"
          >
            <ul className="flex flex-col items-center gap-8 list-none m-0 p-0 text-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className={`text-xl font-medium focus:outline-none cursor-pointer transition-colors ${
                      activeSection === link.id ? 'text-accent font-bold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-4">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-dark font-headings font-bold hover:bg-accent-hover transition-all duration-300 cursor-pointer"
                >
                  Contactar por WhatsApp
                  <MessageCircle className="w-5 h-5 fill-current" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
