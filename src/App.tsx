/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Flavors from './components/Flavors';
import Shop from './components/Shop';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import MemberModal from './components/MemberModal';
import { Language, CartItem, Product, Member } from './types';
import { DICTIONARY, PRODUCTS, GIFTS } from './data';
import { Sparkles, MessageCircle, ArrowRight, Instagram } from 'lucide-react';
import CroissantLogo from './components/CroissantLogo';

export default function App() {
  // 1. Language state with persistent caching in localStorage
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const cached = localStorage.getItem('morning_mist_lang');
    return (cached as Language) || 'zh';
  });

  // 2. Routing Page State
  const [currentPage, setCurrentPage] = useState<string>('home');

  // 3. Shopping cart session state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('morning_mist_cart');
    return cached ? JSON.parse(cached) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Mount Seeding for testing environment
  useEffect(() => {
    // Seed default testing member account
    const existingMembers = localStorage.getItem('morning_mist_members');
    if (!existingMembers) {
      const defaultMembers: Member[] = [
        {
          id: 'MEM-8888',
          email: 'vip@morningmist.com',
          fullName: '王晨熙',
          phone: '0912-888-888',
          address: '台北市大安區忠孝東路四段88號',
          orders: [
            {
              id: 'MM-2026-99999',
              date: '2026/06/10 14:30',
              items: [
                {
                  productId: 'plain-croissant',
                  title: '初醒原味千層可頌 (Plain Croissant)',
                  price: 80,
                  quantity: 4
                },
                {
                  productId: 'haze-black-tea',
                  title: '晨曦湖畔紅玉茶卷 (Sun-Moon Red Rubis)',
                  price: 95,
                  quantity: 2
                }
              ],
              subtotal: 510,
              shippingFee: 160,
              grandTotal: 670,
              addCoolingBag: false,
              receiverName: '王晨熙',
              phone: '0912-888-888',
              address: '台北市大安區忠孝東路四段88號',
              deliveryDate: '2026-06-15',
              timeSlot: 'morning',
              status: 'pending_payment'
            }
          ]
        }
      ];
      localStorage.setItem('morning_mist_members', JSON.stringify(defaultMembers));
    }

    // Load active session from local storage
    const cachedMember = localStorage.getItem('morning_mist_current_member');
    if (cachedMember) {
      const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]');
      const active = JSON.parse(cachedMember);
      const matched = allMembers.find((m: any) => m.email.toLowerCase() === active.email.toLowerCase());
      setCurrentMember(matched || active);
    }
  }, []);

  const handleLoginStateChange = () => {
    const cachedMember = localStorage.getItem('morning_mist_current_member');
    if (cachedMember) {
      const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]');
      const active = JSON.parse(cachedMember);
      const matched = allMembers.find((m: any) => m.email.toLowerCase() === active.email.toLowerCase());
      setCurrentMember(matched || active);
    } else {
      setCurrentMember(null);
    }
  };

  // Sync state modifications to disk
  useEffect(() => {
    localStorage.setItem('morning_mist_lang', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('morning_mist_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // 4. Cart utility helpers
  const handleAddToCart = (productId: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] font-sans antialiased text-[#4B3F3A] flex flex-col justify-between selection:bg-[#7C8C7A]/20 selection:text-[#4B3F3A]">
      
      {/* GLOBAL HEADER HEADER */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        cartCount={totalsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMember={() => setIsMemberOpen(true)}
        isLoggedIn={!!currentMember}
        memberName={currentMember?.fullName}
      />

      {/* VIEW ORCHESTRATION ENGINE */}
      <main className="flex-grow pt-20">
        {currentPage === 'home' && (
          <div className="space-y-0" id="continuous-story-scroller">
            
            {/* Section 1: Hero Cover */}
            <Hero 
              currentLanguage={currentLanguage} 
              onNavigate={(page) => {
                if (page === 'story' || page === 'flavors' || page === 'shop') {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
            />

            {/* Section 2: Poetic Story */}
            <Story currentLanguage={currentLanguage} />

            {/* Section 3: Curated Flavor Grid */}
            <Flavors
              currentLanguage={currentLanguage}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onNavigateToShop={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Section 4: High conversion CTA Panel on the Home Page */}
            <section className="py-24 bg-[#4B3F3A] text-[#F5F5F2] relative overflow-hidden" id="homepage-cta">
              {/* Decorative misty background layers */}
              <div className="absolute inset-0 opacity-15 mix-blend-color-dodge bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
                <p className="font-sans text-xs tracking-[0.5em] uppercase text-[#AAB3B1]">
                  BRING SUN MOON LAKE TO YOUR LIVING ROOM
                </p>
                
                <h2 className="font-serif tracking-wide max-w-2xl mx-auto leading-tight" style={{ fontSize: '35px' }}>
                  {currentLanguage === 'zh' ? '把清晨五點的湖光，呈遞於餐桌之上' : 'Assemble your misty morning landscape.'}
                </h2>

                <p className="text-sm sm:text-base text-[#F5F5F2]/80 font-sans max-w-xl mx-auto leading-relaxed tracking-wider">
                  {t('limitWarning')}
                </p>

                {/* Dual Conversion Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <button
                    onClick={() => {
                      // Add Giftbox and open cart
                      handleAddToCart('giftbox-bundle', 1);
                      setIsCartOpen(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#7C8C7A] hover:bg-[#7C8C7A]/90 text-[#F5F5F2] font-sans text-sm tracking-widest uppercase transition-all duration-300 shadow-md"
                    id="home-cta-buy-gift"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('buyGiftBox')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full border border-[#AAB3B1]/40 text-[#F5F5F2] hover:bg-white/10 font-sans text-sm tracking-widest uppercase transition-all duration-300"
                    id="home-cta-view-booth"
                  >
                    <span>{t('orderNow')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 3 Focused Sub-Page Viewports */}
        {currentPage === 'story' && <Story currentLanguage={currentLanguage} />}
        {currentPage === 'flavors' && (
          <Flavors
            currentLanguage={currentLanguage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToShop={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {currentPage === 'shop' && (
          <Shop
            currentLanguage={currentLanguage}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onSelectGiftBox={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* SECTION 7: LUXURY FOOTER */}
      <footer className="bg-[#4B3F3A] text-[#F5F5F2] border-t border-stone-800" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 border-b border-stone-800 pb-12 sm:pb-16 mb-12 sm:mb-16">
            
            {/* Column 1: Brand & tagline descriptor */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 shrink-0 aspect-square rounded-full bg-transparent border border-stone-600 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <CroissantLogo className="w-8 h-8 transition-transform duration-500 hover:rotate-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl tracking-[0.2em] text-[#F5F5F2] block leading-none">
                    MORNING MIST
                  </span>
                  <span className="text-[10px] tracking-[0.35em] text-[#AAB3B1] uppercase font-sans block mt-1.5">
                    {t('brandName')}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#AAB3B1] font-serif italic tracking-wide max-w-sm pt-2 pl-0.5">
                {t('tagline')}
              </p>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="md:col-span-3 space-y-4" id="footer-links">
              <h4 className="font-sans text-xs tracking-widest text-[#AAB3B1] uppercase font-semibold">
                {currentLanguage === 'zh' ? '探索工坊' : 'Explore'}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-stone-300">
                <li>
                  <button 
                    onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#7C8C7A] transition-colors"
                  >
                    Morning Mist
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#7C8C7A] transition-colors"
                  >
                    {t('storyNav')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('flavors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#7C8C7A] transition-colors"
                  >
                    {t('flavorsNav')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#7C8C7A] transition-colors"
                  >
                    {t('shopNav')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Newsletter signup */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-sans text-xs tracking-widest text-[#AAB3B1] uppercase font-semibold">
                {currentLanguage === 'zh' ? '晨曦消息登記' : 'Newsletter Registry'}
              </h4>
              <p className="text-xs text-stone-300 font-sans leading-relaxed tracking-wider">
                {currentLanguage === 'zh' 
                  ? '訂閱以獲得每週工坊烘焙排程、季節風味與專屬預訂通知。' 
                  : 'Receive weekly updates of chef baking tables, limited forest pickings, and VIP reservations.'}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 pt-2">
                <input
                  type="email"
                  required
                  placeholder={currentLanguage === 'zh' ? '請輸入您的電子信箱' : 'your@email.com'}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 text-xs px-4 py-3 rounded-full focus:outline-none focus:border-[#7C8C7A] flex-grow font-sans"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="bg-[#7C8C7A] hover:bg-[#7C8C7A]/90 text-[#F5F5F2] px-5 py-3 rounded-full text-xs font-sans tracking-widest uppercase transition-colors"
                  id="newsletter-submit"
                >
                  {newsletterSubscribed ? (currentLanguage === 'zh' ? '已登記' : 'Subbed') : (currentLanguage === 'zh' ? '訂閱' : 'Subscribe')}
                </button>
              </form>

              {/* Social Channels Linkups */}
              <div className="flex items-center space-x-6 pt-4 text-stone-400">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-stone-100 transition-colors flex items-center space-x-2 text-xs"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="font-sans text-[11px] tracking-wider uppercase">Instagram</span>
                </a>
                <a 
                  href="https://line.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-stone-100 transition-colors flex items-center space-x-2 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-sans text-[11px] tracking-wider uppercase">LINE Official</span>
                </a>
              </div>
            </div>

          </div>

          {/* Slogan and disclaimers */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-neutral-400 gap-4">
            <p className="text-[10px] sm:text-xs font-sans tracking-wide leading-relaxed">
              {t('footerDisclaimer')}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] tracking-[0.4em] uppercase text-[#AAB3B1] hover:text-[#7C8C7A] transition-colors font-sans"
            >
              {t('backToTop')} ↑
            </button>
          </div>
        </div>
      </footer>

      {/* OVERLAY: CROISSANT PRODUCT DISPLAY SCREEN MODAL */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          currentLanguage={currentLanguage}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* OVERLAY: MULTI-STAGE COLD CHAIN LOGISTICS AND CART DRAWER */}
      <CartDrawer
        currentLanguage={currentLanguage}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* OVERLAY: MEMBER PORTAL AND ADMIN BANK SETUPS SCREEN */}
      <MemberModal
        currentLanguage={currentLanguage}
        isOpen={isMemberOpen}
        onClose={() => setIsMemberOpen(false)}
        onLoginStateChange={handleLoginStateChange}
      />

    </div>
  );
}
