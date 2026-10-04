import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { CoachConfig } from '../types';

interface HowItWorksProps {
  config: CoachConfig;
}

type Exercise = { name: string; meta: string; done: boolean };

const MODULES = [
  { label: 'Rutina', from: '#9B5CFF', to: '#C24CE0' },
  { label: 'Nutrición', from: '#2FB6FF', to: '#7A47D6' },
  { label: 'Agenda', from: '#7A47D6', to: '#C24CE0' },
  { label: 'Progreso', from: '#1C4ED8', to: '#2FB6FF' },
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ config }) => {
  // Un solo paso abierto a la vez. Con mouse también se abre al pasar el cursor (CSS).
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'Sentadilla búlgara', meta: '4×10', done: true },
    { name: 'Press militar', meta: '3×8', done: true },
    { name: 'Remo con barra', meta: '4×10', done: false },
  ]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleExercise = (i: number) =>
    setExercises((prev) => prev.map((ex, idx) => (idx === i ? { ...ex, done: !ex.done } : ex)));

  const steps = [
    {
      title: 'Tu plan, hecho a mano',
      text: `${config.coachName} diseña tu rutina y tu plan nutricional según tu objetivo real, no una plantilla genérica.`,
      hint: 'Ver ejemplo',
      artifact: (
        <div className="bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl p-3 flex flex-col gap-1">
          {exercises.map((ex, i) => (
            <button
              key={ex.name}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExercise(i);
              }}
              className="flex items-center gap-2.5 py-2 px-1 text-left rounded-lg min-h-11 w-full active:bg-white"
              aria-pressed={ex.done}
            >
              <span
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] border-[#7A47D6] flex items-center justify-center shrink-0 transition-colors ${
                  ex.done ? 'bg-[#7A47D6] text-white' : 'bg-transparent'
                }`}
              >
                {ex.done && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
              <span className={`flex-1 min-w-0 text-[13px] truncate ${ex.done ? 'text-[#9AA0AE] line-through' : 'text-[#33353E]'}`}>
                {ex.name}
              </span>
              <span className="font-mono text-[11px] text-[#9AA0AE]">{ex.meta}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Todo en tu portal',
      text: 'Rutina, nutrición, agenda de sesiones y material educativo, siempre actualizados y a un toque.',
      hint: 'Ver módulos',
      artifact: (
        <div className="grid grid-cols-4 gap-2">
          {MODULES.map((m) => (
            <div
              key={m.label}
              className="bg-[#F5F6FA] border border-[#E1E3EC] rounded-[10px] py-2.5 px-1 flex flex-col items-center gap-1.5 font-mono text-[10px] text-[#5B6172] text-center"
            >
              <span className="w-4 h-4 rounded-[5px]" style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }} />
              {m.label}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Progreso visible',
      text: 'Registras peso, medidas y fotos. Tu coach los revisa y ajusta tu plan con datos reales, no adivinando.',
      hint: 'Ver tendencia',
      artifact: (
        <div className="bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl px-3.5 pt-3 pb-2.5">
          <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-11 block" aria-hidden="true">
            <defs>
              <linearGradient id="howChart" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7A47D6" />
                <stop offset="100%" stopColor="#2FB6FF" />
              </linearGradient>
            </defs>
            <polyline
              points="0,38 40,34 80,40 120,18 160,24 200,8"
              fill="none"
              stroke="url(#howChart)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="how-chart-line"
            />
          </svg>
          <div className="flex justify-between font-mono text-[11px] text-[#5B6172] mt-1">
            <span>68.4 kg → 65.1 kg</span>
            <span className="font-semibold text-[#1C4ED8]">↓ 3.3</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="como-funciona" className="bg-white text-[#12141B] py-16 sm:py-24 lg:py-28 relative">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-xs tracking-wider uppercase text-[#7A47D6] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#7A47D6]" />
          Cómo funciona
        </div>

        <h2 className="font-display font-semibold text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[42px] tracking-tight max-w-[680px] text-[#12141B]">
          Tres pasos entre tu objetivo y tu progreso, sin nada de por medio.
        </h2>

        <div
          ref={gridRef}
          className={`relative mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-0 ${inView ? 'steps-in-view' : ''}`}
        >
          {/* Línea de conexión + pulso viajero (solo escritorio) */}
          <div className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-px bg-gradient-to-r from-[#E1E3EC] via-[#D9BFFF] to-[#E1E3EC] pointer-events-none" />
          <span className="steps-pulse hidden lg:block absolute top-[19px] left-[8%] w-1.5 h-1.5 rounded-full bg-[#7A47D6] shadow-[0_0_10px_2px_rgba(122,71,214,0.55)] pointer-events-none" />

          {steps.map((step, i) => {
            const n = i + 1;
            const open = activeStep === n;
            return (
              <div
                key={step.title}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={() => setActiveStep(open ? null : n)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(open ? null : n);
                  }
                }}
                className="group relative flex lg:block gap-4 lg:gap-0 lg:pr-8 cursor-pointer select-none outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-[#7A47D6] focus-visible:ring-offset-4 transition-transform duration-300 lg:hover:-translate-y-0.5"
              >
                {/* Número */}
                <div
                  className={`relative z-10 w-11 h-11 shrink-0 rounded-full border-[1.5px] border-[#7A47D6] flex items-center justify-center font-mono text-[13px] font-semibold lg:mb-6 transition-all duration-300 ${
                    open
                      ? 'bg-[#7A47D6] text-white shadow-[0_0_0_5px_rgba(122,71,214,0.14)]'
                      : 'bg-white text-[#7A47D6] group-hover:bg-[#7A47D6] group-hover:text-white group-hover:shadow-[0_0_0_5px_rgba(122,71,214,0.14)]'
                  }`}
                >
                  {String(n).padStart(2, '0')}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-semibold text-lg sm:text-xl mb-2 text-[#12141B]">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#5B6172] max-w-[320px]">{step.text}</p>

                  <div className="font-mono text-xs text-[#7A47D6] mt-3 flex items-center gap-1.5 font-medium min-h-6">
                    <span>{step.hint}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : 'group-hover:rotate-180'}`}
                    />
                  </div>

                  {/* Se despliega sin mover el resto de la página bruscamente */}
                  <div
                    data-open={open}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out max-w-[320px] ${
                      open
                        ? 'grid-rows-[1fr] opacity-100 mt-3 how-open'
                        : 'grid-rows-[0fr] opacity-0 mt-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-3 group-hover:how-open'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">{step.artifact}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
