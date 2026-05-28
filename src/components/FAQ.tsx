'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿El precio incluye transporte desde mi hotel?',
    answer:
      'Sí. Todos los tours incluyen transporte privado de ida y vuelta desde tu hotel en la Ciudad de Panamá. Si te hospedas fuera de la ciudad, lo coordinamos juntos sin costo adicional.',
  },
  {
    question: '¿En qué idiomas guía Benny?',
    answer:
      'En español e inglés con fluidez total. Si viajas en otro idioma, podemos coordinar un guía adicional de confianza para acompañar el tour.',
  },
  {
    question: '¿Los tours son privados o hay opciones en grupo?',
    answer:
      'La gran mayoría son privados por diseño. Si eres viajero solo o pareja y deseas compartir costos, podemos explorar fechas con otros viajeros de perfil similar. Siempre grupos pequeños, máximo 6 personas.',
  },
  {
    question: '¿Cómo se realiza el pago?',
    answer:
      'Aceptamos efectivo (dólares), transferencia bancaria y pagos digitales. Se solicita un depósito del 30% para confirmar la reserva; el resto se paga el día del tour.',
  },
  {
    question: '¿Con cuánto tiempo de antelación hay que reservar?',
    answer:
      '48 horas son suficientes para la mayoría de tours. Para San Blas y destinos con permisos especiales recomendamos al menos 5 días. En temporada alta (diciembre–marzo) una semana o más.',
  },
  {
    question: '¿Por qué 14 años de experiencia marcan la diferencia?',
    answer:
      'Benny lleva 14 años construyendo relaciones con comunidades indígenas, capitanes de botes, restaurantes locales y guías en cada región. Eso se traduce en acceso, confianza y momentos únicos que ninguna agencia puede replicar.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section id="faq" className="py-24 bg-light">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring' as const, stiffness: 60, damping: 15 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-secondary-light font-headings font-bold text-xs uppercase tracking-widest bg-secondary/5 px-3.5 py-1.5 rounded-full border border-secondary/10">
            Preguntas Frecuentes
          </span>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-primary mt-6 mb-4">
            Todo lo que necesitas <span className="text-secondary-light">saber</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.07, type: 'spring' as const, stiffness: 80, damping: 15 }}
              className={`bg-white border rounded-2xl overflow-hidden transition-colors duration-300 ${
                openIndex === idx ? 'border-primary/20 shadow-sm' : 'border-primary/5'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                aria-expanded={openIndex === idx}
              >
                <span className="font-headings font-semibold text-base sm:text-lg text-primary group-hover:text-secondary-light transition-colors duration-200">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-light border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  {openIndex === idx ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray text-sm sm:text-base leading-relaxed font-body border-t border-primary/5 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
