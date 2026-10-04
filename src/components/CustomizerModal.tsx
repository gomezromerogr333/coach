import React, { useState } from 'react';
import { CoachConfig } from '../types';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { DEFAULT_COACH_CONFIG } from '../data/defaultConfig';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CoachConfig;
  onSaveConfig: (newConfig: CoachConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<CoachConfig>(config);

  if (!isOpen) return null;

  const handleChange = (field: keyof CoachConfig, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(DEFAULT_COACH_CONFIG);
    onSaveConfig(DEFAULT_COACH_CONFIG);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-rise-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#12141B] border border-white/20 rounded-2xl max-w-[560px] w-full p-6 sm:p-7 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#9B5CFF]" />
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Personalizar Plantilla
              </h3>
              <p className="text-xs text-white/50 font-mono">
                Adapta el nombre, marca y contacto para cualquier cliente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block font-mono text-white/70 mb-1.5 font-semibold">
              Nombre del Entrenador / Coach
            </label>
            <input
              type="text"
              value={formData.coachName}
              onChange={(e) => handleChange('coachName', e.target.value)}
              placeholder="Ej: Marcos Silva, Elena Rossi, Coach Alex"
              className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-mono text-white/70 mb-1.5 font-semibold">
                Nombre de Marca / Logo
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                placeholder="Ej: KINETIC, PULSE, APEX"
                className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-white/70 mb-1.5 font-semibold">
                Dominio Web
              </label>
              <input
                type="text"
                value={formData.brandDomain}
                onChange={(e) => handleChange('brandDomain', e.target.value)}
                placeholder="Ej: kinetic.fit, coachpro.es"
                className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-white/70 mb-1.5 font-semibold">
              Título Profesional / Certificación
            </label>
            <input
              type="text"
              value={formData.coachTitle}
              onChange={(e) => handleChange('coachTitle', e.target.value)}
              placeholder="Ej: Entrenador Personal Certificado · NSCA / CSCS"
              className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-white/70 mb-1.5 font-semibold">
              Teléfono WhatsApp (formato internacional)
            </label>
            <input
              type="text"
              value={formData.phoneWhatsApp}
              onChange={(e) => handleChange('phoneWhatsApp', e.target.value)}
              placeholder="Ej: 34612345678 o 5215512345678"
              className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              required
            />
            <span className="text-[10px] text-white/40 mt-1 block font-mono">
              Los botones de reserva y planes enviarán mensajes directos a este número.
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-mono text-white/70 mb-1 font-semibold">
                Clientes activos
              </label>
              <input
                type="number"
                value={formData.activeClientsCount}
                onChange={(e) => handleChange('activeClientsCount', parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-white/70 mb-1 font-semibold">
                Años experiencia
              </label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => handleChange('experienceYears', parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-white/70 mb-1 font-semibold">
                % Constancia
              </label>
              <input
                type="number"
                value={formData.consistencyPercentage}
                onChange={(e) => handleChange('consistencyPercentage', parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#9B5CFF] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-5 mt-3 border-t border-white/10 gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:bg-white/5 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-xs font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_16px_rgba(155,92,255,0.4)] flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Aplicar cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
