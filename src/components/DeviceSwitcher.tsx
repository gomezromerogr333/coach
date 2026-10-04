import React from 'react';
import { Monitor, Smartphone, Maximize2 } from 'lucide-react';

export type DeviceMode = 'auto' | 'desktop' | 'mobile';

interface DeviceSwitcherProps {
  mode: DeviceMode;
  onChangeMode: (mode: DeviceMode) => void;
  windowWidth: number;
}

export const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  mode,
  onChangeMode,
  windowWidth,
}) => {
  return (
    <aside aria-label="Selector de vista de dispositivo" className="hidden lg:flex fixed top-20 right-6 z-40 items-center gap-1 bg-[#12141B]/90 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all">
      <button
        onClick={() => onChangeMode('auto')}
        className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
          mode === 'auto'
            ? 'bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white shadow-sm'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        title="Adaptación automática al tamaño de pantalla"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Auto</span>
        <span className="text-[10px] opacity-75 font-mono">({windowWidth}px)</span>
      </button>

      <button
        onClick={() => onChangeMode('desktop')}
        className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
          mode === 'desktop'
            ? 'bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white shadow-sm'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        title="Forzar vista de escritorio (1440px)"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Escritorio</span>
      </button>

      <button
        onClick={() => onChangeMode('mobile')}
        className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
          mode === 'mobile'
            ? 'bg-gradient-to-r from-[#9B5CFF] to-[#C24CE0] text-white shadow-sm'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        title="Vista simulada móvil (390px iPhone)"
      >
        <Smartphone className="w-3.5 h-3.5 text-[#2FB6FF]" />
        <span className="hidden sm:inline">Móvil</span>
      </button>
    </aside>
  );
};
