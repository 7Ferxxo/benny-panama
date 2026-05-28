'use client';

import { motion } from 'framer-motion';
import { Compass, Users, ShieldCheck } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: <Compass className="w-8 h-8 text-secondary-light" />,
      title: '100% Privado y Flexible',
      desc: 'Sin prisas ni itinerarios rígidos. Ajustamos el recorrido sobre la marcha según tus intereses y ritmo.',
    },
    {
      icon: <Users className="w-8 h-8 text-secondary-light" />,
      title: 'Conexiones Auténticas',
      desc: 'Acceso genuino a comunidades locales como los Emberá, respetando sus tradiciones y apoyando su economía.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary-light" />,
      title: 'Comodidad y Seguridad',
      desc: 'Transporte privado climatizado, guiado experto bilingüe y logística totalmente resuelta por mí.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section
      id="features"
      className="relative z-20 bg-white pt-16 pb-12 -mt-12 rounded-t-[40px] shadow-2xl border-t border-white/10"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-light border border-primary/5 hover:border-primary/10 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="p-4 bg-white rounded-2xl w-fit mb-6 shadow-sm border border-primary/5 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="font-headings font-bold text-xl text-primary mb-3">
                {feat.title}
              </h3>
              <p className="text-gray leading-relaxed text-sm md:text-base font-body">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
