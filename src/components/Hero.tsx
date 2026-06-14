/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';
import { DICTIONARY } from '../data';
import { ChevronDown } from 'lucide-react';
import heroImg from '../assets/images/lake_sunrise_hero_1781318900967.jpg';
import CroissantLogo from './CroissantLogo';

interface HeroProps {
  currentLanguage: Language;
  onNavigate: (page: string) => void;
}

export default function Hero({ currentLanguage, onNavigate }: HeroProps) {
  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const imagePath = heroImg;

  return (
    <section 
      className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#4B3F3A]"
      id="hero-section"
    >
      {/* 1. Cinematic Background Image with slow Ken Burns parallax-like zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src={imagePath}
          alt="Cinematic Sunrise at Sun Moon Lake"
          className="w-full h-full object-cover scale-105 animate-[kenburns_45s_infinite_alternate] opacity-80"
          referrerPolicy="no-referrer"
        />
        {/* Soft, rich gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B3F3A]/40 via-transparent to-[#F5F5F2]" />
        <div className="absolute inset-0 bg-[#4B3F3A]/25 mix-blend-multiply" />
      </div>

      {/* 2. Floating Fog Overlay Simulator (poetic and elegant slow drift) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-45">
        <div 
          className="absolute -left-[50%] top-1/4 w-[200%] h-[50%] bg-gradient-to-r from-transparent via-[#F5F5F2]/25 to-transparent blur-[80px] animate-[fogdrift_35s_linear_infinite]" 
        />
        <div 
          className="absolute -right-[50%] top-1/2 w-[200%] h-[40%] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-[60px] animate-[fogdrift_25s_linear_infinite_reverse]" 
        />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 text-center max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 flex flex-col items-center">
        {/* Divine Golden Emblem Frame mimicking the celestial design of the logo */}
        <div className="relative mb-8 group select-none animate-[fadeInUp_1.0s_ease_out]" id="hero-emblem-container">
          {/* Far Outer Rotating Gold Frame */}
          <div className="absolute inset-0 -m-5 border border-amber-300/15 rounded-full animate-[spin_55s_linear_infinite] border-dashed" />
          
          {/* Outer Rotating Gold Orbit */}
          <div className="absolute inset-0 -m-3 border border-amber-200/25 rounded-full animate-[spin_35s_linear_infinite]" />
          
          {/* Delicate Spark/Star moving on the orbit representing the 5:00 AM gold light */}
          <div className="absolute inset-0 -m-3 flex items-start justify-center rotate-45 animate-[spin_25s_linear_infinite]">
            <div className="w-1.5 h-1.5 bg-amber-300 rounded-full blur-[1px] shadow-[0_0_8px_#fde047]" />
          </div>

          {/* Core premium circle sleeve */}
          <div className="relative w-28 sm:w-36 h-28 sm:h-36 bg-transparent rounded-full flex items-center justify-center border border-amber-200/20 transition-all duration-700 group-hover:border-amber-200/50 group-hover:scale-105">
            {/* Elegant gold line-art croissant sketch inside */}
            <CroissantLogo className="w-20 sm:w-26 h-20 sm:h-26 transition-all duration-700 group-hover:scale-105 group-hover:rotate-[5deg]" />
          </div>
          
          {/* Subtle surrounding gold dust shadow */}
          <div className="absolute inset-0 rounded-full bg-amber-350/5 blur-xl -z-10 group-hover:bg-amber-350/15 transition-colors duration-500" />
        </div>

        <p className="font-serif text-[#d6dfdd] text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest leading-relaxed mb-12 max-w-3xl mx-auto animate-[fadeInUp_2.0s_ease_out] whitespace-pre-line mt-4">
          {currentLanguage === 'zh' ? (
            `第一道陽光穿過山巒，晨霧緩緩覆蓋湖面
我們將滿滿的誠意揉進每一顆可頌
讓每位旅人，都能把日月潭的清晨打包帶回家`
          ) : (
            `The first rays of sunrise pierce the mountains, as the morning mist gently blankets the lake.
We knead abundant sincerity into every single croissant,
so every traveler can pack the dawn of Sun Moon Lake and bring it home.`
          )}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-[fadeInUp_3.0s_ease_out]">
          <button
            onClick={() => onNavigate('flavors')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase hover:bg-[#7C8C7A]/95 shadow-lg shadow-[#7C8C7A]/20 transition-all duration-300 hover:scale-[1.02]"
            id="hero-explore-cta"
          >
            {t('exploreFlavors')}
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-stone-200 text-stone-100 bg-white/5 font-sans text-sm tracking-widest uppercase hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
            id="hero-order-cta"
          >
            {t('orderNow')}
          </button>
        </div>
      </div>

      {/* 4. Elegant scroll-down clue */}
      <div 
        onClick={() => onNavigate('story')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        id="hero-scroll-btn"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#AAB3B1] mb-2 font-sans">
          {t('storyNav')}
        </span>
        <ChevronDown className="w-5 h-5 text-[#AAB3B1] animate-bounce" />
      </div>
    </section>
  );
}
