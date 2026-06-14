/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';
import { STORIES } from '../data';

interface StoryProps {
  currentLanguage: Language;
}

export default function Story({ currentLanguage }: StoryProps) {
  return (
    <section 
      className="py-24 sm:py-32 bg-[#F5F5F2] text-[#4B3F3A]"
      id="story-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <p className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-[#7C8C7A] mb-3">
            TERROIR HERITAGE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4B3F3A] tracking-wider">
            {currentLanguage === 'zh' ? '晨霧。山嵐。手感烘焙。' : 'The Land. The Fog. The Lamination.'}
          </h2>
          <div className="w-12 h-0.5 bg-[#7C8C7A] mx-auto mt-6" />
        </div>

        {/* Story Section 1: The Ambient morning (Centered, Minimalsit layout) */}
        <div className="max-w-3xl mx-auto text-center mb-24 lg:mb-32 flex flex-col items-center space-y-8">
          {/* Poetic description */}
          <div className="flex flex-col items-center space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4B3F3A] tracking-widest leading-snug">
              {STORIES[0].title[currentLanguage]}
            </h3>
            
            <div className="w-8 h-[1px] bg-[#7C8C7A]/40" />
            
            <div className="space-y-6 text-[#4B3F3A]/85 font-serif leading-relaxed text-sm sm:text-base tracking-widest max-w-2xl mx-auto italic whitespace-pre-line">
              {STORIES[0].paragraphs.map((p, index) => (
                <p key={index} className="indent-0">
                  {p[currentLanguage]}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section 2: Terroir Heritage Box (Magazine composition) */}
        <div className="bg-[#AAB3B1]/10 rounded-2xl p-8 sm:p-12 lg:p-16 border border-[#AAB3B1]/25">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#7C8C7A]">
              OUR COMMITMENT
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#4B3F3A] tracking-wide">
              {STORIES[1].title[currentLanguage]}
            </h3>
            <div className="w-8 h-[1px] bg-[#4B3F3A]/30 mx-auto" />
            <div className="text-sm sm:text-base md:text-lg text-[#4B3F3A]/90 font-serif leading-relaxed italic tracking-wider">
              {STORIES[1].paragraphs[0][currentLanguage]}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
