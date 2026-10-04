import React, { useState } from 'react';
import { CoachConfig, VideoSpotlightItem } from '../types';
import { VIDEO_SPOTLIGHT_ITEMS } from '../data/defaultConfig';
import { Play, X, CheckCircle, Volume2, Maximize2 } from 'lucide-react';

interface VideoSpotlightProps {
  config: CoachConfig;
}

export const VideoSpotlight: React.FC<VideoSpotlightProps> = ({ config }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoSpotlightItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-[#0A0910] text-white py-20 sm:py-28 relative overflow-hidden border-t border-white/10">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-radial from-[#2FB6FF]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-radial from-[#C24CE0]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="font-mono text-xs tracking-wider uppercase text-[#2FB6FF] mb-4 flex items-center gap-2.5 font-semibold">
          <span className="w-5 h-[1.5px] bg-[#2FB6FF]" />
          Acompañamiento real
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-tight leading-tight max-w-[700px] text-white">
          Tu coach no te deja solo con una lista fría de ejercicios.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-[600px] leading-relaxed">
          Cada rutina viene respaldada con video — correcciones individuales grabadas para corregir tu postura, y demostraciones técnicas con tempo y respiración exacta.
        </p>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {VIDEO_SPOTLIGHT_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedVideo(item);
                setIsPlaying(true);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-4.5 hover:border-white/25 hover:bg-white/[0.06] transition-all group cursor-pointer shadow-lg"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[#241831] via-[#150C22] to-[#0A0910] flex items-center justify-center border border-white/10 group-hover:border-[#9B5CFF]/50 transition-colors">
                <div className="absolute inset-0 bg-radial from-[#9B5CFF]/30 to-transparent blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Play Button */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9B5CFF] to-[#C24CE0] flex items-center justify-center text-white shadow-[0_0_20px_rgba(155,92,255,0.5)] group-hover:scale-110 transition-transform relative z-10">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>

                <span className="absolute bottom-2.5 right-2.5 font-mono text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.videoDuration}
                </span>
              </div>

              {/* Tag */}
              <span className="self-start font-mono text-[10px] tracking-wider uppercase text-[#9B5CFF] bg-[#9B5CFF]/15 border border-[#9B5CFF]/30 px-2.5 py-1 rounded-full font-semibold">
                {item.tag}
              </span>

              {/* Title & Description */}
              <div>
                <h3 className="font-display font-semibold text-lg text-white group-hover:text-[#2FB6FF] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                <span>{item.coachNote.slice(0, 30)}...</span>
                <span className="shrink-0 whitespace-nowrap text-[#9B5CFF] font-semibold group-hover:translate-x-1 transition-transform">
                  Ver demo →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-rise-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12141B] border border-white/20 rounded-2xl max-w-[640px] w-full overflow-hidden shadow-2xl relative"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#9B5CFF] uppercase font-bold tracking-wider">
                  {selectedVideo.tag}
                </span>
                <h4 className="font-display font-bold text-base text-white">
                  {selectedVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video bg-black flex flex-col justify-end p-4 border-b border-white/10 overflow-hidden">
              {/* Simulated workout motion graphic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-20">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B5CFF] to-[#C24CE0] flex items-center justify-center text-white shadow-[0_0_30px_rgba(155,92,255,0.7)] hover:scale-105 transition-transform mx-auto mb-3"
                  >
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </button>
                  <p className="text-xs text-white/80 font-mono">
                    {isPlaying ? 'Reproduciendo cápsula técnica' : 'Pausado · Toca para reproducir'}
                  </p>
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="relative z-20 flex flex-col gap-2">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#9B5CFF] to-[#2FB6FF] w-2/5" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>0:18 / {selectedVideo.videoDuration}</span>
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                    <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body / Coach Annotation */}
            <div className="p-5 bg-[#0A0910]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3EEB8C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white/70">
                    Nota biomecánica de {config.coachName}:
                  </div>
                  <div className="text-sm text-white/90 mt-1 leading-relaxed">
                    "{selectedVideo.coachNote}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
