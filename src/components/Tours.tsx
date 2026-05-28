'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Clock, Check, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Tour {
  id: string;
  image: string;
  duration: string;
  title: string;
  desc: string;
  details: string[];
  badge: string;
  whatsappMsg: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 50,
      damping: 15,
      delay: index * 0.1,
    },
  }),
};

function TourCard({ tour, idx }: { tour: Tour; idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFeatured = tour.id === 'sanblas';

  return (
    <motion.div
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-primary/5 hover:border-primary/10 transition-all duration-500 flex flex-col group${isFeatured ? ' ring-2 ring-accent/40' : ''}`}
    >
      {/* Image Header */}
      <div className="relative h-[240px] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

        {/* Duration badge — top left */}
        <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-accent" />
          {tour.duration}
        </span>

        {/* Badge — top right */}
        <span className="absolute top-4 right-4 bg-accent/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          {isFeatured ? '⭐ Más Popular' : tour.badge}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <h3 className="font-headings font-bold text-xl sm:text-2xl text-primary mb-3">
          {tour.title}
        </h3>
        <p className="text-gray text-sm sm:text-base leading-relaxed mb-6 font-body">
          {tour.desc}
        </p>

        {/* Details list */}
        <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-2.5 flex-grow">
          {tour.details.map((detail, dIdx) => (
            <li key={dIdx} className="flex items-center gap-2.5 text-sm text-dark font-body">
              <div className="p-0.5 rounded-full bg-secondary/10 border border-secondary/20">
                <Check className="w-3.5 h-3.5 text-secondary" />
              </div>
              {detail}
            </li>
          ))}
        </ul>

        {/* Card Footer */}
        <div className="flex justify-between items-center border-t border-primary/5 pt-5 mt-auto">
          <span className="bg-secondary/5 border border-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
            {tour.badge}
          </span>
          <a
            href={`https://wa.me/50765232363?text=${encodeURIComponent(tour.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          >
            <MessageCircle className="fill-current w-4 h-4" />
            Reservar
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tours() {
  const toursList: Tour[] = [
    {
      id: 'embera',
      image: '/assets/tour_embera.png',
      duration: 'Full Day',
      title: 'Cultura Ancestral Emberá',
      desc: 'Navega en canoa tradicional por el río Chagres, adéntrate en la selva virgen, disfruta de sus danzas y comparte un almuerzo fresco con la comunidad.',
      details: ['Canoa tradicional en río', 'Senderismo y cascada', 'Almuerzo típico incluido'],
      badge: 'Top Recomendado',
      whatsappMsg: 'Hola Benny, me interesa el Tour Embera',
    },
    {
      id: 'canal',
      image: '/assets/tour_canal.png',
      duration: '4-5 Horas',
      title: 'Maravilla del Canal y Más',
      desc: 'Descubre el funcionamiento de las esclusas desde una perspectiva privilegiada, su historia oculta y visita la calzada de Amador para vistas icónicas de la ciudad.',
      details: ['Centro de Visitantes', 'Calzada de Amador', 'Datos históricos inéditos'],
      badge: 'Imprescindible',
      whatsappMsg: 'Hola Benny, me interesa el Tour Canal',
    },
    {
      id: 'portobelo',
      image: '/assets/tour_portobelo.png',
      duration: 'Full Day',
      title: 'Furia Pirata y Caribe Colonial',
      desc: 'Viaja al lado caribeño de Panamá. Explora las ruinas de Portobelo, el imponente Castillo de San Lorenzo y deléitate con la gastronomía afroantillana local.',
      details: ['Ruinas de fuertes de la UNESCO', 'Vista del Río Chagres al mar', 'Almuerzo afro-panameño'],
      badge: 'Historia y Sabor',
      whatsappMsg: 'Hola Benny, me interesa el Tour Portobelo',
    },
    {
      id: 'sanblas',
      image: '/assets/tour_sanblas.png',
      duration: 'Full Day / Multi-Day',
      title: 'Paraíso de San Blas (Guna Yala)',
      desc: 'El Caribe en su máxima pureza. Aguas turquesas cristalinas, islas vírgenes de arena blanca y el contacto directo con la maravillosa e independiente comunidad Guna.',
      details: ['Islas paradisíacas', 'Snorkeling en arrecifes', 'Conexión con cultura Guna'],
      badge: 'Paraíso Natural',
      whatsappMsg: 'Hola Benny, me interesa el Tour San Blas',
    },
    {
      id: 'casco',
      image: '/assets/tour_casco.png',
      duration: '3-4 Horas',
      title: 'Secretos del Casco Viejo',
      desc: 'Un paseo a pie entre iglesias coloniales, plazas vibrantes, cafeterías de especialidad de café Geisha y datos curiosos que solo un local de verdad te sabrá contar.',
      details: ['Arquitectura y miradores', 'Degustación de café Geisha', 'Recomendaciones locales'],
      badge: 'Cultura & Café',
      whatsappMsg: 'Hola Benny, me interesa el Tour Casco Viejo',
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 60, damping: 15 },
    },
  };

  return (
    <section id="tours" className="py-24 bg-light">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-secondary-light font-headings font-bold text-xs uppercase tracking-widest bg-secondary/5 px-3.5 py-1.5 rounded-full border border-secondary/10">
            Experiencias Exclusivas
          </span>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-primary mt-6 mb-4">
            Elige tu Próxima Aventura
          </h2>
          <p className="text-gray text-base sm:text-lg font-body">
            Diseñados para viajeros curiosos que buscan algo más que la clásica postal de turista.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursList.map((tour, idx) => (
            <TourCard key={tour.id} tour={tour} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
