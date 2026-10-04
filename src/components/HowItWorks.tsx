import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { CoachConfig } from '../types';

interface HowItWorksProps {
  config: CoachConfig;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ config }) => {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [exercises, setExercises] = useState([
    { name: 'Sentadilla búlgara con mancuerna', meta: '4 × 10 reps (RIR 2)', done: true },
    { name: 'Press militar con mancuernas', meta: '3 × 8 reps (RIR 1)', done: true },
    { name: 'Remo con barra agarre prono', meta: '4 × 10 reps (RIR 2)', done: false },
  ]);

  const toggleExercise = (index: number) => {
    setExercises((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, done: !ex.done } : ex))
    );
  };

  return (
    <section id="como-funciona" className="bg-white text-[#12141B] py-20 sm:py-28 relative">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-xs tracking-wider uppercase text-[#7A47D6] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#7A47D6]" />
          Cómo funciona
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-tight max-w-[680px] text-[#12141B]">
          Tres pasos entre tu objetivo y tu progreso — sin intermediarios ni desorden.
        </h2>

        {/* Steps Grid */}
        <div className="relative mt-14 sm:mt-20">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-[1.5px] bg-gradient-to-r from-[#E1E3EC] via-[#D9BFFF] to-[#E1E3EC] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Step 1 */}
            <div
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
              className={`group p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                activeStep === 1
                  ? 'border-[#7A47D6] shadow-[0_12px_32px_rgba(122,71,214,0.12)]'
                  : 'border-[#E1E3EC] hover:border-slate-300'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center font-mono text-sm font-semibold mb-6 transition-all ${
                  activeStep === 1
                    ? 'bg-[#7A47D6] text-white border-[#7A47D6] shadow-[0_0_0_5px_rgba(122,71,214,0.14)]'
                    : 'bg-white text-[#7A47D6] border-[#7A47D6] group-hover:bg-[#7A47D6]/10'
                }`}
              >
                01
              </div>

              <h3 className="font-display font-semibold text-xl mb-2 text-[#12141B]">
                Tu plan, hecho a mano
              </h3>
              <p className="text-sm leading-relaxed text-[#5B6172]">
                {config.coachName} diseña tu rutina y tu guía nutricional según tu anatomía y objetivo real, no una plantilla automatizada.
              </p>

              <div className="font-mono text-xs text-[#7A47D6] mt-4 flex items-center gap-1.5 font-medium">
                <span>{activeStep === 1 ? 'Ocultar ejemplo' : 'Ver ejemplo interactivo'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeStep === 1 ? 'rotate-180' : ''}`} />
              </div>

              {/* Artifact 1: Routine */}
              {activeStep === 1 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 p-3.5 bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl flex flex-col gap-2 transition-all animate-rise-in"
                >
                  <div className="text-[10px] font-mono text-[#7A47D6] font-semibold uppercase tracking-wider mb-0.5">
                    Ejemplo de rutina asignada
                  </div>
                  {exercises.map((ex, i) => (
                    <div
                      key={i}
                      onClick={() => toggleExercise(i)}
                      className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors cursor-pointer select-none ${
                        ex.done ? 'bg-white/80' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                          ex.done
                            ? 'bg-[#7A47D6] border-[#7A47D6] text-white'
                            : 'border-[#7A47D6] bg-transparent'
                        }`}
                      >
                        {ex.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold truncate ${ex.done ? 'text-[#9AA0AE] line-through' : 'text-[#12141B]'}`}>
                          {ex.name}
                        </div>
                        <div className="font-mono text-[10px] text-[#9AA0AE]">{ex.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
              className={`group p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                activeStep === 2
                  ? 'border-[#7A47D6] shadow-[0_12px_32px_rgba(122,71,214,0.12)]'
                  : 'border-[#E1E3EC] hover:border-slate-300'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center font-mono text-sm font-semibold mb-6 transition-all ${
                  activeStep === 2
                    ? 'bg-[#7A47D6] text-white border-[#7A47D6] shadow-[0_0_0_5px_rgba(122,71,214,0.14)]'
                    : 'bg-white text-[#7A47D6] border-[#7A47D6] group-hover:bg-[#7A47D6]/10'
                }`}
              >
                02
              </div>

              <h3 className="font-display font-semibold text-xl mb-2 text-[#12141B]">
                Todo en tu portal privado
              </h3>
              <p className="text-sm leading-relaxed text-[#5B6172]">
                Rutina, nutrición, agenda de sesiones en vivo y material educativo, siempre sincronizados y a un toque en tu teléfono.
              </p>

              <div className="font-mono text-xs text-[#7A47D6] mt-4 flex items-center gap-1.5 font-medium">
                <span>{activeStep === 2 ? 'Ocultar módulos' : 'Ver módulos integrados'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeStep === 2 ? 'rotate-180' : ''}`} />
              </div>

              {/* Artifact 2: Modules Grid */}
              {activeStep === 2 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 p-3 bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl grid grid-cols-2 gap-2 animate-rise-in"
                >
                  <div className="bg-white p-2.5 rounded-lg border border-[#E1E3EC] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#9B5CFF] to-[#C24CE0] shrink-0" />
                    <span className="font-mono text-xs font-semibold text-[#12141B]">Rutina diaria</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E1E3EC] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#2FB6FF] to-[#7A47D6] shrink-0" />
                    <span className="font-mono text-xs font-semibold text-[#12141B]">Nutrición</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E1E3EC] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#7A47D6] to-[#C24CE0] shrink-0" />
                    <span className="font-mono text-xs font-semibold text-[#12141B]">Agenda viva</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#E1E3EC] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#1C4ED8] to-[#2FB6FF] shrink-0" />
                    <span className="font-mono text-xs font-semibold text-[#12141B]">Evolución</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
              className={`group p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                activeStep === 3
                  ? 'border-[#7A47D6] shadow-[0_12px_32px_rgba(122,71,214,0.12)]'
                  : 'border-[#E1E3EC] hover:border-slate-300'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center font-mono text-sm font-semibold mb-6 transition-all ${
                  activeStep === 3
                    ? 'bg-[#7A47D6] text-white border-[#7A47D6] shadow-[0_0_0_5px_rgba(122,71,214,0.14)]'
                    : 'bg-white text-[#7A47D6] border-[#7A47D6] group-hover:bg-[#7A47D6]/10'
                }`}
              >
                03
              </div>

              <h3 className="font-display font-semibold text-xl mb-2 text-[#12141B]">
                Progreso visible y ajuste continuo
              </h3>
              <p className="text-sm leading-relaxed text-[#5B6172]">
                Registras peso, medidas y sensaciones. Tu coach analiza tu tendencia y calibra las cargas con datos objetivos, no adivinando.
              </p>

              <div className="font-mono text-xs text-[#7A47D6] mt-4 flex items-center gap-1.5 font-medium">
                <span>{activeStep === 3 ? 'Ocultar métricas' : 'Ver gráfica de tendencia'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeStep === 3 ? 'rotate-180' : ''}`} />
              </div>

              {/* Artifact 3: Progress Chart */}
              {activeStep === 3 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 p-3.5 bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl flex flex-col gap-2 animate-rise-in"
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#5B6172]">Evolución 8 semanas</span>
                    <span className="text-[#1C4ED8] font-bold">↓ 3.3 kg masa grasa</span>
                  </div>
                  <div className="h-14 w-full pt-2">
                    <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-full">
                      <defs>
                        <linearGradient id="stepChart" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7A47D6" />
                          <stop offset="100%" stopColor="#2FB6FF" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points="0,38 35,35 70,40 105,24 140,26 175,14 200,8"
                        fill="none"
                        stroke="url(#stepChart)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA0AE] pt-1 border-t border-[#E1E3EC]">
                    <span>Inicio: 68.4 kg</span>
                    <span>Actual: 65.1 kg</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
