'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, AtSign, Mail, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '50765232363';

const toursOptions = [
  { id: 'embera',    label: 'Cultura Emberá' },
  { id: 'canal',     label: 'Canal de Panamá' },
  { id: 'portobelo', label: 'Portobelo e Historia' },
  { id: 'sanblas',   label: 'Paraíso San Blas' },
  { id: 'casco',     label: 'Casco Viejo' },
];

function buildWhatsAppUrl(name: string, tours: string[], message: string): string {
  const tourLabels = tours
    .map((id) => toursOptions.find((t) => t.id === id)?.label ?? id)
    .join(', ');

  const lines = [
    `Hola Benny, soy *${name || 'un viajero interesado'}*.`,
    tourLabels ? `Me interesan los tours: *${tourLabels}*.` : '',
    message ? `Mensaje: ${message}` : '',
    '',
    'Me gustaría cotizar y planificar mi viaje. ¡Gracias!',
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    tours: [] as string[],
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTourSelect = (tourId: string) => {
    setFormData((prev) => ({
      ...prev,
      tours: prev.tours.includes(tourId)
        ? prev.tours.filter((t) => t !== tourId)
        : [...prev.tours, tourId],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(formData.name, formData.tours, formData.message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    setFormData({ name: '', tours: [], message: '' });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 } as const,
    },
  } as const;

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary via-dark to-dark text-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={cardVariants}
          className="bg-white/3 border border-white/10 rounded-[36px] p-8 md:p-12 lg:p-16 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 shadow-2xl"
        >
          {/* Info Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-accent font-headings font-semibold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full w-fit mb-6">
              ¿Listo para la Aventura?
            </span>
            <h2 className="font-headings font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Planifiquemos tu Viaje Perfecto
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed font-body">
              Escríbeme sin compromiso. Cuéntame cuántos días estarás en Panamá, qué te apasiona y armaremos un itinerario a tu medida.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Benny, quisiera cotizar un tour privado')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:translate-x-1.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">WhatsApp Directo</p>
                  <p className="text-sm sm:text-base font-bold font-headings text-white mt-0.5">+507 6523-2363</p>
                </div>
              </a>

              <a
                href="https://instagram.com/bennypanama"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:translate-x-1.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform duration-300">
                  <AtSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Sígueme en Instagram</p>
                  <p className="text-sm sm:text-base font-bold font-headings text-white mt-0.5">@bennypanama</p>
                </div>
              </a>

              <a
                href="mailto:benny.panama@gmail.com"
                className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:translate-x-1.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-light/10 border border-secondary-light/25 flex items-center justify-center text-secondary-light group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Correo Electrónico</p>
                  <p className="text-sm sm:text-base font-bold font-headings text-white mt-0.5">benny.panama@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-6">
            <div className="bg-white text-dark rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="font-headings font-bold text-xl sm:text-2xl text-primary">
                        Arma tu consulta
                      </h3>
                      <p className="text-gray text-xs mt-1 font-body">
                        Al enviar, se abrirá WhatsApp con tu mensaje listo.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-headings font-semibold text-xs text-primary">
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        autoComplete="given-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-light focus:outline-none focus:border-secondary-light focus:bg-white text-sm transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="font-headings font-semibold text-xs text-primary">
                        ¿Qué tours te interesan?
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {toursOptions.map((tour) => {
                          const selected = formData.tours.includes(tour.id);
                          return (
                            <button
                              type="button"
                              key={tour.id}
                              onClick={() => handleTourSelect(tour.id)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold font-headings transition-all duration-300 cursor-pointer ${
                                selected
                                  ? 'bg-primary border-primary text-white shadow-sm'
                                  : 'bg-light border-primary/10 hover:border-primary/20 text-primary-light'
                              }`}
                            >
                              {tour.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-headings font-semibold text-xs text-primary">
                        Mensaje / Detalles (opcional)
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Cuéntame fechas, número de personas, intereses..."
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-light focus:outline-none focus:border-secondary-light focus:bg-white text-sm transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-emerald-500 text-white font-headings font-bold hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      Enviar por WhatsApp
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
                    <h3 className="font-headings font-bold text-2xl text-primary mb-3">
                      ¡WhatsApp abierto!
                    </h3>
                    <p className="text-gray text-sm sm:text-base leading-relaxed max-w-sm mb-8 font-body">
                      Tu mensaje está listo en WhatsApp. Benny responde rápido.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-primary/10 text-primary hover:bg-light font-headings font-semibold text-xs transition-colors duration-300 cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
