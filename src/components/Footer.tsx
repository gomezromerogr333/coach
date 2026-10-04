import React from 'react';
import { CoachConfig } from '../types';

interface FooterProps {
  config: CoachConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-[#0A0910] border-t border-white/10 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-xs font-mono text-white/40">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
          <span className="font-bold text-white">{config.brandName}</span>
          <span>·</span>
          <span>Plantilla Profesional para Entrenadores Personales</span>
        </div>

        <div className="flex items-center gap-4 text-white/40">
          <span>{config.locationCity}</span>
          <span>·</span>
          <span>Ecosistema Digital 1:1</span>
        </div>
      </div>
    </footer>
  );
};
