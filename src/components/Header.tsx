/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ShoppingBag, Globe, Check, User } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';
import CroissantLogo from './CroissantLogo';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMember: () => void;
  isLoggedIn: boolean;
  memberName?: string;
}

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'zh', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function Header({
  currentLanguage,
  onLanguageChange,
  currentPage,
  onPageChange,
  cartCount,
  onOpenCart,
  onOpenMember,
  isLoggedIn,
  memberName
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  const navItems = [
    { id: 'home', label: 'Morning Mist' },
    { id: 'story', label: t('storyNav') },
    { id: 'flavors', label: t('flavorsNav') },
    { id: 'shop', label: t('shopNav') }
  ];

  const selectPage = (id: string) => {
    onPageChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectLanguage = (code: Language) => {
    onLanguageChange(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F2]/80 backdrop-blur-md border-b border-[#AAB3B1]/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand identity */}
        <div 
          onClick={() => selectPage('home')}
          className="cursor-pointer group flex items-center space-x-3.5"
          id="header-brand-logo"
        >
          {/* Aesthetic border frame for logo protection */}
          <div className="w-10 sm:w-11 h-10 sm:h-11 shrink-0 aspect-square rounded-full bg-transparent border border-[#7C8C7A]/25 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:border-[#7C8C7A]/60">
            <CroissantLogo className="w-7 sm:w-8 h-7 sm:h-8 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[3deg]" />
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="font-serif text-lg sm:text-xl tracking-[0.2em] text-[#4B3F3A] transition-colors duration-300 group-hover:text-[#7C8C7A] leading-none">
              MORNING MIST
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#AAB3B1] uppercase font-sans mt-0.5 group-hover:text-[#4B3F3A] transition-colors duration-300">
              {t('brandName')}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center" id="nav-desktop">
          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => selectPage(item.id)}
              className={`font-sans text-sm tracking-widest uppercase transition-all duration-300 relative py-2 ${
                currentPage === item.id 
                  ? 'text-[#7C8C7A] font-medium' 
                  : 'text-[#4B3F3A]/75 hover:text-[#4B3F3A]'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#7C8C7A] rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Global Controls */}
        <div className="flex items-center space-x-4 sm:space-x-6" id="header-controls">
          
          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-full border border-[#AAB3B1]/30 hover:border-[#7C8C7A]/60 hover:bg-[#AAB3B1]/5 transition-all text-[#4B3F3A] text-xs sm:text-sm font-sans"
              aria-label="Language Selector"
              id="lang-sw-btn"
            >
              <Globe className="w-4 h-4 text-[#7C8C7A]" />
              <span className="hidden sm:inline-block font-medium">
                {LANGUAGES.find((l) => l.code === currentLanguage)?.name}
              </span>
              <span className="sm:hidden uppercase">{currentLanguage}</span>
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div 
                  className="absolute right-0 mt-2 w-44 rounded-lg bg-[#F5F5F2] border border-[#AAB3B1]/30 shadow-lg py-1 z-50 animate-fadeIn"
                  id="lang-sw-dropdown"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans flex items-center justify-between transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-[#7C8C7A]/10 text-[#7C8C7A] font-medium'
                          : 'text-[#4B3F3A]/85 hover:bg-[#AAB3B1]/10'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[#7C8C7A]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Member Center Icon */}
          <button
            onClick={onOpenMember}
            className="p-2.5 rounded-full border border-[#AAB3B1]/30 hover:border-[#7C8C7A] hover:bg-[#7C8C7A]/5 transition-all group flex items-center justify-center gap-1 sm:gap-1.5"
            aria-label="Member Area"
            id="member-icon-trigger"
          >
            <div className="relative">
              <User className="w-4 sm:w-5 h-4 sm:h-5 text-[#4B3F3A] group-hover:text-[#7C8C7A] transition-colors" />
              {isLoggedIn && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#F5F5F2] shadow-sm animate-pulse" />
              )}
            </div>
            {isLoggedIn ? (
              <span className="hidden md:inline-block max-w-[80px] truncate text-[10px] sm:text-xs text-[#4B3F3A] tracking-widest uppercase font-semibold">
                {memberName || 'VIP Member'}
              </span>
            ) : (
              <span className="hidden md:inline-block text-[10px] sm:text-xs text-[#AAB3B1] tracking-widest uppercase">
                {currentLanguage === 'zh' ? '會員登入' : 'Member'}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-[#AAB3B1]/30 hover:border-[#7C8C7A] hover:bg-[#7C8C7A]/5 transition-all group"
            aria-label="Shopping Cart"
            id="cart-icon-trigger"
          >
            <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 text-[#4B3F3A] group-hover:text-[#7C8C7A] transition-colors" />
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-[#7C8C7A] text-[#F5F5F2] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-sans font-semibold border-2 border-[#F5F5F2]"
                id="cart-badge-count"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#4B3F3A] hover:text-[#7C8C7A] transition-colors"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-30 md:hidden" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <nav 
            className="absolute top-20 left-0 w-full bg-[#F5F5F2] border-b border-[#AAB3B1]/20 py-6 px-6 space-y-4 shadow-xl z-40 md:hidden animate-slideDown"
            id="nav-mobile"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => selectPage(item.id)}
                className={`block w-full text-left font-sans text-base tracking-widest uppercase py-2.5 border-b border-[#AAB3B1]/10 ${
                  currentPage === item.id 
                    ? 'text-[#7C8C7A] font-semibold pl-2 border-l-2 border-l-[#7C8C7A]' 
                    : 'text-[#4B3F3A]/85 hover:text-[#4B3F3A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
