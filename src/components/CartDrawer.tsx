/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, CartItem, Product, Order } from '../types';
import { PRODUCTS, GIFTS, DICTIONARY } from '../data';
import { X, Trash2, Calendar, Clock as ClockIcon, Truck, Gift, ClipboardCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  currentLanguage: Language;
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: any, delta: number) => void;
  onRemoveItem: (productId: any) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  currentLanguage,
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'receipt'>('cart');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deliveryDate: '',
    timeSlot: 'morning' // 'morning' | 'afternoon'
  });
  const [orderId, setOrderId] = useState('');
  const [addCoolingBag, setAddCoolingBag] = useState(false);
  
  // Custom Merchant Bank details
  const [bankDetails, setBankDetails] = useState({
    bankName: '玉山商業銀行',
    bankCode: '808',
    accountNumber: '1351-940-028471',
    accountName: '晨霧製所手作工坊'
  });

  const t = (key: string) => {
    return DICTIONARY[key]?.[currentLanguage] || DICTIONARY[key]?.['zh'] || key;
  };

  // Load custom bank details and auto-populate user data when drawer opens or checkout starts
  React.useEffect(() => {
    if (isOpen) {
      // 1. Fetch custom merchant bank account set by the owner
      const cachedBank = localStorage.getItem('morning_mist_bank_details');
      if (cachedBank) {
        setBankDetails(JSON.parse(cachedBank));
      }

      // 2. Auto-populate from logged-in member
      const cachedMember = localStorage.getItem('morning_mist_current_member');
      if (cachedMember) {
        const mem = JSON.parse(cachedMember);
        setFormData((prev) => ({
          ...prev,
          fullName: prev.fullName || mem.fullName || '',
          phone: prev.phone || mem.phone || '',
          address: prev.address || mem.address || ''
        }));
      }
    }
  }, [isOpen, checkoutStep]);

  if (!isOpen) return null;

  // Resolve Cart Item products metadata
  const resolvedItems = cart.map((item) => {
    let title = '';
    let price = 0;
    let image = '';
    
    if (item.productId === 'giftbox-bundle') {
      const g = GIFTS[0];
      title = g?.title[currentLanguage] || '';
      price = g?.price || 0;
      image = g?.images[0] || '';
    } else {
      const p = PRODUCTS.find((prod) => prod.id === item.productId);
      title = p?.title[currentLanguage] || '';
      price = p?.price || 0;
      image = p?.images[0] || '';
    }

    return {
      productId: item.productId,
      title,
      price,
      image,
      quantity: item.quantity,
      itemTotal: price * item.quantity
    };
  });

  // Calculate Subtotals & Totals with Ice Bag Add-On
  const itemSubtotal = resolvedItems.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const coolingBagPrice = 399;
  const subtotal = itemSubtotal + (addCoolingBag ? coolingBagPrice : 0);
  const isFreeShipping = subtotal >= 1500;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 160);
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToDetails = () => {
    if (resolvedItems.length === 0) return;
    setCheckoutStep('form');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.deliveryDate) {
      alert(currentLanguage === 'zh' ? '請完整填寫收件資訊。' : 'Please fill in all empty fields.');
      return;
    }
    
    const stamp = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `MM-2026-${stamp}`;
    setOrderId(generatedId);

    // Save order record to logged-in member order historical archives
    const cachedMember = localStorage.getItem('morning_mist_current_member');
    if (cachedMember) {
      const mem = JSON.parse(cachedMember);
      
      const newOrder: Order = {
        id: generatedId,
        date: new Date().toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: resolvedItems.map((item) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: itemSubtotal,
        shippingFee,
        grandTotal,
        addCoolingBag,
        receiverName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        timeSlot: formData.timeSlot,
        status: 'pending_payment'
      };

      // Append new reservation
      const updatedMem = {
        ...mem,
        orders: [newOrder, ...(mem.orders || [])]
      };

      // Sync member active state and catalog persistence
      localStorage.setItem('morning_mist_current_member', JSON.stringify(updatedMem));
      
      const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]');
      const updatedMembers = allMembers.map((m: any) => 
        m.email.toLowerCase() === mem.email.toLowerCase() ? updatedMem : m
      );
      localStorage.setItem('morning_mist_members', JSON.stringify(updatedMembers));
    }

    setCheckoutStep('receipt');
  };

  const resetAllAndClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    setAddCoolingBag(false);
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      deliveryDate: '',
      timeSlot: 'morning'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-sheet">
      {/* Dark backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Canvas Body */}
      <div 
        className="relative bg-[#F5F5F2] w-full max-w-lg h-full flex flex-col justify-between shadow-2xl border-l border-[#AAB3B1]/25 z-10 animate-slideLeft overflow-hidden"
        id="cart-drawer-container"
      >
        
        {/* Drawer Header Segment */}
        <div className="p-6 border-b border-[#AAB3B1]/20 flex items-center justify-between bg-[#F5F5F2]">
          <div className="flex items-center space-x-2.5">
            <Gift className="w-5 h-5 text-[#7C8C7A]" />
            <h3 className="font-serif text-lg sm:text-xl text-[#4B3F3A] tracking-wider uppercase">
              {checkoutStep === 'cart' && t('cartTitle')}
              {checkoutStep === 'form' && t('checkoutTitle')}
              {checkoutStep === 'receipt' && t('orderSuccessTitle')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-[#AAB3B1]/20 text-[#4B3F3A] hover:bg-[#7C8C7A]/10 transition-colors"
            id="close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Drawer Content Segment */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: SHOPPING ITEMS LIST */}
          {checkoutStep === 'cart' && (
            resolvedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4 py-20" id="empty-cart-view">
                <div className="w-16 h-16 rounded-full bg-[#AAB3B1]/10 flex items-center justify-center text-[#AAB3B1]">
                  <Gift className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#4B3F3A]/75 font-sans leading-relaxed tracking-wider">
                  {t('cartEmpty')}
                </p>
                <button
                  onClick={onClose}
                  className="font-sans text-xs tracking-widest uppercase text-[#7C8C7A] hover:text-[#4B3F3A] border-b border-[#7C8C7A] pb-0.5"
                >
                  {currentLanguage === 'zh' ? '前往裝載風土' : 'Return to Boutique'}
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="cart-items-populated">
                {resolvedItems.map((item) => (
                  <div 
                    key={item.productId}
                    className="flex p-4 rounded-xl border border-[#AAB3B1]/20 bg-white/40 justify-between items-center"
                    id={`cart-item-row-${item.productId}`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-serif text-sm tracking-wide text-[#4B3F3A] line-clamp-1 max-w-[160px] sm:max-w-[180px]">
                          {item.title}
                        </h4>
                        <span className="font-mono text-xs text-[#AAB3B1] block">
                          {t('twdSymbol')} {item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center space-x-1 border border-[#AAB3B1]/20 rounded-full py-0.5 px-2 bg-white text-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, -1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#4B3F3A] hover:bg-[#7C8C7A]/10 font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-mono text-xs text-[#4B3F3A]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[#4B3F3A] hover:bg-[#7C8C7A]/10 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.productId)}
                        className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Co-purchase Ice bag Optional Add-on option */}
                <div 
                  className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 mt-6 cursor-pointer ${
                    addCoolingBag 
                      ? 'border-[#7C8C7A] bg-[#7C8C7A]/5 shadow-sm' 
                      : 'border-[#AAB3B1]/20 bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setAddCoolingBag(!addCoolingBag)}
                  id="ice-bag-addition-card"
                >
                  <div className="flex items-center h-5 mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      id="ice-cooling-chk"
                      checked={addCoolingBag}
                      onChange={(e) => {
                        e.stopPropagation();
                        setAddCoolingBag(e.target.checked);
                      }}
                      className="w-4 h-4 rounded text-[#7C8C7A] focus:ring-[#7C8C7A] focus:ring-opacity-40 accent-[#7C8C7A]"
                    />
                  </div>
                  <div className="space-y-1 select-none flex-grow">
                    <label 
                      htmlFor="ice-cooling-chk" 
                      className="block text-xs sm:text-sm font-serif font-bold text-[#4B3F3A] cursor-pointer flex justify-between items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{currentLanguage === 'zh' ? '加購 ── 晨霧專屬手作高質感保冰袋' : 'Add-on: Artisan Thermal Ice Bag'}</span>
                      <span className="font-mono text-[#7C8C7A]">NT$ 399</span>
                    </label>
                    <p className="text-[11px] text-stone-500 font-sans leading-relaxed">
                      {currentLanguage === 'zh' 
                        ? '加厚專用鋁箔層，維持 6 小時冷鏈低溫，鎖住法國 AOP 發酵奶油最香脆的酥鬆質地，送禮體面、自享安心。' 
                        : 'Custom 6-hour foil cooler bag, perfect for preserving the flaky lamellar shell during delivery.'}
                    </p>
                  </div>
                </div>

                {/* Free shipping logic progress bar tracker */}
                <div className="mt-8 p-4 bg-white/40 border border-[#AAB3B1]/20 rounded-xl" id="shipping-tracker-bar">
                  <div className="flex items-center justify-between text-xs font-sans tracking-wide mb-2">
                    <span className="text-[#4B3F3A]/80">{t('freeShippingApplied')}</span>
                    <span className="font-semibold text-[#7C8C7A]">
                      {isFreeShipping 
                        ? (currentLanguage === 'zh' ? '已免予運費' : 'Unlocked!') 
                        : `${t('twdSymbol')} ${subtotal} / ${t('twdSymbol')} 1,500`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#AAB3B1]/20 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#7C8C7A] h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (subtotal / 1500) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-[#AAB3B1] leading-relaxed">
                    {t('freeShippingLabel')}
                  </p>
                </div>
              </div>
            )
          )}

          {/* STEP 2: SHIPPING/LOGISTICS FORM */}
          {checkoutStep === 'form' && (
            <form onSubmit={handleOrderSubmit} className="space-y-4" id="checkout-form-block">
              {/* Receiver Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans tracking-widest uppercase text-[#4B3F3A]/80">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                  placeholder={currentLanguage === 'zh' ? '請輸入收件人姓名' : 'John Doe'}
                  id="field-fullname"
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans tracking-widest uppercase text-[#4B3F3A]/80">
                  {t('phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                  placeholder={currentLanguage === 'zh' ? '例：0912-345678' : '+886 912-345678'}
                  id="field-phone"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans tracking-widest uppercase text-[#4B3F3A]/80">
                  {t('address')} *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                  placeholder={currentLanguage === 'zh' ? '例：台北市信義區忠孝東路五段XX號' : 'Taipei City, Xinyi District...'}
                  id="field-address"
                />
              </div>

              {/* Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans tracking-widest uppercase text-[#4B3F3A]/80 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{t('deliveryDate')} *</span>
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                    id="field-deliverydate"
                  />
                </div>

                {/* Preferred time-slot */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans tracking-widest uppercase text-[#4B3F3A]/80 flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{t('deliveryTimeSlot')} *</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                    id="field-timeslot"
                  >
                    <option value="morning">{t('timeMorning')}</option>
                    <option value="afternoon">{t('timeAfternoon')}</option>
                  </select>
                </div>
              </div>

              {/* Notice text */}
              <p className="text-[10px] text-[#AAB3B1] leading-relaxed pt-2">
                * {currentLanguage === 'zh' 
                    ? '低溫冷鏈可頌請於收到後密封低溫保存，品嚐前建議使用小烤箱以 180°C 回烤 3 分鐘回溫。' 
                    : 'Keep pastries refrigerated. Reheat in a pre-warmed toaster oven at 180°C for 3 minutes before eating.'}
              </p>

              {/* PAYMENT METHOD DETAILED INFO CONTAINER */}
              <div className="p-4 bg-amber-50/30 border border-amber-200/40 rounded-xl space-y-2 mt-4" id="checkout-bank-details-info">
                <span className="text-xs font-semibold text-amber-900 block font-sans">
                  💰 指定付款：ATM 銀行轉帳付款
                </span>
                <p className="text-[11px] text-[#4B3F3A]/80 leading-relaxed font-sans">
                  預訂成立後程序：請在 24 小時內匯入指定收款行，並可登入頂端 <span className="font-semibold text-[#7C8C7A]">「會員中心」</span> 查詢並填報您的帳號後五碼供對帳：
                </p>
                <div className="p-3 bg-white/70 border border-[#AAB3B1]/20 rounded-lg text-xs leading-normal font-sans space-y-1">
                  <div><span className="text-stone-400">指定銀行：</span><span className="text-[#4B3F3A] font-semibold">{bankDetails.bankName} ({bankDetails.bankCode})</span></div>
                  <div><span className="text-stone-400">指定帳號：</span><span className="font-mono text-[#4B3F3A] font-semibold">{bankDetails.accountNumber}</span></div>
                  <div><span className="text-stone-400">收款戶名：</span><span className="text-[#4B3F3A] font-semibold">{bankDetails.accountName}</span></div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS LUXURY RECEIPT */}
          {checkoutStep === 'receipt' && (
            <div className="space-y-6" id="order-receipt-summary">
              
              {/* Luxury Stamp Stamp */}
              <div className="bg-[#7C8C7A]/10 border border-[#7C8C7A]/20 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#7C8C7A]/25 flex items-center justify-center text-[#7C8C7A] mx-auto">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-[#4B3F3A] tracking-wider font-semibold">
                  {currentLanguage === 'zh' ? '預訂已確認登記' : 'Atelier Booking Locked'}
                </h4>
                <p className="font-mono text-xs text-[#7C8C7A] font-semibold tracking-wider">
                  {orderId}
                </p>
                <p className="text-xs text-[#4B3F3A]/80 font-sans leading-relaxed tracking-wide">
                  {t('orderSuccessMsg')}
                </p>
              </div>

              {/* Receipt Bank Prompt card */}
              <div className="p-4 rounded-xl border border-dashed border-[#7C8C7A]/40 bg-[#7C8C7A]/5 text-xs font-sans space-y-2" id="receipt-bank-prompt">
                <span className="font-bold text-[#4B3F3A] block">📌 慢焙預訂：ATM 轉帳帳戶資訊</span>
                <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                  請將款項匯至下方指定帳戶，匯款完成後請至 <span className="font-semibold text-[#7C8C7A] underline">「會員中心」</span> 填報您匯款帳戶之後五碼，以便工坊快速確認對帳出貨。
                </p>
                <div className="p-3 bg-white/70 border border-[#AAB3B1]/20 rounded-lg space-y-1 text-xs">
                  <div><span className="text-stone-400">收款人銀行：</span><span className="font-semibold text-stone-700">{bankDetails.bankName} ({bankDetails.bankCode})</span></div>
                  <div><span className="text-stone-400">收款人帳號：</span><span className="font-mono font-semibold text-stone-700">{bankDetails.accountNumber}</span></div>
                  <div><span className="text-stone-400">收款戶名：</span><span className="font-semibold text-stone-700">{bankDetails.accountName}</span></div>
                </div>
              </div>

              {/* Receipt Breakdowns */}
              <div className="border border-dashed border-[#AAB3B1]/40 rounded-xl p-6 bg-white space-y-4">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#AAB3B1] block text-center border-b border-stone-100 pb-2">
                  晨霧製所 ✦ OFFICIAL RECEIPT
                </span>

                {/* Items loop */}
                <div className="space-y-2 border-b border-stone-100 pb-4 text-xs font-sans text-[#4B3F3A]">
                  {resolvedItems.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center py-1">
                      <span className="text-stone-600 font-serif">
                        {item.title} <span className="font-mono font-medium text-[11px]">× {item.quantity}</span>
                      </span>
                      <span className="font-mono">{t('twdSymbol')} {item.itemTotal}</span>
                    </div>
                  ))}
                  {addCoolingBag && (
                    <div className="flex justify-between items-center py-1 text-[#7C8C7A]">
                      <span className="font-serif">加購 ── 晨霧專屬手作保冰袋</span>
                      <span className="font-mono">{t('twdSymbol')} 399</span>
                    </div>
                  )}
                </div>

                {/* Logistics details */}
                <div className="space-y-1 text-xs font-sans text-[#4B3F3A] border-b border-stone-100 pb-4">
                  <div className="flex justify-between py-0.5">
                    <span className="text-stone-500">{currentLanguage === 'zh' ? '小計金額' : 'Subtotal'}</span>
                    <span className="font-mono">{t('twdSymbol')} {subtotal}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-stone-500">{t('shippingFee')}</span>
                    <span className="font-mono">{shippingFee === 0 ? 'FREE' : `${t('twdSymbol')} ${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-bold py-1 text-sm border-t border-dashed border-stone-100 mt-2">
                    <span>{t('totalLabel')}</span>
                    <span className="font-mono">{t('twdSymbol')} {grandTotal}</span>
                  </div>
                </div>

                {/* Deliver details block */}
                <div className="space-y-2 text-xs font-sans text-[#4B3F3A]">
                  <div className="flex items-start gap-1 text-stone-500">
                    <Truck className="w-3.5 h-3.5 text-[#7C8C7A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#4B3F3A]">{currentLanguage === 'zh' ? '配送對象：' : 'Recipient:'}</p>
                      <p className="text-stone-600">{formData.fullName} ({formData.phone})</p>
                      <p className="text-stone-600">{formData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <p className="text-stone-600">
                      <span className="font-semibold text-[#4B3F3A]">{currentLanguage === 'zh' ? '配送排程：' : 'Delivery date:'}</span> {formData.deliveryDate} ({formData.timeSlot === 'morning' ? (currentLanguage === 'zh' ? '清晨與上午' : 'Morning Window') : (currentLanguage === 'zh' ? '午後涼風' : 'Afternoon Window')})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Segment with checkout actions */}
        <div className="p-6 border-t border-[#AAB3B1]/20 bg-[#F5F5F2]">
          
          {checkoutStep === 'cart' && resolvedItems.length > 0 && (
            <div className="space-y-4">
              {/* Calculations Block */}
              <div className="space-y-1.5 text-sm font-sans text-[#4B3F3A]">
                <div className="flex justify-between">
                  <span className="text-[#4B3F3A]/75">{currentLanguage === 'zh' ? '品項小計：' : 'Checkout Subtotal:'}</span>
                  <span className="font-mono font-medium">{t('twdSymbol')} {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B3F3A]/75">{t('shippingFee')}</span>
                  <span className="font-mono font-medium">{shippingFee === 0 ? 'FREE' : `${t('twdSymbol')} ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-[#AAB3B1]/20 pt-2.5 mt-2.5">
                  <span>{t('totalLabel')}</span>
                  <span className="font-mono">{t('twdSymbol')} {grandTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleProceedToDetails}
                className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-full bg-[#4B3F3A] hover:bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase transition-all duration-300"
                id="cart-drawer-checkout-btn"
              >
                <span>{t('checkoutBtn')}</span>
              </button>
            </div>
          )}

          {checkoutStep === 'form' && (
            <div className="space-y-3">
              <div className="flex justify-between font-serif text-sm text-[#4B3F3A] mb-2 font-semibold">
                <span>{t('totalLabel')}</span>
                <span className="font-mono">{t('twdSymbol')} {grandTotal}</span>
              </div>
              <button
                type="submit"
                form="checkout-form-block"
                onClick={handleOrderSubmit}
                className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-full bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase hover:bg-[#7C8C7A]/90 transition-all duration-300"
                id="checkout-form-submit-btn"
              >
                <span>{t('submitOrder')}</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full text-center text-xs text-[#AAB3B1] uppercase font-sans tracking-widest py-1.5 hover:text-[#4B3F3A] transition-colors"
                id="checkout-form-back-btn"
              >
                {currentLanguage === 'zh' ? '回購物籃調整' : 'Back to Cart'}
              </button>
            </div>
          )}

          {checkoutStep === 'receipt' && (
            <button
              type="button"
              onClick={resetAllAndClose}
              className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-full bg-[#4B3F3A] hover:bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase transition-all duration-300"
              id="order-receipt-close-btn"
            >
              <span>{t('closeBtn')}</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
