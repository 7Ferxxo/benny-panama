'use client';

import { AtSign, MessageCircle, Mail } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollTo';

export default function Footer() {
  const handleScrollTo = scrollToSection;

  return (
    <footer className="bg-[#08100e] text-white/60 py-16 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5">
        {/* Brand Col */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleScrollTo('hero')}
            className="text-2xl font-headings font-extrabold text-white tracking-tight w-fit focus:outline-none cursor-pointer"
          >
            <span className="text-accent">Benny</span>Panamá
          </button>
          <p className="text-sm leading-relaxed max-w-sm font-body">
            Tu aventura privada y auténtica en Panamá. Guiado local, transporte privado, experiencias inolvidables.
          </p>
        </div>

        {/* Links Col */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-headings font-bold text-base uppercase tracking-wider">
            Enlaces Rápidos
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            <li>
              <button
                onClick={() => handleScrollTo('hero')}
                className="text-sm hover:text-accent focus:outline-none cursor-pointer transition-colors"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('tours')}
                className="text-sm hover:text-accent focus:outline-none cursor-pointer transition-colors"
              >
                Nuestros Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('about')}
                className="text-sm hover:text-accent focus:outline-none cursor-pointer transition-colors"
              >
                Sobre Benny
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('gallery')}
                className="text-sm hover:text-accent focus:outline-none cursor-pointer transition-colors"
              >
                Galería Real
              </button>
            </li>
          </ul>
        </div>

        {/* Social Col */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-headings font-bold text-base uppercase tracking-wider">
            Redes y Contacto
          </h4>
          <div className="flex gap-3 mb-2">
            <a
              href="https://instagram.com/bennypanama"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-dark flex items-center justify-center transition-all duration-300 text-white"
              aria-label="Instagram"
            >
              <AtSign className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/50760000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-dark flex items-center justify-center transition-all duration-300 text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
            <a
              href="mailto:benny.panama@gmail.com"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-dark flex items-center justify-center transition-all duration-300 text-white"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white font-semibold text-sm font-headings">
            benny.panama@gmail.com
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 text-center text-xs text-white/40 font-body">
        <p>&copy; {new Date().getFullYear()} Benny Panamá. Todos los derechos reservados. Diseñado con pasión.</p>
      </div>
    </footer>
  );
}
