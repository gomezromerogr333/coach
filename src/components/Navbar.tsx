import React, { useState } from 'react';
import { CoachConfig } from '../types';
import { Settings, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  config: CoachConfig;
  onOpenCustomizer: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenCustomizer, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 sticky top-0 bg-[#0A0910]/90 backdrop-blur-md z-50 transition-all">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="font-display font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-[#9B5CFF] shadow-[0_0_10px_2px_#9B5CFF]" />
          <span>
            {config.brandName}
            <span className="text-white/40 font-normal ml-0.5">.{config.brandDomain.split('.')[1] || 'coach'}</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/60">
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
          <a href="#portal" className="hover:text-white transition-colors">Portal</a>
          <a href="#planes" className="hover:text-white transition-colors">Planes</a>
          <a href="#testimonios" className="hover:text-white transition-colors">Testimonios</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenCustomizer}
            className="flex items-center justify-center gap-1.5 min-h-10 min-w-10 px-3 py-1.5 text-xs font-mono font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            title="Personalizar datos de la plantilla"
            aria-label="Personalizar datos de la plantilla"
          >
            <Settings className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span className="hidden sm:inline">Personalizar</span>
          </button>

          <button
            onClick={onBookClick}
            className="min-h-10 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] hover:brightness-110 rounded-xl transition-all shadow-[0_0_20px_rgba(155,92,255,0.3)] active:scale-95 whitespace-nowrap"
          >
            Reservar sesión
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-10 min-w-10 flex items-center justify-center text-white/70 hover:text-white md:hidden"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0910] px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Cómo funciona <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#agenda"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Agenda en vivo <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#portal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Portal por dentro <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#planes"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Planes y tarifas <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#testimonios"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Testimonios <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white py-3 flex items-center justify-between"
          >
            Preguntas frecuentes <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      )}
    </header>
  );
};
