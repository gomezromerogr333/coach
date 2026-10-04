import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/defaultConfig';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0A0910] text-white py-16 sm:py-24 lg:py-28 relative border-t border-white/10">
      <div className="max-w-[860px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="text-center mb-12">
          <div className="font-mono text-xs tracking-wider uppercase text-[#2FB6FF] mb-3 flex items-center justify-center gap-2.5 font-semibold">
            <span className="w-5 h-[1.5px] bg-[#2FB6FF]" />
            Respuestas claras
            <span className="w-5 h-[1.5px] bg-[#2FB6FF]" />
          </div>

          <h2 className="font-display font-semibold text-[1.75rem] leading-[1.15] sm:text-4xl tracking-tight text-white">
            Preguntas frecuentes
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-[500px] mx-auto">
            Todo lo que necesitas saber antes de iniciar tu proceso de entrenamiento.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-white hover:text-[#9B5CFF] transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#9B5CFF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-white/70 leading-relaxed border-t border-white/5 animate-rise-in font-sans">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
