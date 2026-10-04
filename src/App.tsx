/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CoachConfig } from './types';
import { DEFAULT_COACH_CONFIG } from './data/defaultConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { BookingWidget } from './components/BookingWidget';
import { PortalPreview } from './components/PortalPreview';
import { VideoSpotlight } from './components/VideoSpotlight';
import { Plans } from './components/Plans';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { DeviceSwitcher, DeviceMode } from './components/DeviceSwitcher';

export default function App() {
  const [config, setConfig] = useState<CoachConfig>(() => {
    const saved = localStorage.getItem('coach_landing_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved config', e);
      }
    }
    return DEFAULT_COACH_CONFIG;
  });

  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 20, y: 10 });

  // Update window width automatically on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ambient glow follows cursor subtly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSaveConfig = (newConfig: CoachConfig) => {
    setConfig(newConfig);
    localStorage.setItem('coach_landing_config', JSON.stringify(newConfig));
  };

  const scrollToBooking = () => {
    const el = document.getElementById('agenda');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0910] text-white relative selection:bg-[#9B5CFF]/30 selection:text-white overflow-x-hidden">
      {/* Device Viewport Mode Switcher */}
      <DeviceSwitcher
        mode={deviceMode}
        onChangeMode={setDeviceMode}
        windowWidth={windowWidth}
      />

      {/* Ambient background glow layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-[background-position] duration-200"
        style={{
          background: `
            radial-gradient(750px 500px at ${mousePos.x}% ${mousePos.y}%, rgba(155,92,255,0.18), transparent 55%),
            radial-gradient(650px 450px at 90% 85%, rgba(47,182,255,0.12), transparent 60%),
            #0A0910
          `,
        }}
      />

      {/* Conditional Device Frame Shell for Mobile Simulation */}
      {deviceMode === 'mobile' ? (
        <div className="min-h-screen flex flex-col items-center justify-start py-8 sm:py-12 px-4 relative z-10 bg-black/60">
          <div className="mb-4 text-center font-mono text-xs text-white/60">
            <span className="text-[#9B5CFF] font-bold">Vista Móvil Simulada (390 × 844px)</span> · Se actualiza en tiempo real
          </div>

          {/* Smartphone Simulator Shell */}
          <div className="w-[390px] max-w-full bg-[#0A0910] rounded-[48px] border-[8px] border-[#22232B] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative flex flex-col h-[844px]">
            {/* Dynamic Notch */}
            <div className="w-full bg-[#0A0910] pt-2 px-6 flex justify-between items-center text-[11px] font-mono text-white/80 shrink-0 z-40 select-none">
              <span>9:41</span>
              <div className="w-24 h-4 bg-[#1b1b22] rounded-full mx-auto" />
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-sm border border-current" />
                <span>5G</span>
              </div>
            </div>

            {/* Scrollable Mobile Viewport */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
              <Navbar
                config={config}
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
                onBookClick={scrollToBooking}
              />

              <main>
                <Hero config={config} onBookClick={scrollToBooking} />
                <HowItWorks config={config} />
                <BookingWidget config={config} />
                <PortalPreview config={config} />
                <VideoSpotlight config={config} />
                <Plans config={config} />
                <Testimonials config={config} />
                <FaqSection />
                <FinalCta config={config} onBookClick={scrollToBooking} />
              </main>

              <Footer config={config} />
            </div>

            {/* Simulated Mobile Home Bar Indicator */}
            <div className="w-full bg-[#0A0910] py-2 flex justify-center shrink-0 z-40 select-none">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        /* Standard Auto or Desktop Container */
        <div className={`relative z-10 transition-all ${deviceMode === 'desktop' ? 'max-w-[1440px] mx-auto shadow-2xl border-x border-white/5' : 'w-full'}`}>
          <Navbar
            config={config}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onBookClick={scrollToBooking}
          />

          <main>
            <Hero config={config} onBookClick={scrollToBooking} />
            <HowItWorks config={config} />
            <BookingWidget config={config} />
            <PortalPreview config={config} />
            <VideoSpotlight config={config} />
            <Plans config={config} />
            <Testimonials config={config} />
            <FaqSection />
            <FinalCta config={config} onBookClick={scrollToBooking} />
          </main>

          <Footer config={config} />
        </div>
      )}

      {/* Live Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
