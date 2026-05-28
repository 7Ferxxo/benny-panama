'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  origin: string;
  flag: string;
  text: string;
  tour: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah & James',
    origin: 'Nueva York, EE.UU.',
    flag: '🇺🇸',
    text: 'Benny nos llevó a la comunidad Emberá y fue la experiencia más auténtica que hemos tenido en toda América Latina. Habla perfecto inglés, conoce cada historia, cada planta, cada persona. Un guía excepcional.',
    tour: 'Tour Emberá',
  },
  {
    name: 'Klaus & Monika',
    origin: 'Múnich, Alemania',
    flag: '🇩🇪',
    text: 'Las islas de San Blas superaron todas mis expectativas. Benny organizó todo perfectamente, desde el transporte hasta el almuerzo con la familia Kuna. Una jornada perfecta que repetiría sin dudar.',
    tour: 'Islas de San Blas',
  },
  {
    name: 'Marta García',
    origin: 'Madrid, España',
    flag: '🇪🇸',
    text: 'El tour a Portobelo fue una revelación. Yo pensaba que era un destino más, pero Benny sabe contar la historia de una forma que te transporta literalmente al siglo XVII. ¡Increíble narrador!',
    tour: 'Portobelo Histórico',
  },
  {
    name: 'Marc Tremblay',
    origin: 'Montreal, Canadá',
    flag: '🇨🇦',
    text: 'Contacté a Benny con solo 2 días de antelación y organizó un tour privado perfecto por el Canal. Puntual, amable, profesional y con un conocimiento profundo. Mi guía de referencia en Panamá.',
    tour: 'Canal de Panamá',
  },
  {
    name: 'Antoine & Céline',
    origin: 'París, Francia',
    flag: '🇫🇷',
    text: 'Nuestro viaje de novios en Panamá fue mágico gracias a Benny. Adaptó cada detalle a nuestros gustos. No es un guía, es un anfitrión de lujo que hace que cada momento sea memorable.',
    tour: 'Casco Viejo',
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Testimonials() {
  const [[index, direction], setPage] = useState([0, 0]);
  const current = ((index % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = useCallback(
    (dir: number) => setPage(([prev]) => [prev + dir, dir]),
    []
  );

  useEffect(() => {
    const id = setInterval(() => paginate(1), 6000);
    return () => clearInterval(id);
  }, [paginate]);

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring' as const, stiffness: 60, damping: 15 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-secondary-light font-headings font-bold text-xs uppercase tracking-widest bg-secondary/5 px-3.5 py-1.5 rounded-full border border-secondary/10">
            Testimonios
          </span>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-primary mt-6 mb-4">
            Lo que dicen quienes{' '}
            <span className="text-secondary-light">vivieron la experiencia</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
                className="bg-light border border-primary/5 rounded-3xl p-8 sm:p-12 shadow-sm"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="font-headings text-lg sm:text-xl italic text-primary leading-relaxed mb-8 border-l-4 border-secondary-light pl-6">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <span className="text-4xl leading-none" role="img" aria-label={testimonials[current].origin}>
                    {testimonials[current].flag}
                  </span>
                  <div>
                    <p className="font-headings font-bold text-primary text-base">
                      {testimonials[current].name}
                    </p>
                    <p className="text-gray text-sm font-body">{testimonials[current].origin}</p>
                  </div>
                  <span className="ml-auto text-xs font-headings font-semibold text-secondary-light bg-secondary/8 border border-secondary/15 px-3 py-1 rounded-full">
                    {testimonials[current].tour}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(([prev]) => [prev + (i - current), i - current || 1])}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'w-6 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-primary/15 hover:bg-primary/30'
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
