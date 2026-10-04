import React, { useState, useEffect, useRef } from 'react';
import { CoachConfig } from '../types';
import heroCoachImg from '../assets/images/hero_fitness_coach_1791084379541.jpg';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface HeroProps {
  config: CoachConfig;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onBookClick }) => {
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [clientsCount, setClientsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [consistencyCount, setConsistencyCount] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Stats counting animation
  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            animateValue(setClientsCount, config.activeClientsCount, 1200);
            animateValue(setYearsCount, config.experienceYears, 1000);
            animateValue(setConsistencyCount, config.consistencyPercentage, 1400);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [config]);

  const animateValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    target: number,
    duration: number
  ) => {
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setter(Math.round(easeProgress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // Parallax tilt on mouse hover
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({ x: x * -14, y: y * -10 });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ x: 0, y: 0 });
  };

  const handleWhatsAppClick = () => {
    const message = `Hola ${config.coachName}, estoy interesado en tu servicio de entrenamiento personal 1:1. ¿Podrías darme información para agendar mi sesión diagnóstica?`;
    window.open(`https://wa.me/${config.phoneWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* Copy Column */}
          <div className="flex flex-col">
            <div className="font-mono text-xs tracking-wider uppercase text-[#9B5CFF] mb-5 flex items-center gap-2.5 opacity-90">
              <span className="w-5 h-[1.5px] bg-[#9B5CFF] shadow-[0_0_8px_#9B5CFF]" />
              Coaching 1:1 · Presencial & Online
            </div>

            <h1 className="font-display font-semibold text-3xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-[-0.03em] text-white">
              No entrenas con una app.<br />
              Entrenas con{' '}
              <span className="bg-gradient-to-r from-[#9B5CFF] via-[#C24CE0] to-[#2FB6FF] bg-clip-text text-transparent">
                alguien que te conoce
              </span>.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/70 max-w-[480px]">
              Cada rutina, cada plan de alimentación y cada seguimiento están hechos a mano para tu anatomía. 
              La plataforma solo lo hace visible, ordenado y medible.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
              <button
                onClick={onBookClick}
                className="px-6 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_24px_rgba(155,92,255,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservar sesión</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="px-6 py-4 rounded-xl font-bold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#2FB6FF]" />
                <span>Escribir por WhatsApp</span>
              </button>
            </div>

            {/* Proof Counters */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-7 border-t border-white/10"
            >
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">
                  {clientsCount}
                </div>
                <div className="text-xs text-white/40 mt-1">clientes activos</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">
                  {yearsCount}
                </div>
                <div className="text-xs text-white/40 mt-1">años entrenando</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">
                  {consistencyCount}%
                </div>
                <div className="text-xs text-white/40 mt-1">constancia semanal</div>
              </div>
            </div>
          </div>

          {/* Photo Card Column */}
          <div className="relative">
            {/* Ambient Background Glow for Photo */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#9B5CFF]/30 via-[#C24CE0]/20 to-[#2FB6FF]/20 rounded-3xl blur-2xl -z-10" />

            <div
              ref={photoRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="relative h-[380px] sm:h-[480px] lg:h-[580px] rounded-2xl sm:rounded-[24px] overflow-hidden border border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group cursor-pointer"
            >
              <img
                src={heroCoachImg}
                alt={config.coachName}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{
                  transform: `scale(1.04) translate(${photoTilt.x}px, ${photoTilt.y}px)`,
                }}
              />

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0910] via-[#0A0910]/40 to-transparent pointer-events-none" />

              {/* Inner Frame Border */}
              <div className="absolute inset-0 rounded-[22px] border border-white/10 pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute left-5 right-5 bottom-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
                <div>
                  <div className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
                    {config.coachName}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-0.5">
                    {config.coachTitle}
                  </div>
                </div>

                <div className="font-mono text-[11px] tracking-wide flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-[#3EEB8C] shadow-[0_0_8px_#3EEB8C] animate-pulse-glow" />
                  <span>Disponible esta semana</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neon Underline Wave Decoration */}
        <div className="relative h-10 mt-8 w-full">
          <svg viewBox="0 0 1200 44" preserveAspectRatio="none" className="w-full h-full block">
            <defs>
              <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9B5CFF" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#9B5CFF" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#C24CE0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2FB6FF" stopOpacity="0.1" />
              </linearGradient>
              <filter id="neonBlur" x="-20%" y="-300%" width="140%" height="700%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,22 C300,22 320,4 600,4 C880,4 900,38 1200,38"
              fill="none"
              stroke="url(#neonGrad)"
              strokeWidth="2.5"
              filter="url(#neonBlur)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
