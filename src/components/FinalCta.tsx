import React from 'react';
import { CoachConfig } from '../types';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  config: CoachConfig;
  onBookClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ config, onBookClick }) => {
  const handleWhatsAppClick = () => {
    const message = `Hola ${config.coachName}, estuve revisando la propuesta de entrenamiento y me gustaría platicar sobre mis metas para agendar una sesión inicial.`;
    window.open(`https://wa.me/${config.phoneWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="bg-[#0A0910] text-white py-24 sm:py-32 relative text-center overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-radial from-[#9B5CFF]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[760px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="font-mono text-xs tracking-wider uppercase text-[#2FB6FF] mb-4 flex items-center justify-center gap-2.5 font-semibold">
          Siguiente paso
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.1] text-white">
          Cuéntale a tu coach cuál es tu objetivo real.
        </h2>

        <p className="mt-5 text-base sm:text-lg text-white/60 max-w-[480px] mx-auto leading-relaxed">
          Una conversación directa por WhatsApp basta para empezar. Sin compromisos forzosos, sin cuestionarios interminables.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(155,92,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Reservar sesión</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#2FB6FF]" />
            <span>Escribir por WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
