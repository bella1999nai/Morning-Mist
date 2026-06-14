/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, Product } from '../types';
import { DICTIONARY } from '../data';
import { X, ShoppingBag, Leaf, Shield, Weight, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  currentLanguage: Language;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  currentLanguage,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden bg-black/45 backdrop-blur-md animate-fadeIn" id="product-detail-modal">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      {/* Modal Card Box */}
      <div 
        className="relative bg-[#F5F5F2] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-[#AAB3B1]/20 flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        id={`product-detail-${product.id}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#F5F5F2]/80 backdrop-blur-sm border border-[#AAB3B1]/20 text-[#4B3F3A] hover:bg-[#7C8C7A]/15 hover:text-[#7C8C7A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Large Image Canvas Column */}
        <div className="w-full md:w-1/2 relative bg-stone-100 aspect-square md:aspect-auto">
          <img
            src={product.images[0]}
            alt={product.title[currentLanguage]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4B3F3A]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2. Detail Context Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[80vh]">
          <div className="space-y-6">
            {/* Title & Flavor Mapping badge */}
            <div className="space-y-2">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7C8C7A]">
                TERROIR IDENTIFIER: {product.flavor_type}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4B3F3A] tracking-wider leading-snug">
                {product.title[currentLanguage]}
              </h3>
            </div>

            {/* Price tag */}
            <div className="font-mono text-xl text-[#4B3F3A] font-semibold">
              {t('twdSymbol')} {product.price}
            </div>

            {/* Poetic story narratives */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-[#4B3F3A]/90 font-serif italic leading-relaxed tracking-wide">
                {product.description[currentLanguage]}
              </p>
              <div className="w-6 h-[1px] bg-[#AAB3B1] my-4" />
              <p className="text-xs sm:text-sm text-[#4B3F3A]/80 font-sans leading-relaxed tracking-wider">
                {product.story[currentLanguage]}
              </p>
            </div>

            {/* Detailed specs (Ingredients, weight, allergens) */}
            {product.details && (
              <div className="bg-[#AAB3B1]/10 rounded-xl p-4 sm:p-5 space-y-3.5 border border-[#AAB3B1]/20 text-xs sm:text-sm">
                <div className="flex items-start space-x-2.5">
                  <Leaf className="w-4 h-4 text-[#7C8C7A] mt-0.5" />
                  <div>
                    <span className="font-sans font-semibold text-[#4B3F3A]">{t('ingredientsLabel')} </span>
                    <span className="text-[#4B3F3A]/85 font-sans leading-relaxed text-xs">{product.details.ingredients[currentLanguage]}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Shield className="w-4 h-4 text-amber-600/80 mt-0.5" />
                  <div>
                    <span className="font-sans font-semibold text-[#4B3F3A]">{t('allergensLabel')} </span>
                    <span className="text-[#4B3F3A]/80 font-sans leading-relaxed text-xs">{product.details.allergens[currentLanguage]}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Weight className="w-4 h-4 text-[#AAB3B1]" />
                  <div>
                    <span className="font-sans font-semibold text-[#4B3F3A]">{t('weightLabel')} </span>
                    <span className="text-[#4B3F3A]/80 font-mono text-xs">{product.details.weight}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Buy/Cart Segment Footer */}
          <div className="mt-8 pt-6 border-t border-[#AAB3B1]/20 space-y-4">
            <div className="flex items-center justify-between gap-4">
              {/* Quantity Incrementor */}
              <div className="flex items-center space-x-1 border border-[#AAB3B1]/40 rounded-full py-1.5 px-3 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#4B3F3A] hover:bg-[#7C8C7A]/10 font-sans text-lg font-medium"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono font-medium text-sm text-[#4B3F3A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#4B3F3A] hover:bg-[#7C8C7A]/10 font-sans text-lg font-medium"
                >
                  +
                </button>
              </div>

              {/* Action Button: Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`flex-grow inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-full font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                  addedSuccess 
                    ? 'bg-[#7C8C7A] text-[#F5F5F2]' 
                    : 'bg-[#4B3F3A] text-[#F5F5F2] hover:bg-[#7C8C7A]'
                }`}
                id={`add-to-cart-action-${product.id}`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{currentLanguage === 'zh' ? '已成功登載！' : 'Session Registered!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
