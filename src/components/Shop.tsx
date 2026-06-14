/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, Product } from '../types';
import { PRODUCTS, GIFTS, DICTIONARY } from '../data';
import { ShoppingCart, Star, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShopProps {
  currentLanguage: Language;
  onAddToCart: (productId: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onSelectGiftBox: (giftId: string) => void;
}

export default function Shop({ currentLanguage, onAddToCart, onSelectProduct, onSelectGiftBox }: ShopProps) {
  
  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const getFlavorLabel = (flavor: string) => {
    switch (flavor) {
      case 'lake':
        return currentLanguage === 'zh' ? '水波 ── 鹽之花' : 'Lakefront Fleur de Sel';
      case 'tea':
        return currentLanguage === 'zh' ? '高山 ── 紅玉茶' : 'High-Mountain Ruby Tea';
      case 'coffee':
        return currentLanguage === 'zh' ? '林間 ── 焙咖啡' : 'Lakeside Coffee';
      case 'mountain':
        return currentLanguage === 'zh' ? '野生 ── 馬告椒' : 'Mountain Wild Makauy';
      default:
        return '';
    }
  };

  return (
    <section 
      className="py-24 sm:py-32 bg-[#F5F5F2] text-[#4B3F3A] border-t border-[#AAB3B1]/10"
      id="shop-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-[#7C8C7A] mb-3">
            ONLINE BOUTIQUE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4B3F3A] tracking-wider">
            {currentLanguage === 'zh' ? '晨曦慢焙線上工坊' : 'Our Artisanal Online Workshop'}
          </h2>
          <div className="w-12 h-0.5 bg-[#4B3F3A]/20 mx-auto mt-6" />
        </div>

        {/* Urgency Alert ribbon */}
        <div 
          className="mb-16 bg-[#7C8C7A]/10 border border-[#7C8C7A]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left shadow-sm"
          id="shop-urgency-banner"
        >
          <div className="w-10 h-10 rounded-full bg-[#7C8C7A]/15 flex items-center justify-center flex-shrink-0 text-[#7C8C7A]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg text-[#4B3F3A] tracking-wide mb-1 flex items-center justify-center sm:justify-start gap-2">
              <span>{currentLanguage === 'zh' ? '新鮮限額說明' : 'Artisanal Freshness & Order Caps'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4B3F3A]/80 font-sans leading-relaxed tracking-wide">
              {t('limitWarning')}
            </p>
          </div>
        </div>

        {/* SECTION 1: SIGNATURE BUNDLE GIFT BOX */}
        <div className="mb-24" id="shop-bundle-section">
          <div className="text-left mb-10">
            <h3 className="font-serif text-2xl text-[#4B3F3A] tracking-wide relative inline-block">
              {currentLanguage === 'zh' ? '晨霧手作禮盒' : 'Artisanal Curator Box'}
              <span className="absolute -right-16 top-0 bg-[#7C8C7A] text-[#F5F5F2] text-[9px] uppercase tracking-widest font-sans font-medium px-2 py-0.5 rounded-full">
                BESTSELL
              </span>
            </h3>
            <p className="text-xs text-[#AAB3B1] tracking-widest uppercase font-sans mt-1">
              Curate the ultimate landscapes
            </p>
          </div>

          {/* Large Card structure representing the Gift Box */}
          {GIFTS.map((gift) => (
            <div 
              key={gift.id}
              className="bg-white/40 border border-[#AAB3B1]/35 rounded-2xl overflow-hidden shadow-lg shadow-[#4B3F3A]/3 grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto"
              id={`giftbox-card-${gift.id}`}
            >
              {/* Box Image / Presentation */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto bg-[#4B3F3A]">
                <img
                  src={gift.images[0]}
                  alt={gift.title[currentLanguage]}
                  className="w-full h-full object-cover opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Poetic layer label */}
                <div className="absolute bottom-6 left-6 text-[#F5F5F2] max-w-sm">
                  <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#AAB3B1]">TERROIR BOX SPEC</span>
                  <h4 className="font-serif text-lg tracking-wider mt-1">{t('brandName')} Curated Gift Box</h4>
                </div>
              </div>

              {/* Description + Cart CTAs */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-[#F5F5F2]">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-2xl sm:text-3xl text-[#4B3F3A] tracking-wide leading-tight">
                      {gift.title[currentLanguage]}
                    </h4>
                  </div>
                  <p className="text-[#4B3F3A]/85 text-sm sm:text-base font-sans leading-relaxed tracking-wider">
                    {gift.description[currentLanguage]}
                  </p>

                  {/* Curated list items bullet checklists */}
                  <div className="pt-4 space-y-2 text-xs sm:text-sm text-[#4B3F3A]/75 font-sans">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '湖鏡．法國鹽之花手揉鹽可頌 × 2' : 'Lake Mirror Salt Butter Roll × 2'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '紅玉．晨曦薄霧茶鹽可頌 × 2' : 'Sun-dried Ruby Tea Salt Butter Roll × 2'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '深焙．湖畔煙草咖啡鹽可頌 × 2' : 'Lakefront Coffee Salt Butter Roll × 2'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '山嶺．馬告胡椒起司鹽可頌 × 2' : 'Mist Mountain Makauy Salt Butter Roll × 2'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[#AAB3B1]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <span className="font-sans text-[11px] tracking-widest text-[#AAB3B1] block uppercase">{t('qtyLabel')} 8pcs set</span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#4B3F3A] font-semibold">{t('twdSymbol')} {gift.price}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      onAddToCart('giftbox-bundle', 1);
                      onSelectGiftBox(gift.id);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase hover:bg-[#7C8C7A]/90 transition-all duration-300"
                    id="add-gift-to-cart-btn"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t('buyGiftBox')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: INDIVIDUAL SELECTION */}
        <div className="mb-24" id="shop-individual-section">
          <div className="text-left mb-10">
            <h3 className="font-serif text-2xl text-[#4B3F3A] tracking-wide">
              {currentLanguage === 'zh' ? '單款式細意品嚐' : 'Individual Terroir Pastries'}
            </h3>
            <p className="text-xs text-[#AAB3B1] tracking-widest uppercase font-sans mt-1">
              Select and combine your custom morning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white/40 border border-[#AAB3B1]/25 rounded-2xl overflow-hidden hover:bg-white hover:border-[#7C8C7A]/45 hover:shadow-lg transition-all duration-500 group flex flex-col justify-between"
                id={`shop-prod-card-${prod.id}`}
              >
                {/* Product thumbnail */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={prod.images[0]}
                    alt={prod.title[currentLanguage]}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle watermark of category */}
                  <div className="absolute top-3 left-3 bg-[#F5F5F2]/85 text-[#4B3F3A] border border-[#AAB3B1]/10 rounded-full py-0.5 px-3 text-[9px] tracking-wider uppercase font-sans">
                    {getFlavorLabel(prod.flavor_type)}
                  </div>
                </div>

                {/* Information */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h4 
                      onClick={() => onSelectProduct(prod)}
                      className="font-serif text-base sm:text-lg text-[#4B3F3A] tracking-wide hover:text-[#7C8C7A] cursor-pointer transition-colors"
                    >
                      {prod.title[currentLanguage]}
                    </h4>
                    <span className="font-mono text-sm text-[#4B3F3A] font-semibold block pt-1">
                      {t('twdSymbol')} {prod.price}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#AAB3B1]/10 flex flex-col gap-2">
                    <button
                      onClick={() => onAddToCart(prod.id, 1)}
                      className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-full border border-[#7C8C7A] text-[#7C8C7A] bg-white hover:bg-[#7C8C7A]/5 font-sans text-xs sm:text-xs tracking-widest uppercase transition-all"
                      id={`add-to-cart-${prod.id}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{t('addToCart')}</span>
                    </button>
                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="w-full text-center text-[10px] text-[#AAB3B1] uppercase font-sans tracking-widest py-1 hover:text-[#4B3F3A] transition-colors"
                    >
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: TRUST & FRESHNESS ASSURANCE */}
        <div 
          className="border-t border-[#AAB3B1]/20 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12" 
          id="shop-guarantees-section"
        >
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#4B3F3A] tracking-wider mb-6 flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#7C8C7A]" />
              <span>{t('guaranteeSectionTitle')}</span>
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-sm sm:text-base text-[#4B3F3A]">
                  01. {t('guarantee1Title')}
                </h4>
                <p className="text-xs sm:text-sm text-[#4B3F3A]/75 font-sans leading-relaxed tracking-wide">
                  {t('guarantee1Text')}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-sm sm:text-base text-[#4B3F3A]">
                  02. {t('guarantee2Title')}
                </h4>
                <p className="text-xs sm:text-sm text-[#4B3F3A]/75 font-sans leading-relaxed tracking-wide">
                  {t('guarantee2Text')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#AAB3B1]/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-[#AAB3B1]/20">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#7C8C7A]/10 flex items-center justify-center text-[#7C8C7A]">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg sm:text-xl text-[#4B3F3A] tracking-wide">
                {currentLanguage === 'zh' ? '低溫冷凍物流配送事項' : 'Cold Chain Logistics Warning'}
              </h4>
              <p className="text-xs sm:text-sm text-[#4B3F3A]/80 font-sans leading-relaxed tracking-wider">
                {t('freeShippingLabel')}
              </p>
            </div>

            <div className="pt-8 border-t border-[#AAB3B1]/20 font-sans text-[10px] tracking-widest text-[#AAB3B1] uppercase flex justify-between items-center">
              <span>certified coldchain logis</span>
              <span>TAIWAN ACCREDITED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
