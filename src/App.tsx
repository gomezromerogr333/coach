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

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 20, y: 10 });

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

      <div className="relative z-10 w-full">
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
