import React, { useState } from 'react';
import { CoachConfig, DaySchedule, SessionType } from '../types';
import { INITIAL_SCHEDULE } from '../data/defaultConfig';
import { Calendar, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

interface BookingWidgetProps {
  config: CoachConfig;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ config }) => {
  const [schedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedSlot, setSelectedSlot] = useState<{
    dayLabel: string;
    dayNum: number;
    time: string;
  } | null>({
    dayLabel: 'MIÉ',
    dayNum: 17,
    time: '12:00',
  });
  const [sessionType, setSessionType] = useState<SessionType>('Presencial');
  const [bookedConfirmation, setBookedConfirmation] = useState(false);

  const handleSelectSlot = (dayLabel: string, dayNum: number, time: string) => {
    setSelectedSlot({ dayLabel, dayNum, time });
    setBookedConfirmation(false);
  };

  const handleConfirmWhatsApp = () => {
    if (!selectedSlot) return;
    const message = `Hola ${config.coachName}, quiero agendar mi sesión ${sessionType.toLowerCase()} el ${selectedSlot.dayLabel} ${selectedSlot.dayNum} a las ${selectedSlot.time}. ✅ ¿Me confirmas disponibilidad?`;
    window.open(`https://wa.me/${config.phoneWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
    setBookedConfirmation(true);
  };

  return (
    <section id="agenda" className="bg-[#F5F6FA] text-[#12141B] py-20 sm:py-28 relative">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-xs tracking-wider uppercase text-[#7A47D6] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#7A47D6]" />
          Pieza clave
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-tight max-w-[720px] text-[#12141B]">
          Reserva tu sesión en tiempo real, sin preguntar por WhatsApp qué horarios hay libres.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5B6172] max-w-[620px] leading-relaxed">
          Los horarios disponibles se publican semana a semana. Tú eliges el que se adapta a tu rutina, confirmas con un toque y queda registrado en tu portal.
        </p>

        {/* Main Booking Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mt-12 items-start">
          {/* Calendar Grid Card */}
          <div className="bg-white border border-[#E1E3EC] rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EDEEF3]">
              <div className="flex items-center gap-2 font-display font-semibold text-base sm:text-lg text-[#12141B]">
                <Calendar className="w-5 h-5 text-[#7A47D6]" />
                <span>Horarios disponibles esta semana</span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono text-[#5B6172]">
                <span className="flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#7A47D6] bg-white inline-block" />
                  Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#E1E3EC] inline-block" />
                  Ocupado
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#9B5CFF] to-[#C24CE0] inline-block" />
                  Elegido
                </span>
              </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-[#7A47D6] mb-2 px-1">
              <span>← Desliza para ver todos los días →</span>
              <span>7 días</span>
            </div>

            {/* Calendar Days */}
            <div className="flex sm:grid sm:grid-cols-7 gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory">
              {schedule.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-0 shrink-0 sm:shrink snap-start">
                  <span className="font-mono text-[11px] text-[#9AA0AE] uppercase font-semibold">
                    {day.dayLabel}
                  </span>
                  <span className="font-display font-bold text-sm text-[#12141B] w-7 h-7 rounded-full flex items-center justify-center bg-[#F5F6FA] mb-1">
                    {day.dayNum}
                  </span>

                  {/* Slots */}
                  <div className="w-full flex flex-col gap-1.5">
                    {day.slots.map((slot, sIdx) => {
                      const isSelected =
                        selectedSlot?.dayLabel === day.dayLabel &&
                        selectedSlot?.time === slot.time;
                      const isBooked = slot.status === 'booked';

                      return (
                        <button
                          key={sIdx}
                          disabled={isBooked}
                          onClick={() => handleSelectSlot(day.dayLabel, day.dayNum, slot.time)}
                          className={`w-full py-2.5 sm:py-2 px-1 rounded-lg font-mono text-[11px] transition-all text-center touch-manipulation ${
                            isBooked
                              ? 'bg-[#F1F1F5] text-[#B7BAC4] cursor-not-allowed border border-transparent'
                              : isSelected
                              ? 'bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white font-semibold shadow-sm border border-transparent scale-[1.03]'
                              : 'bg-white text-[#12141B] border border-[#E1E3EC] hover:border-[#9B5CFF] hover:bg-[#7A47D6]/5 cursor-pointer active:scale-95'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary Card (Dark Theme) */}
          <div className="bg-[#0A0910] text-white rounded-2xl p-6 sm:p-7 border border-white/10 relative overflow-hidden shadow-[0_20px_40px_rgba(10,9,16,0.3)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#9B5CFF]/20 to-transparent blur-2xl pointer-events-none" />

            <div className="font-mono text-[11px] tracking-wider uppercase text-white/50 mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#9B5CFF]" />
              Resumen de tu selección
            </div>

            {selectedSlot ? (
              <div className="flex flex-col">
                <div className="font-display font-semibold text-2xl text-white mb-5 tracking-tight flex items-baseline gap-2">
                  <span>{selectedSlot.dayLabel} {selectedSlot.dayNum}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-[#2FB6FF] font-mono">{selectedSlot.time}</span>
                </div>

                <div className="text-xs text-white/60 mb-2 font-mono">Modalidad de sesión:</div>
                <div className="flex flex-col gap-2">
                  {(['Presencial', 'Online', 'Nutrición'] as SessionType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSessionType(type)}
                      className={`text-left px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        sessionType === type
                          ? 'bg-[#9B5CFF]/20 border-[#9B5CFF] text-white font-semibold shadow-[0_0_12px_rgba(155,92,255,0.25)]'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span>{type}</span>
                      {sessionType === type && <CheckCircle2 className="w-4 h-4 text-[#9B5CFF]" />}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleConfirmWhatsApp}
                  className="mt-6 w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(155,92,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmar por WhatsApp</span>
                </button>

                {bookedConfirmation && (
                  <div className="mt-3.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-mono">
                    ✓ Mensaje preparado para enviar por WhatsApp
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-white/50 leading-relaxed py-6">
                Selecciona cualquier horario disponible en el calendario para configurar tu sesión.
              </div>
            )}
          </div>
        </div>

        <p className="text-xs font-mono text-[#9AA0AE] mt-5">
          * Vista interactiva de muestra. La sincronización en vivo se actualiza con la agenda personal de {config.coachName}.
        </p>
      </div>
    </section>
  );
};
