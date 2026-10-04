import React from 'react';
import { CoachConfig } from '../types';
import { TESTIMONIALS } from '../data/defaultConfig';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  config: CoachConfig;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ config }) => {
  return (
    <section id="testimonios" className="bg-[#0A0910] text-white py-16 sm:py-24 lg:py-28 relative overflow-hidden border-t border-white/10">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-radial from-[#9B5CFF]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-xs tracking-wider uppercase text-[#C24CE0] mb-4 flex items-center gap-2.5 font-semibold">
              <span className="w-5 h-[1.5px] bg-[#C24CE0]" />
              Testimonios de clientes
            </div>

            <h2 className="font-display font-semibold text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[42px] tracking-tight max-w-[620px] text-white">
              Resultados reales de personas con vidas y rutinas reales.
            </h2>
          </div>

          <div className="font-mono text-xs text-white/40 max-w-[240px]">
            — Casos documentados con seguimiento de métricas y hábitos —
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-white/20 transition-all hover:bg-white/[0.06] group"
            >
              <div>
                <Quote className="w-6 h-6 text-[#9B5CFF]/40 mb-4 group-hover:text-[#9B5CFF] transition-colors" />
                <p className="text-sm sm:text-base leading-relaxed text-white/80 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarColor} flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    {t.name}
                  </div>
                  <div className="text-xs font-mono text-white/50 leading-snug">
                    <span className="block">{t.role}</span>
                    <span className="block text-white/40">{t.since}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
