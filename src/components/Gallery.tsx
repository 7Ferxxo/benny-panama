'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryItem {
  image: string;
  label: string;
}

const galleryItems: GalleryItem[] = [
  { image: '/assets/gal_embera_smile.png', label: 'Comunidad Emberá' },
  { image: '/assets/gal_sanblas_boat.png', label: 'Islas San Blas' },
  { image: '/assets/gal_canal_ships.png', label: 'Canal de Panamá' },
  { image: '/assets/gal_casco_roof.png', label: 'Casco Viejo' },
  { image: '/assets/gal_jungle_trek.png', label: 'Sendero del Chagres' },
  { image: '/assets/gal_tornillo.jpeg', label: 'El Tornillo (Ciudad Moderna)' },
  { image: '/assets/gal_chorro.png', label: 'Cascadas Tropicales' },
  { image: '/assets/gal_bridge.jpeg', label: 'Puente de las Américas' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length)),
    []
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryItems.length)),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 60, damping: 15, delay: index * 0.08 },
    }),
  };

  return (
    <>
      <section id="gallery" className="py-24 bg-light">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring' as const, stiffness: 60, damping: 15 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-secondary-light font-headings font-bold text-xs uppercase tracking-widest bg-secondary/5 px-3.5 py-1.5 rounded-full border border-secondary/10">
              Instantes Reales
            </span>
            <h2 className="font-headings font-bold text-3xl sm:text-4xl text-primary mt-6 mb-4">
              Panamá a través de mis Ojos
            </h2>
            <p className="text-gray text-base sm:text-lg font-body">
              Capturas de momentos genuinos con viajeros que confiaron en mí para su aventura.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <motion.button
                key={idx}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group border border-primary/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Ver imagen: ${item.label}`}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-12" />
                </div>
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <span className="font-headings font-bold text-lg text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Galería — ${galleryItems[lightboxIndex].label}`}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].label}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Caption + dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <p className="text-white/80 font-headings text-sm font-semibold">
                {galleryItems[lightboxIndex].label}
              </p>
              <div className="flex gap-2">
                {galleryItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === lightboxIndex ? 'w-5 h-2 bg-accent' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir a ${galleryItems[i].label}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
