import React, { useState, useEffect, useRef } from 'react';
import { CoachConfig } from '../types';
import { Check, Calendar, TrendingUp, Dumbbell, Play, ArrowRight } from 'lucide-react';

interface PortalPreviewProps {
  config: CoachConfig;
}

type TabKey = 'hoy' | 'plan' | 'agenda' | 'progreso';

const TAB_CONFIGS: {
  key: TabKey;
  title: string;
  desc: string;
  accent: string;
}[] = [
  {
    key: 'hoy',
    title: 'Hoy',
    desc: 'Tu rutina activa y la próxima sesión programada.',
    accent: '#9B5CFF',
  },
  {
    key: 'plan',
    title: 'Mi plan',
    desc: 'Rutina de fuerza y plan nutricional en un solo lugar.',
    accent: '#2FB6FF',
  },
  {
    key: 'agenda',
    title: 'Agenda',
    desc: 'Horarios publicados en vivo, listos para confirmar.',
    accent: '#7A47D6',
  },
  {
    key: 'progreso',
    title: 'Progreso',
    desc: 'Peso, medidas corporales y evolución gráfica.',
    accent: '#1C4ED8',
  },
];

export const PortalPreview: React.FC<PortalPreviewProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('hoy');
  const [isPaused, setIsPaused] = useState(false);
  const [phoneTilt, setPhoneTilt] = useState({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [miniPlanMode, setMiniPlanMode] = useState<'training' | 'nutrition'>('training');
  const [agendaFilter, setAgendaFilter] = useState<'all' | 'Presencial' | 'Online' | 'Nutrición'>('all');
  const [visibleMetrics, setVisibleMetrics] = useState<{ peso: boolean; cintura: boolean }>({
    peso: true,
    cintura: true,
  });

  // Checklist of exercises in phone
  const [phoneExercises, setPhoneExercises] = useState([
    { name: 'Press banca plano con barra', sets: '4 × 8', done: false },
    { name: 'Remo con mancuerna unilateral', sets: '4 × 10', done: false },
    { name: 'Press militar con mancuernas', sets: '3 × 10', done: false },
  ]);

  // Reserved sessions in phone
  const [reservedSessions, setReservedSessions] = useState<{ [id: string]: boolean }>({
    'ses-3': true, // Online on wednesday is confirmed initially
  });

  const phoneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Solo avanza solo cuando la sección está a la vista y el usuario no pidió menos movimiento
  const [inView, setInView] = useState(false);
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tab auto-play timer (2.8s per tab)
  useEffect(() => {
    if (isPaused || !inView || reducedMotion) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TAB_CONFIGS.findIndex((t) => t.key === prev);
        const nextIdx = (idx + 1) % TAB_CONFIGS.length;
        return TAB_CONFIGS[nextIdx].key;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused, inView, reducedMotion]);

  // Mouse tilt on phone
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhoneTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setPhoneTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      const idx = TAB_CONFIGS.findIndex((t) => t.key === activeTab);
      if (diff < 0) {
        // swipe left -> next tab
        const next = (idx + 1) % TAB_CONFIGS.length;
        setActiveTab(TAB_CONFIGS[next].key);
      } else {
        // swipe right -> previous tab
        const prev = (idx - 1 + TAB_CONFIGS.length) % TAB_CONFIGS.length;
        setActiveTab(TAB_CONFIGS[prev].key);
      }
    }
    setTouchStartX(null);
  };

  const togglePhoneExercise = (index: number) => {
    setPhoneExercises((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, done: !ex.done } : ex))
    );
  };

  const completedCount = phoneExercises.filter((ex) => ex.done).length;
  const progressPercent = Math.round((completedCount / phoneExercises.length) * 100);

  const activeAccent = TAB_CONFIGS.find((t) => t.key === activeTab)?.accent || '#9B5CFF';
  const tabIndex = TAB_CONFIGS.findIndex((t) => t.key === activeTab);

  return (
    <section id="portal" className="bg-[#F5F6FA] text-[#12141B] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-xs tracking-wider uppercase text-[#7A47D6] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#7A47D6]" />
          Por dentro
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-tight max-w-[680px] text-[#12141B]">
          Así se organiza tu semana de entrenamiento, nutrición y seguimiento.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5B6172] max-w-[580px] leading-relaxed">
          Un vistazo a la experiencia fluida y privada que tienes disponible desde cualquier dispositivo móvil como cliente.
        </p>

        {/* Mobile quick tabs bar (visible only on small screens for fast one-tap switching) */}
        <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 mt-6 mb-2 no-scrollbar">
          {TAB_CONFIGS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setIsPaused(true);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0 transition-all ${
                activeTab === tab.key
                  ? 'bg-[#12141B] text-white shadow-sm'
                  : 'bg-white text-[#5B6172] border border-[#E1E3EC]'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Layout Grid */}
        <div
          ref={stageRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-center mt-4 sm:mt-10 lg:mt-16"
        >
          {/* Interactive Tab List (Desktop) */}
          <div className="hidden lg:flex flex-col gap-3">
            {TAB_CONFIGS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setIsPaused(true);
                  }}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#E1E3EC] shadow-[0_8px_24px_rgba(20,20,40,0.06)]'
                      : 'bg-transparent border-transparent hover:bg-[#7A47D6]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive ? 'bg-[#7A47D6] shadow-[0_0_8px_rgba(122,71,214,0.6)]' : 'bg-[#D7DAE3]'
                      }`}
                    />
                    <span className={`font-display font-semibold text-base sm:text-lg ${isActive ? 'text-[#7A47D6]' : 'text-[#12141B]'}`}>
                      {tab.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B6172] mt-1.5 pl-4.5 leading-relaxed">
                    {tab.desc}
                  </p>

                  {/* Progress Line on Active Tab */}
                  {isActive && (
                    <div className="absolute left-5 right-5 bottom-1 h-0.5 bg-[#EDEEF3] rounded-full overflow-hidden">
                      <div
                        key={activeTab}
                        className={`h-full w-full bg-gradient-to-r from-[#7A47D6] to-[#2FB6FF] rounded-full ${reducedMotion ? '' : 'tab-progress-bar'}`}
                        style={{ animationPlayState: isPaused || !inView ? 'paused' : 'running' }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Phone Mockup */}
          <div
            onMouseMove={handleMouseMove}
            className="relative flex justify-center items-center py-4"
          >
            {/* Dynamic Glow Behind Phone */}
            <div
              className="absolute w-[320px] h-[460px] rounded-full blur-[64px] opacity-35 transition-colors duration-700 pointer-events-none -z-0"
              style={{ background: activeAccent }}
            />

            {/* Contextual Floating Annotations (Desktop only) */}
            <div className="hidden xl:block absolute right-[-10px] top-[14%] max-w-[170px] text-[11px] font-mono text-[#5B6172] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A47D6] inline-block mr-1.5" />
              Sincronización en vivo con tu entrenador
              <div className="w-8 h-[1px] bg-slate-300 border-b border-dashed my-1.5" />
            </div>

            <div className="hidden xl:block absolute left-[-15px] bottom-[12%] max-w-[170px] text-[11px] font-mono text-[#5B6172] text-right pointer-events-none">
              Control de series, RIR y volumen semanal
              <div className="w-8 h-[1px] bg-slate-300 border-b border-dashed my-1.5 ml-auto" />
            </div>

            {/* Phone Frame */}
            <div
              ref={phoneRef}
              className="w-[290px] sm:w-[310px] bg-[#0A0910] rounded-[40px] p-3 sm:p-3.5 shadow-[0_30px_60px_-15px_rgba(20,10,40,0.4),0_0_0_1px_rgba(0,0,0,0.1)] relative z-10 transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${phoneTilt.x}deg) rotateX(${phoneTilt.y}deg)`,
              }}
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0A0910] rounded-b-xl z-30" />

              {/* Phone Screen */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="bg-white rounded-[30px] overflow-hidden h-[540px] sm:h-[560px] flex flex-col relative select-none"
              >
                {/* Status Bar */}
                <div className="flex justify-between items-center px-5 pt-3.5 pb-2 text-[10px] font-mono text-[#12141B] shrink-0">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2 rounded-sm border border-current" />
                    <span>5G</span>
                  </div>
                </div>

                {/* Sliding Panes Content */}
                <div className="flex-1 relative overflow-hidden">
                  <div
                    className="flex h-full w-[400%] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{ transform: `translateX(-${tabIndex * 25}%)` }}
                  >
                    {/* ================= PANE 1: HOY ================= */}
                    <div className="w-[25%] shrink-0 p-4 overflow-y-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-display font-semibold text-base text-[#12141B] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#3EEB8C] shadow-[0_0_6px_#3EEB8C] animate-pulse-glow" />
                          <span>Hoy · Jueves 18</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#7A47D6] font-semibold bg-[#7A47D6]/10 px-2 py-0.5 rounded-full">
                          Semana 4
                        </span>
                      </div>

                      {/* Streak Row */}
                      <div className="flex items-center justify-between p-2.5 bg-[#F5F6FA] border border-[#E1E3EC] rounded-xl mb-3">
                        <div>
                          <div className="text-xs font-bold text-[#12141B]">
                            <span className="text-[#9B5CFF]">3 días</span> de racha
                          </div>
                          <div className="text-[9px] font-mono text-[#9AA0AE]">Constancia impecable</div>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((d) => (
                            <span key={d} className="w-4 h-4 rounded-md bg-gradient-to-tr from-[#9B5CFF] to-[#C24CE0] text-[9px] text-white flex items-center justify-center font-bold">
                              ✓
                            </span>
                          ))}
                          <span className="w-4 h-4 rounded-md border border-[#7A47D6] bg-white text-[9px] text-[#7A47D6] flex items-center justify-center font-bold">
                            J
                          </span>
                          {[5, 6, 7].map((d) => (
                            <span key={d} className="w-4 h-4 rounded-md bg-slate-200" />
                          ))}
                        </div>
                      </div>

                      {/* Today Routine Card */}
                      <div className="bg-gradient-to-br from-[#7A47D6]/10 via-[#2FB6FF]/5 to-transparent border border-[#EDE4FB] rounded-xl p-3.5">
                        <div className="text-[9px] font-mono text-[#7A47D6] font-semibold uppercase tracking-wider">
                          Rutina del día
                        </div>
                        <div className="font-display font-bold text-sm text-[#12141B] mt-0.5">
                          Tren superior completo
                        </div>
                        <div className="text-[10px] text-[#5B6172] mt-0.5">
                          5 ejercicios · 45 min aprox.
                        </div>

                        {/* Interactive Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#9B5CFF] to-[#2FB6FF] transition-all duration-300 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#9AA0AE] mt-1.5">
                          <span>Progreso de series</span>
                          <span className="font-semibold text-[#7A47D6]">
                            {completedCount} / {phoneExercises.length} completados
                          </span>
                        </div>

                        {/* Exercise Checklist */}
                        <div className="flex flex-col gap-1.5 mt-2.5">
                          {phoneExercises.map((ex, i) => (
                            <div
                              key={i}
                              onClick={() => togglePhoneExercise(i)}
                              className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer ${
                                ex.done
                                  ? 'bg-slate-50 border-slate-200 text-[#9AA0AE]'
                                  : 'bg-white border-[#E1E3EC] text-[#12141B] hover:border-[#7A47D6]'
                              }`}
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  ex.done
                                    ? 'bg-[#7A47D6] border-[#7A47D6] text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {ex.done && <Check className="w-2 h-2 stroke-[3]" />}
                              </span>
                              <span className={`text-[11px] font-semibold flex-1 truncate ${ex.done ? 'line-through' : ''}`}>
                                {ex.name}
                              </span>
                              <span className="font-mono text-[9px] text-[#9AA0AE]">{ex.sets}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next Session Row */}
                      <div className="mt-3 p-2.5 bg-white border border-[#EDEEF3] rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="font-mono text-[9px] text-[#7A47D6] font-semibold">PRÓXIMA SESIÓN</div>
                          <div className="font-semibold text-[#12141B] text-[11px] mt-0.5">Vie 19 · 08:30 · Asesoría</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>

                    {/* ================= PANE 2: PLAN ================= */}
                    <div className="w-[25%] shrink-0 p-4 overflow-y-auto">
                      <div className="font-display font-semibold text-base text-[#12141B] mb-2.5">
                        Tu plan activo
                      </div>

                      {/* Days selector */}
                      <div className="flex gap-1 mb-3">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
                          <div
                            key={i}
                            className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[9px] border ${
                              d === 'J'
                                ? 'bg-[#12141B] text-white border-[#12141B] font-bold'
                                : 'bg-[#F5F6FA] text-[#9AA0AE] border-[#E1E3EC]'
                            }`}
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Mini Toggle */}
                      <div className="inline-flex p-0.5 bg-[#F5F6FA] border border-[#E1E3EC] rounded-lg mb-3 w-full">
                        <button
                          onClick={() => setMiniPlanMode('training')}
                          className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-colors ${
                            miniPlanMode === 'training' ? 'bg-[#12141B] text-white' : 'text-[#5B6172]'
                          }`}
                        >
                          Entreno
                        </button>
                        <button
                          onClick={() => setMiniPlanMode('nutrition')}
                          className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-colors ${
                            miniPlanMode === 'nutrition' ? 'bg-[#12141B] text-white' : 'text-[#5B6172]'
                          }`}
                        >
                          Nutrición
                        </button>
                      </div>

                      {miniPlanMode === 'training' ? (
                        <div className="flex flex-col gap-2">
                          <div className="bg-white border border-[#E1E3EC] rounded-xl p-3">
                            <div className="text-[9px] font-mono text-[#7A47D6] font-bold">JUEVES · HIPERTROFIA</div>
                            <div className="text-xs font-bold text-[#12141B] mt-0.5">Empujes y Tracciones</div>

                            {/* Video Teaser */}
                            <div className="mt-2.5 p-2 bg-[#F5F6FA] rounded-lg flex items-center gap-2 border border-[#E1E3EC]">
                              <div className="w-8 h-8 rounded-md bg-[#12141B] flex items-center justify-center shrink-0">
                                <Play className="w-3.5 h-3.5 text-white fill-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-bold text-[#12141B] truncate">Video técnica del día</div>
                                <div className="text-[8px] font-mono text-[#7A47D6]">Grabado por tu coach</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[9px] font-mono text-[#9AA0AE] text-center">4 sesiones semanales pautadas</div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="bg-white border border-[#E1E3EC] rounded-xl p-3 flex flex-col gap-2">
                            <div className="text-[8px] font-mono text-[#7A47D6] font-bold">ACTUALIZADO HACE 2 DÍAS</div>
                            <div className="border-b border-slate-100 pb-1.5">
                              <div className="text-[10px] font-bold text-[#12141B]">Desayuno</div>
                              <div className="text-[9px] text-[#5B6172]">Omelette 3 claras + 1 huevo, avena con frutos rojos</div>
                            </div>
                            <div className="border-b border-slate-100 pb-1.5">
                              <div className="text-[10px] font-bold text-[#12141B]">Comida</div>
                              <div className="text-[9px] text-[#5B6172]">Pechuga de pavo, arroz jazmín, espárragos y AOVE</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-[#12141B]">Cena</div>
                              <div className="text-[9px] text-[#5B6172]">Salmón al horno + ensalada tibia de quinoa</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ================= PANE 3: AGENDA ================= */}
                    <div className="w-[25%] shrink-0 p-4 overflow-y-auto">
                      <div className="font-display font-semibold text-base text-[#12141B] mb-2.5">
                        Agenda de sesiones
                      </div>

                      {/* Filter chips */}
                      <div className="flex gap-1 mb-3 flex-wrap">
                        {(['all', 'Presencial', 'Online', 'Nutrición'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setAgendaFilter(filter)}
                            className={`px-2 py-1 rounded-full text-[9px] font-bold border transition-colors ${
                              agendaFilter === filter
                                ? 'bg-[#12141B] text-white border-[#12141B]'
                                : 'bg-white text-[#5B6172] border-[#E1E3EC]'
                            }`}
                          >
                            {filter === 'all' ? 'Todas' : filter}
                          </button>
                        ))}
                      </div>

                      {/* Sessions List */}
                      <div className="flex flex-col gap-2">
                        {(agendaFilter === 'all' || agendaFilter === 'Nutrición') && (
                          <div className="p-2.5 bg-white border border-[#E1E3EC] rounded-xl flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-[#0A0910] text-white flex flex-col items-center justify-center font-mono text-[9px] font-bold shrink-0">
                              <span>VIE</span>
                              <span>19</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-[#12141B]">08:30 — Asesoría</div>
                              <div className="text-[9px] text-[#7A47D6] font-mono">Nutrición</div>
                            </div>
                            <button
                              onClick={() => setReservedSessions((prev) => ({ ...prev, 'ses-1': true }))}
                              className={`px-2.5 py-1 rounded-md text-[9px] font-bold font-mono transition-colors ${
                                reservedSessions['ses-1']
                                  ? 'bg-[#7A47D6] text-white'
                                  : 'bg-[#7A47D6]/10 text-[#7A47D6] hover:bg-[#7A47D6]/20'
                              }`}
                            >
                              {reservedSessions['ses-1'] ? 'Confirmada' : 'Reservar'}
                            </button>
                          </div>
                        )}

                        {(agendaFilter === 'all' || agendaFilter === 'Presencial') && (
                          <div className="p-2.5 bg-white border border-[#E1E3EC] rounded-xl flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-[#0A0910] text-white flex flex-col items-center justify-center font-mono text-[9px] font-bold shrink-0">
                              <span>LUN</span>
                              <span>22</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-[#12141B]">10:00 — Fuerza</div>
                              <div className="text-[9px] text-[#2FB6FF] font-mono">Presencial</div>
                            </div>
                            <button
                              onClick={() => setReservedSessions((prev) => ({ ...prev, 'ses-2': true }))}
                              className={`px-2.5 py-1 rounded-md text-[9px] font-bold font-mono transition-colors ${
                                reservedSessions['ses-2']
                                  ? 'bg-[#7A47D6] text-white'
                                  : 'bg-[#7A47D6]/10 text-[#7A47D6] hover:bg-[#7A47D6]/20'
                              }`}
                            >
                              {reservedSessions['ses-2'] ? 'Confirmada' : 'Reservar'}
                            </button>
                          </div>
                        )}

                        {(agendaFilter === 'all' || agendaFilter === 'Online') && (
                          <div className="p-2.5 bg-white border border-[#E1E3EC] rounded-xl flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-[#0A0910] text-white flex flex-col items-center justify-center font-mono text-[9px] font-bold shrink-0">
                              <span>MIÉ</span>
                              <span>24</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-[#12141B]">18:00 — Live 1:1</div>
                              <div className="text-[9px] text-[#C24CE0] font-mono">Online</div>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-mono text-[9px] font-bold">
                              Confirmada
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ================= PANE 4: PROGRESO ================= */}
                    <div className="w-[25%] shrink-0 p-4 overflow-y-auto">
                      <div className="font-display font-semibold text-base text-[#12141B] mb-2">
                        Tu evolución
                      </div>

                      {/* Metric Toggles */}
                      <div className="flex gap-1.5 mb-2.5">
                        <button
                          onClick={() => setVisibleMetrics((m) => ({ ...m, peso: !m.peso }))}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold border transition-all ${
                            visibleMetrics.peso
                              ? 'bg-white text-[#7A47D6] border-[#7A47D6]'
                              : 'bg-slate-100 text-slate-400 border-transparent opacity-60'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A47D6]" />
                          Peso (-3.3 kg)
                        </button>
                        <button
                          onClick={() => setVisibleMetrics((m) => ({ ...m, cintura: !m.cintura }))}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold border transition-all ${
                            visibleMetrics.cintura
                              ? 'bg-white text-[#2FB6FF] border-[#2FB6FF]'
                              : 'bg-slate-100 text-slate-400 border-transparent opacity-60'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2FB6FF]" />
                          Cintura (-4 cm)
                        </button>
                      </div>

                      {/* Metric Values */}
                      <div className="bg-white border border-[#E1E3EC] rounded-xl p-3 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-1.5">
                          <span className="text-[#5B6172]">Peso corporal</span>
                          <span className="font-mono font-bold text-[#12141B]">
                            65.1 kg <span className="text-[#1C4ED8] text-[10px]">↓3.3</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#5B6172]">Perímetro cintura</span>
                          <span className="font-mono font-bold text-[#12141B]">
                            71.0 cm <span className="text-[#2FB6FF] text-[10px]">↓4.0</span>
                          </span>
                        </div>

                        {/* Chart */}
                        <div className="h-20 w-full pt-1">
                          <svg viewBox="0 0 240 60" preserveAspectRatio="none" className="w-full h-full">
                            <defs>
                              <linearGradient id="chartG1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7A47D6" />
                                <stop offset="100%" stopColor="#9B5CFF" />
                              </linearGradient>
                            </defs>
                            {visibleMetrics.peso && (
                              <polyline
                                points="0,48 45,44 90,50 135,32 180,28 240,12"
                                fill="none"
                                stroke="url(#chartG1)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {visibleMetrics.cintura && (
                              <polyline
                                points="0,26 45,30 90,24 135,36 180,22 240,40"
                                fill="none"
                                stroke="#2FB6FF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.75"
                              />
                            )}
                          </svg>
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-[#9AA0AE] text-center mt-2">
                        Última calibración por {config.coachName} · hace 2 días
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sychronized Phone Bottom Nav */}
                <div className="border-t border-[#EDEEF3] bg-white px-2 py-2 flex items-center justify-around shrink-0">
                  <button
                    onClick={() => setActiveTab('hoy')}
                    className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
                      activeTab === 'hoy' ? 'text-[#7A47D6]' : 'text-slate-400'
                    }`}
                  >
                    <Dumbbell className="w-4 h-4" />
                    <span className="font-mono text-[8px] font-bold">HOY</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('plan')}
                    className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
                      activeTab === 'plan' ? 'text-[#7A47D6]' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-4 h-4 border border-current rounded-sm flex items-center justify-center text-[7px] font-bold">P</span>
                    <span className="font-mono text-[8px] font-bold">PLAN</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('agenda')}
                    className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
                      activeTab === 'agenda' ? 'text-[#7A47D6]' : 'text-slate-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-[8px] font-bold">AGENDA</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('progreso')}
                    className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
                      activeTab === 'progreso' ? 'text-[#7A47D6]' : 'text-slate-400'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-mono text-[8px] font-bold">PROGR.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
