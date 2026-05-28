'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 },
    },
  };

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait Image Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
            className="relative pr-0 lg:pr-8"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-primary/5">
              <Image
                src="/assets/benny_profile.png"
                alt="Benny - Tu Guía Local en Panamá"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Experience badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, delay: 0.3 }}
              className="absolute -bottom-6 -right-2 sm:right-6 lg:-right-4 bg-primary text-white border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl z-20 max-w-[180px] sm:max-w-[200px]"
            >
              <span className="font-headings font-extrabold text-4xl sm:text-5xl text-accent leading-none">
                14+
              </span>
              <span className="font-headings text-[10px] sm:text-xs text-white/80 uppercase tracking-widest text-center mt-3 font-semibold leading-relaxed">
                Años Guiando Aventuras
              </span>
            </motion.div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={contentVariants}
            className="flex flex-col"
          >
            <span className="text-secondary-light font-headings font-bold text-xs uppercase tracking-widest bg-secondary/5 w-fit px-3.5 py-1.5 rounded-full border border-secondary/10">
              Detrás del Tour
            </span>
            <h2 className="font-headings font-bold text-3xl sm:text-4xl text-primary mt-6 mb-6">
              Hola, soy Benny
            </h2>
            <p className="text-gray text-base leading-relaxed mb-8 font-body italic border-l-4 border-accent/30 pl-4 text-primary/50">
              {/* TODO: Aquí va la historia real de Benny */}
              Aquí se entera la historia
            </p>

            {/* Values badges list */}
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 bg-light border border-primary/5 rounded-2xl px-5 py-3 font-headings font-bold text-xs sm:text-sm text-primary">
                <Heart className="w-4 h-4 text-secondary-light fill-current" />
                <span>Pasión Local</span>
              </div>
              <div className="flex items-center gap-2 bg-light border border-primary/5 rounded-2xl px-5 py-3 font-headings font-bold text-xs sm:text-sm text-primary">
                <Globe className="w-4 h-4 text-secondary-light" />
                <span>Español / Inglés</span>
              </div>
              <div className="flex items-center gap-2 bg-light border border-primary/5 rounded-2xl px-5 py-3 font-headings font-bold text-xs sm:text-sm text-primary">
                <Leaf className="w-4 h-4 text-secondary-light" />
                <span>Ecoturismo Responsable</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
