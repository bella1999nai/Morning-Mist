/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, Product } from '../types';
import { PRODUCTS, DICTIONARY } from '../data';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FlavorsProps {
  currentLanguage: Language;
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: () => void;
}

export default function Flavors({ currentLanguage, onSelectProduct, onNavigateToShop }: FlavorsProps) {
  
  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const getSubLabel = (flavorType: string) => {
    switch (flavorType) {
      case 'lake':
        return currentLanguage === 'zh' ? '水波之鏡 (Salt Butter)' : 'Lakefront Whisper';
      case 'tea':
        return currentLanguage === 'zh' ? '清晨茶田 (Ruby Tea)' : 'Dew-kissed Foliage';
      case 'coffee':
        return currentLanguage === 'zh' ? '湖畔煙絲 (Deep Espresso)' : 'Lakeside Ember';
      case 'mountain':
        return currentLanguage === 'zh' ? '原野山嶺 (Mountain Peppercorn)' : 'Wild Mountain Pulse';
      default:
        return '';
    }
  };

  return (
    <section 
      className="py-24 sm:py-32 bg-[#F5F5F2] text-[#4B3F3A]"
      id="flavors-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24">
          <div className="max-w-xl">
            <p className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-[#7C8C7A] mb-3">
              THE 4 STATES OF DAWN
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4B3F3A] tracking-wider leading-tight" style={{ fontSize: '43px' }}>
              {currentLanguage === 'zh' ? '日月潭的四種晨曦滋味' : 'Four Edible Landscapes'}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4B3F3A]/75 font-sans leading-relaxed tracking-wide" style={{ fontSize: '14px' }}>
              {currentLanguage === 'zh' 
                ? '我們深度烤製當地的湖水鹹甜、紅玉茶香、林間深焙咖啡、以及火山山脈的馬告辛香。' 
                : 'Each salt butter roll represents a unique spatial sector of Sun Moon Lake gathered at precisely five o’clock in the morning.'}
            </p>
          </div>
          
          <button
            onClick={onNavigateToShop}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 font-sans text-xs sm:text-sm tracking-widest uppercase text-[#7C8C7A] hover:text-[#4B3F3A] transition-colors border-b border-[#7C8C7A] pb-1 w-fit group"
          >
            <span>{t('shopNav')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="flavor-grid-container">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer bg-[#F5F5F2] border border-[#AAB3B1]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#4B3F3A]/5 hover:border-[#7C8C7A]/50 flex flex-col"
              id={`flavor-card-${product.id}`}
            >
              {/* Image Frame with zoom and fog-tint hover overlay */}
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
                <img
                  src={product.images[0]}
                  alt={product.title[currentLanguage]}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant Fog Tint Overlay on Hover */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none backdrop-blur-[1px]" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[#F5F5F2]/90 backdrop-blur-md text-[#4B3F3A] border border-[#AAB3B1]/20 rounded-full py-1 px-4 text-[10px] tracking-widest uppercase font-sans font-medium flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-[#7C8C7A]" />
                  <span>{getSubLabel(product.flavor_type)}</span>
                </div>

                {/* Pricing Overlay tag */}
                <div className="absolute bottom-4 right-4 bg-[#4B3F3A] text-[#F5F5F2] py-1 px-3.5 rounded-full text-xs font-sans font-medium tracking-wider">
                  {t('twdSymbol')} {product.price}
                </div>
              </div>

              {/* Title & Description Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#4B3F3A] tracking-wider group-hover:text-[#7C8C7A] transition-colors">
                    {product.title[currentLanguage]}
                  </h3>
                  <p className="text-sm text-[#4B3F3A]/80 font-sans leading-relaxed tracking-wide min-h-[48px] line-clamp-2">
                    {product.description[currentLanguage]}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#AAB3B1]/20 flex items-center justify-between text-xs sm:text-sm text-[#7C8C7A] font-sans tracking-widest uppercase">
                  <span>{t('viewDetails')}</span>
                  <div className="w-7 h-7 rounded-full bg-[#7C8C7A]/5 group-hover:bg-[#7C8C7A]/15 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#7C8C7A]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
