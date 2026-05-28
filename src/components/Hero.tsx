'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const handleScrollTo = (id: string) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/hero_bg.png')" }}
    >
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/70 to-secondary/35 z-10" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 text-center text-white max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-headings font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight sm:leading-none mb-6 tracking-tight drop-shadow-sm"
          >
            Descubre el Alma <br className="hidden sm:inline" />
            de <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Panamá</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
          >
            Selvas vírgenes, islas de postal y cultura indígena viva. Todo con un guía privado que conoce cada rincón de Panamá como la palma de su mano — porque lleva 14 años haciéndolo.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('tours')}
              className="px-8 py-3.5 rounded-full bg-accent text-dark hover:bg-accent-hover font-headings font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Explorar Tours
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/25 hover:bg-white hover:text-dark font-headings font-bold backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Planear mi Viaje
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => handleScrollTo('features')}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 focus:outline-none cursor-pointer group"
      >
        <div className="w-[26px] h-[40px] border-2 border-white rounded-[15px] relative group-hover:border-accent transition-colors duration-300">
          <div className="w-[4px] h-[8px] bg-white group-hover:bg-accent rounded-[2px] absolute top-[6px] left-1/2 -translate-x-1/2 animate-scroll-wheel" />
        </div>
      </motion.button>
    </section>
  );
}
