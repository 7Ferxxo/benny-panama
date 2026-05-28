'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '50765232363';
const WHATSAPP_MSG = 'Hola Benny, quisiera información sobre un tour privado';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="mr-3 px-3 py-1.5 rounded-lg bg-dark text-white text-sm font-body whitespace-nowrap shadow-lg"
              >
                ¡Habla con Benny!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a Benny por WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full ring-4 ring-emerald-500/30 animate-ping" />
            <MessageCircle className="w-7 h-7 fill-current text-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
