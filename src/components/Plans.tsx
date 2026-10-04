import React from 'react';
import { CoachConfig } from '../types';
import { PLAN_TIERS } from '../data/defaultConfig';
import { Check, ArrowRight } from 'lucide-react';

interface PlansProps {
  config: CoachConfig;
}

export const Plans: React.FC<PlansProps> = ({ config }) => {
  const handleSelectPlan = (planName: string) => {
    const message = `Hola ${config.coachName}, me interesa el plan de entrenamiento ${planName}. ¿Podrías darme detalles sobre cupos y proceso de ingreso?`;
    window.open(`https://wa.me/${config.phoneWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="planes" className="bg-white text-[#12141B] py-16 sm:py-24 lg:py-28 relative">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-xs tracking-wider uppercase text-[#7A47D6] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#7A47D6]" />
          Planes de entrenamiento
        </div>

        <h2 className="font-display font-semibold text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[42px] tracking-tight max-w-[680px] text-[#12141B]">
          Elige el nivel de acompañamiento que necesitas para tu meta.
        </h2>

        <div className="text-xs font-mono text-[#9AA0AE] mt-3">
          — Cupos limitados para garantizar seguimiento semanal personalizado —
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mt-14 items-stretch">
          {PLAN_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-1.5 ${
                tier.featured
                  ? 'border-2 border-transparent bg-white shadow-[0_20px_40px_-15px_rgba(155,92,255,0.25)] relative before:absolute before:inset-[-2px] before:rounded-[18px] before:bg-gradient-to-br before:from-[#9B5CFF] before:via-[#C24CE0] before:to-[#2FB6FF] before:-z-10'
                  : 'border border-[#E1E3EC] bg-white hover:shadow-xl'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-7 bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                  {tier.badge}
                </div>
              )}

              <div className="font-display font-bold text-2xl text-[#12141B]">
                {tier.name}
              </div>

              <p className="text-xs sm:text-sm text-[#5B6172] mt-2.5 min-h-[44px] leading-relaxed">
                {tier.tagline}
              </p>

              <div className="mt-5 pt-5 border-t border-[#EDEEF3] font-mono text-base font-semibold text-[#7A47D6] flex items-baseline gap-1.5">
                <span>{tier.priceText}</span>
              </div>

              {/* Feature List */}
              <ul className="flex flex-col gap-3 mt-6 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#33353E]">
                    <span className="w-4 h-4 rounded-full bg-[#7A47D6]/10 text-[#7A47D6] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(tier.name)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  tier.featured
                    ? 'bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white hover:brightness-110 shadow-[0_4px_16px_rgba(155,92,255,0.3)]'
                    : 'bg-[#12141B] text-white hover:bg-black'
                }`}
              >
                <span>Elegir este plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
