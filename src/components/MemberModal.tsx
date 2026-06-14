/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Member, Order, BankDetails, Language } from '../types';
import { X, User, Lock, Mail, Phone, MapPin, CreditCard, History, LogIn, LogOut, CheckCircle, Settings, ClipboardCheck, AlertCircle } from 'lucide-react';

interface MemberModalProps {
  currentLanguage: Language;
  isOpen: boolean;
  onClose: () => void;
  onLoginStateChange: () => void; // callbacks when login or logout occurs
}

export default function MemberModal({ currentLanguage, isOpen, onClose, onLoginStateChange }: MemberModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile' | 'orders' | 'merchant_setup'>('login');
  
  // Auth Form parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Active Member State
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  // Bank transfer inputs (specific per order verification)
  const [reportingOrderId, setReportingOrderId] = useState<string | null>(null);
  const [lastFiveDigits, setLastFiveDigits] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [reportSuccess, setReportSuccess] = useState('');

  // Merchant Bank Setup parameters
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: '玉山商業銀行',
    bankCode: '808',
    accountNumber: '1351-940-028471',
    accountName: '晨霧製所手作工坊'
  });

  // Load existing credentials & current logins
  useEffect(() => {
    if (isOpen) {
      // Load current member
      const cachedMember = localStorage.getItem('morning_mist_current_member');
      if (cachedMember) {
        const mem = JSON.parse(cachedMember) as Member;
        // Fetch fresh copy with updated order history
        const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]') as Member[];
        const freshMem = allMembers.find(m => m.email === mem.email) || mem;
        setCurrentMember(freshMem);
        setActiveTab('profile');
      } else {
        setCurrentMember(null);
        setActiveTab('login');
      }

      // Load Merchant bank details (or create default)
      const cachedBank = localStorage.getItem('morning_mist_bank_details');
      if (cachedBank) {
        setBankDetails(JSON.parse(cachedBank));
      } else {
        const defBank: BankDetails = {
          bankName: '玉山商業銀行',
          bankCode: '808',
          accountNumber: '1351-940-028471',
          accountName: '晨霧製所手作工坊'
        };
        localStorage.setItem('morning_mist_bank_details', JSON.stringify(defBank));
        setBankDetails(defBank);
      }
    }
    // Clean states
    setAuthError('');
    setAuthSuccess('');
    setReportSuccess('');
    setReportingOrderId(null);
    setLastFiveDigits('');
    setTransferAmount('');
  }, [isOpen]);

  if (!isOpen) return null;

  // Sign in logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !password) {
      setAuthError(currentLanguage === 'zh' ? '請填寫所有欄位。' : 'Please fill in all credentials.');
      return;
    }

    const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]') as Member[];
    const matched = allMembers.find(m => m.email.toLowerCase() === email.toLowerCase());

    if (!matched) {
      // Register them automatically as a premier test user or throw error?
      // Let's support graceful register instead or prompt registration
      setAuthError(currentLanguage === 'zh' ? '此帳號尚未註冊，請切換至「註冊」分頁。' : 'Account not found. Please click register first.');
      return;
    }

    // Success login
    localStorage.setItem('morning_mist_current_member', JSON.stringify(matched));
    setCurrentMember(matched);
    setActiveTab('profile');
    onLoginStateChange();
  };

  // Registration logic
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !password || !fullName || !phone || !address) {
      setAuthError(currentLanguage === 'zh' ? '請填寫所有必要欄位。' : 'Please fill in all required setup fields.');
      return;
    }

    const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]') as Member[];
    const exist = allMembers.some(m => m.email.toLowerCase() === email.toLowerCase());

    if (exist) {
      setAuthError(currentLanguage === 'zh' ? '此電子信箱已被註冊。' : 'This email is already in use.');
      return;
    }

    const newMem: Member = {
      id: `MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      fullName,
      phone,
      address,
      orders: []
    };

    allMembers.push(newMem);
    localStorage.setItem('morning_mist_members', JSON.stringify(allMembers));
    localStorage.setItem('morning_mist_current_member', JSON.stringify(newMem));
    setCurrentMember(newMem);
    
    setAuthSuccess(currentLanguage === 'zh' ? '註冊成功！' : 'Registered successfully!');
    setTimeout(() => {
      setActiveTab('profile');
      setAuthSuccess('');
    }, 1500);

    onLoginStateChange();
  };

  // Sign out logic
  const handleLogout = () => {
    localStorage.removeItem('morning_mist_current_member');
    setCurrentMember(null);
    setActiveTab('login');
    onLoginStateChange();
  };

  // Save modified profile changes back to local storage list
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember) return;

    const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]') as Member[];
    const updatedMembers = allMembers.map(m => {
      if (m.email.toLowerCase() === currentMember.email.toLowerCase()) {
        return {
          ...m,
          fullName: currentMember.fullName,
          phone: currentMember.phone,
          address: currentMember.address
        };
      }
      return m;
    });

    const activeUpdated = {
      ...currentMember,
      fullName: currentMember.fullName,
      phone: currentMember.phone,
      address: currentMember.address
    };

    localStorage.setItem('morning_mist_members', JSON.stringify(updatedMembers));
    localStorage.setItem('morning_mist_current_member', JSON.stringify(activeUpdated));
    setCurrentMember(activeUpdated);

    setAuthSuccess(currentLanguage === 'zh' ? '個人資料升級成功。' : 'Profile updated successfully.');
    setTimeout(() => {
      setAuthSuccess('');
    }, 2000);
  };

  // Merchant Setup updates
  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('morning_mist_bank_details', JSON.stringify(bankDetails));
    setAuthSuccess(currentLanguage === 'zh' ? '匯款設定更新已儲存！' : 'Bank configuration applied!');
    setTimeout(() => {
      setAuthSuccess('');
    }, 2000);
  };

  // Submit bank transfer last-five-digits verification
  const handleSubmitTransferProof = (orderId: string) => {
    if (!lastFiveDigits || !transferAmount) {
      alert(currentLanguage === 'zh' ? '請完整填寫轉帳帳號後五碼與金額。' : 'Please write your bank digits & amount.');
      return;
    }

    if (!currentMember) return;

    // Load and update overall members records
    const allMembers = JSON.parse(localStorage.getItem('morning_mist_members') || '[]') as Member[];
    const updatedMembers = allMembers.map(m => {
      if (m.email.toLowerCase() === currentMember.email.toLowerCase()) {
        const updatedOrders = m.orders.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              status: 'verifying' as const,
              lastFiveDigits,
              transferAmount
            };
          }
          return o;
        });
        return { ...m, orders: updatedOrders };
      }
      return m;
    });

    localStorage.setItem('morning_mist_members', JSON.stringify(updatedMembers));
    
    // Update active state
    const matchedMem = updatedMembers.find(m => m.email.toLowerCase() === currentMember.email.toLowerCase());
    if (matchedMem) {
      localStorage.setItem('morning_mist_current_member', JSON.stringify(matchedMem));
      setCurrentMember(matchedMem);
    }

    setReportSuccess(currentLanguage === 'zh' ? '匯款資料已成功送出審核！' : 'Proof submitted successfully!');
    setTimeout(() => {
      setReportingOrderId(null);
      setLastFiveDigits('');
      setTransferAmount('');
      setReportSuccess('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="member-portal-modal">
      {/* Absolute background close clickable area */}
      <div className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative bg-[#F5F5F2] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#AAB3B1]/20 flex flex-col max-h-[90vh] overflow-hidden z-10 animate-scaleUp">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#AAB3B1]/25 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <User className="w-5 h-5 text-[#7C8C7A]" />
            <h3 className="font-serif text-lg sm:text-xl text-[#4B3F3A] tracking-wider uppercase">
              {currentLanguage === 'zh' ? '晨霧製所 ✦ 會員與商戶中心' : 'Atelier Member & merchant Portal'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-[#AAB3B1]/20 text-[#4B3F3A] hover:bg-[#7C8C7A]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs for Logged-In User */}
        {currentMember && (
          <div className="bg-stone-200/50 flex border-b border-[#AAB3B1]/10 text-xs sm:text-sm font-sans tracking-widest uppercase overflow-x-auto shrink-0">
            <button
              onClick={() => { setActiveTab('profile'); setReportingOrderId(null); }}
              className={`flex-1 py-3.5 px-4 text-center border-b-2 font-medium transition-all min-w-[100px] ${
                activeTab === 'profile' ? 'border-[#7C8C7A] text-[#7C8C7A]' : 'border-transparent text-[#4B3F3A]/70 hover:text-[#4B3F3A]'
              }`}
            >
              個人資料 (Profile)
            </button>
            <button
              onClick={() => { setActiveTab('orders'); setReportingOrderId(null); }}
              className={`flex-1 py-3.5 px-4 text-center border-b-2 font-medium transition-all min-w-[120px] ${
                activeTab === 'orders' ? 'border-[#7C8C7A] text-[#7C8C7A]' : 'border-transparent text-[#4B3F3A]/70 hover:text-[#4B3F3A]'
              }`}
            >
              歷史訂單 (Orders)
              {currentMember.orders?.length > 0 && (
                <span className="ml-1.5 bg-[#7C8C7A] text-[#F5F5F2] text-[10px] py-0.2 px-1.5 rounded-full">
                  {currentMember.orders.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('merchant_setup'); setReportingOrderId(null); }}
              className={`flex-1 py-3.5 px-4 text-center border-b-2 font-medium transition-all bg-amber-50/20 text-[#7C8C7A] min-w-[150px] ${
                activeTab === 'merchant_setup' ? 'border-[#7C8C7A] font-semibold bg-amber-50/40' : 'border-transparent hover:text-[#4B3F3A]'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Settings className="w-4 h-4" />
                商家轉帳設定
              </span>
            </button>
          </div>
        )}

        {/* Dynamic Inner Body Scroll Area */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-8">
          
          {/* Notification Banners */}
          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-xs sm:text-sm font-sans flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}
          {authSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-sans flex items-center gap-2 border border-emerald-100 animate-pulse">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* TAB 1: LOGIN (WHEN LOGGED OUT) */}
          {!currentMember && activeTab === 'login' && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h4 className="font-serif text-xl text-[#4B3F3A] tracking-wider">
                  {currentLanguage === 'zh' ? '登入晨霧會員中心' : 'Sign In with Morning Mist'}
                </h4>
                <p className="text-xs text-[#AAB3B1] leading-relaxed tracking-wider">
                  {currentLanguage === 'zh' 
                    ? '登入可享快速結帳與隨時查詢訂單、回報轉帳後五碼功能。' 
                    : 'Track orders, reports transfer credentials, and manage delivery addresses.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{currentLanguage === 'zh' ? '電子郵件 (Email)' : 'Email address'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@morningmist.com"
                    className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{currentLanguage === 'zh' ? '密碼 (Password)' : 'Password'}</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A] focus:outline-none focus:border-[#7C8C7A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-[#4B3F3A] hover:bg-[#7C8C7A] text-[#F5F5F2] font-sans text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  <span>{currentLanguage === 'zh' ? '登入' : 'Sign In'}</span>
                </button>
              </form>

              {/* Toggle to Register */}
              <div className="text-center pt-2">
                <button
                  onClick={() => { setActiveTab('register'); setAuthError(''); }}
                  className="text-xs text-[#7C8C7A] hover:text-[#4B3F3A] font-sans tracking-wider hover:underline"
                >
                  {currentLanguage === 'zh' ? '還不是會員？加入我們的晨旅' : 'New here? Register a free account'}
                </button>
              </div>

              {/* Test accounts notification */}
              <div className="p-4 bg-[#7C8C7A]/5 border border-[#7C8C7A]/25 rounded-xl text-center">
                <p className="text-[11px] text-[#7C8C7A] uppercase tracking-widest font-semibold mb-1">
                  💡 貼心預載提示
                </p>
                <p className="text-[11px] text-[#4B3F3A]/75 leading-relaxed font-sans">
                  您可以直接點擊「新會員註冊」輸入任何電子郵件建立模擬會員，就能立刻體驗下單後一鍵自動填寫寄送資料，與個人歷史訂單中回報轉帳後五碼！
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTER (WHEN LOGGED OUT) */}
          {!currentMember && activeTab === 'register' && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h4 className="font-serif text-xl text-[#4B3F3A] tracking-wider">
                  {currentLanguage === 'zh' ? '開啟您的晨光烘焙旅程' : 'Join the Morning Mist Circle'}
                </h4>
                <p className="text-xs text-[#AAB3B1] leading-relaxed tracking-wider">
                  {currentLanguage === 'zh' ? '完成簡單註冊，即享 VIP 手作訂製保障、與轉帳物流追蹤。' : 'Create an account to persist order statuses.'}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans tracking-wide uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '電子郵件 *' : 'Email'}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans tracking-wide uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#7C8C7A]" />
                      <span>{currentLanguage === 'zh' ? '設定密碼 *' : 'Password'}</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans tracking-wide uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{currentLanguage === 'zh' ? '收件人姓名 *' : 'Receiver Name'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="請輸入姓名"
                    className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans tracking-wide uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{currentLanguage === 'zh' ? '聯絡電話 *' : 'Phone'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912-345678"
                    className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans tracking-wide uppercase text-[#4B3F3A]/70 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7C8C7A]" />
                    <span>{currentLanguage === 'zh' ? '常配送地址 *' : 'Default Address'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="例：台北市信義區忠孝東路五段XX號"
                    className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white text-[#4B3F3A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3 rounded-full bg-[#7C8C7A] hover:bg-[#7C8C7A]/95 text-[#F5F5F2] font-sans text-sm tracking-widest uppercase transition-all"
                >
                  <span>{currentLanguage === 'zh' ? '完成註冊並登入' : 'Create Account'}</span>
                </button>
              </form>

              {/* Toggle back to Login */}
              <div className="text-center pt-2">
                <button
                  onClick={() => { setActiveTab('login'); setAuthError(''); }}
                  className="text-xs text-[#AAB3B1] hover:text-[#4B3F3A] font-sans tracking-wider"
                >
                  {currentLanguage === 'zh' ? '已有帳號？返回登入介面' : 'Already have an account? Sign In'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MEMBER PROFILE (LOGGED IN) */}
          {currentMember && activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#AAB3B1]/20 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#7C8C7A]/10 flex items-center justify-center text-[#7C8C7A]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#4B3F3A] tracking-wider font-semibold">
                      {currentMember.fullName}
                    </h4>
                    <span className="font-sans text-xs text-[#AAB3B1]">
                      會員 ID: {currentMember.id} || 帳號: {currentMember.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center space-x-1.5 py-2 px-4 rounded-full border border-red-200 text-red-600 bg-white hover:bg-red-50 font-sans text-xs tracking-widest uppercase transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'zh' ? '登出會員' : 'Logout'}</span>
                </button>
              </div>

              {/* Profile details editing form */}
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <h5 className="font-serif text-sm tracking-widest text-[#4B3F3A] uppercase font-bold border-b border-[#AAB3B1]/10 pb-2">
                  修改常用收件資料 (My Shipping Profile)
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/70 font-semibold uppercase tracking-wider">
                      {currentLanguage === 'zh' ? '收件姓名' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={currentMember.fullName}
                      onChange={(e) => setCurrentMember({ ...currentMember, fullName: e.target.value })}
                      className="w-full p-2.5 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/70 font-semibold uppercase tracking-wider">
                      {currentLanguage === 'zh' ? '常聯絡電話' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={currentMember.phone}
                      onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
                      className="w-full p-2.5 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-sans text-[#4B3F3A]/70 font-semibold uppercase tracking-wider">
                    {currentLanguage === 'zh' ? '常運送地址 (只限台灣本島)' : 'Delivery Address'}
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMember.address}
                    onChange={(e) => setCurrentMember({ ...currentMember, address: e.target.value })}
                    className="w-full p-2.5 font-sans text-sm rounded-xl border border-[#AAB3B1]/40 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-[#7C8C7A] text-[#F5F5F2] font-sans text-xs tracking-widest uppercase hover:bg-[#7C8C7A]/90 transition-all font-semibold"
                >
                  {currentLanguage === 'zh' ? '儲存常用收件設定' : 'Update Profile Specifications'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: MEMBER ORDERS (LOGGED IN) */}
          {currentMember && activeTab === 'orders' && (
            <div className="space-y-6">
              <h4 className="font-serif text-base text-[#4B3F3A] tracking-wider font-semibold border-b border-[#AAB3B1]/20 pb-2">
                您的慢焙預訂歷史 (Your Bookings)
              </h4>

              {(!currentMember.orders || currentMember.orders.length === 0) ? (
                <div className="py-16 text-center space-y-4 bg-white border border-[#AAB3B1]/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#AAB3B1] mx-auto">
                    <History className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-[#AAB3B1] tracking-wider uppercase font-sans">
                    {currentLanguage === 'zh' ? '目前尚無預訂歷史' : 'No order history yet'}
                  </p>
                  <p className="text-xs text-[#4B3F3A]/85 font-sans">
                    {currentLanguage === 'zh' ? '前往工坊放入美味可頌，開始您的首張微霧預訂。' : 'Choose and buy your custom croissants today.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentMember.orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-[#AAB3B1]/20 rounded-2xl bg-white/50 overflow-hidden shadow-sm"
                      id={`order-record-${order.id}`}
                    >
                      {/* Accordion header style */}
                      <div className="p-4 sm:p-5 bg-stone-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-[#AAB3B1]/10 text-xs font-sans">
                        <div className="space-y-1">
                          <span className="font-bold text-[#4B3F3A] block">訂單編號: {order.id}</span>
                          <span className="text-stone-400 block">建立時間: {order.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Payment status tag styling */}
                          {order.status === 'pending_payment' && (
                            <span className="bg-amber-150 text-amber-800 border border-amber-200 py-1 px-3 rounded-full font-sans tracking-wide text-[10px] font-bold uppercase">
                              待轉帳付款
                            </span>
                          )}
                          {order.status === 'verifying' && (
                            <span className="bg-blue-10/70 text-blue-800 border border-blue-200 py-1 px-3 rounded-full font-sans tracking-wide text-[10px] font-semibold uppercase">
                              匯款審核中 (後五碼: {order.lastFiveDigits})
                            </span>
                          )}
                          {order.status === 'completed' && (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 py-1 px-3 rounded-full font-sans tracking-wide text-[10px] font-bold uppercase">
                              對帳完成 ✦ 準備低溫配送
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Accordion product list */}
                      <div className="p-5 space-y-4">
                        <div className="space-y-2 text-xs font-sans">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-1">
                              <span className="text-stone-700 font-serif">
                                {item.title} <span className="font-mono text-stone-400 font-semibold">× {item.quantity}</span>
                              </span>
                              <span className="font-mono font-medium">NT$ {item.price * item.quantity}</span>
                            </div>
                          ))}
                          
                          {/* Ice bag indicator */}
                          {order.addCoolingBag && (
                            <div className="flex justify-between items-center py-1 text-[#7C8C7A]">
                              <span className="font-serif">加購 ── 晨霧專屬手作保冰袋</span>
                              <span className="font-mono">NT$ 399</span>
                            </div>
                          )}
                        </div>

                        {/* Order billing summary */}
                        <div className="pt-3 border-t border-dashed border-stone-200/60 flex justify-between text-xs font-sans">
                          <span className="text-[#AAB3B1] uppercase font-bold tracking-widest font-sans flex items-center">
                            運費 NT$ {order.shippingFee} ✦ 總計額
                          </span>
                          <span className="text-base font-semibold font-mono text-[#4B3F3A]">
                            NT$ {order.grandTotal}
                          </span>
                        </div>

                        {/* PAYMENT PROOF INPUT REPORT */}
                        {order.status === 'pending_payment' && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50/50 border border-amber-150/40 space-y-3">
                            <span className="text-xs font-semibold text-amber-900 block font-sans">
                              🔗 匯款轉帳回報
                            </span>
                            <p className="text-[11px] text-stone-500 font-sans leading-relaxed">
                              請匯款至下排「商家轉帳資訊」，完成轉帳後填入您匯款的帳號後五碼、及金額送出，本店對帳後會立即寄送低溫黑貓物流。
                            </p>
                            
                            {reportingOrderId === order.id ? (
                              <div className="space-y-3 pt-1">
                                {reportSuccess && (
                                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-sans">
                                    {reportSuccess}
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    maxLength={5}
                                    required
                                    placeholder="轉帳帳號後五碼"
                                    value={lastFiveDigits}
                                    onChange={(e) => setLastFiveDigits(e.target.value)}
                                    className="p-2.5 rounded-lg border border-[#AAB3B1]/40 bg-white font-sans text-xs"
                                  />
                                  <input
                                    type="number"
                                    required
                                    placeholder="轉帳金額 (NT$)"
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                    className="p-2.5 rounded-lg border border-[#AAB3B1]/40 bg-white font-sans text-xs"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSubmitTransferProof(order.id)}
                                    className="flex-1 bg-[#7C8C7A] hover:bg-[#7C8C7A]/90 text-white font-sans font-semibold text-[11px] uppercase tracking-wider py-2 px-3 rounded-full"
                                  >
                                    確認送出回報
                                  </button>
                                  <button
                                    onClick={() => setReportingOrderId(null)}
                                    className="bg-[#AAB3B1]/20 text-[#4B3F3A] font-sans font-semibold text-[11px] py-2 px-3 rounded-full"
                                  >
                                    取消
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setReportingOrderId(order.id);
                                  setLastFiveDigits('');
                                  setTransferAmount(order.grandTotal.toString());
                                }}
                                className="inline-flex items-center space-x-1 py-1.5 px-3 rounded-full bg-[#4B3F3A] hover:bg-[#7C8C7A] text-white font-sans text-[11px] uppercase tracking-wider transition-all"
                              >
                                <ClipboardCheck className="w-3.5 h-3.5" />
                                <span>填寫轉帳後五碼資料</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* DISPLAY REPORTED TRANSFER DETAILS */}
                        {order.status === 'verifying' && (
                          <div className="p-3 bg-blue-10/10 border border-blue-200/50 rounded-xl text-[11px] font-sans text-stone-500 leading-normal">
                            已收到回報資料 ✦ <span className="font-semibold text-stone-600">帳號後五碼：{order.lastFiveDigits}</span>，金額：<span className="font-semibold text-stone-600">NT$ {order.transferAmount}</span>。我們正安排對帳中，完成後將變更為配送狀態。
                          </div>
                        )}
                        
                        {/* Shipping and recipient info summary */}
                        <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans text-stone-400">
                          <div>
                            <span className="text-[#4B3F3A]/70 font-semibold block">配送資料：</span>
                            <span>{order.receiverName} ({order.phone})</span><br />
                            <span className="line-clamp-1">{order.address}</span>
                          </div>
                          <div>
                            <span className="text-[#4B3F3A]/70 font-semibold block">送達日程：</span>
                            <span>{order.deliveryDate} ({order.timeSlot === 'morning' ? '上午八點至下午一點' : '下午兩點至傍晚六點'})</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MERCHANT BANK SETUP */}
          {currentMember && activeTab === 'merchant_setup' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-serif text-base text-[#4B3F3A] tracking-wider font-semibold border-b border-[#AAB3B1]/20 pb-2">
                  🏦 商家收款銀行帳號設定 (Atelier Bank Details)
                </h4>
                <p className="text-xs text-[#AAB3B1] leading-relaxed font-sans">
                  此處為「晨霧製所」線上商店所提供的銀行帳戶，顧客下單後在結帳畫面、以及結帳收據上會「即時顯示」此帳戶作為顧客匯款依據。您可以隨意在此更改您的收款人、銀行與帳號。
                </p>
              </div>

              <form onSubmit={handleSaveBankDetails} className="space-y-4 bg-white/60 p-5 rounded-2xl border border-[#AAB3B1]/20 shadow-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/80 font-bold uppercase tracking-wider">
                      銀行名稱 / Bank Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                      placeholder="例：玉山商業銀行"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/80 font-bold uppercase tracking-wider">
                      銀行代碼 / Code
                    </label>
                    <input
                      type="text"
                      required
                      value={bankDetails.bankCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankCode: e.target.value })}
                      placeholder="例：808"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/80 font-bold uppercase tracking-wider">
                      帳戶號碼 / Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      placeholder="例：1351-940-028471"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-sans text-[#4B3F3A]/80 font-bold uppercase tracking-wider">
                      戶名 (帳戶名稱) / Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                      placeholder="例：晨霧製所手作工坊"
                      className="w-full p-2.5 font-sans text-xs rounded-xl border border-[#AAB3B1]/40 bg-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#AAB3B1]/10">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-[#7C8C7A] text-[#F5F5F2] font-sans text-xs tracking-widest uppercase hover:bg-[#7C8C7A]/90 transition-all font-semibold"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>更新儲存收款銀行設定</span>
                  </button>

                  <span className="text-[10px] text-stone-400 font-sans uppercase">
                    💾 Saves live to persistent storage
                  </span>
                </div>
              </form>

              {/* Bank Account visualization card */}
              <div className="bg-gradient-to-tr from-[#4B3F3A] to-[#7C8C7A]/90 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                  <User className="w-40 h-40" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="font-serif text-sm tracking-[0.2em] font-semibold">晨霧製所指定收帳卡</span>
                    <span className="bg-white/15 text-[9px] uppercase tracking-wider font-semibold py-0.5 px-3 rounded-full">ACTIVE MERCH</span>
                  </div>
                  <div className="pt-2 font-mono text-lg tracking-wider text-[#F5F5F2]">
                    {bankDetails.accountNumber}
                  </div>
                  <div className="grid grid-cols-2 pt-4 gap-2 text-xs">
                    <div>
                      <span className="block text-[9px] text-[#AAB3B1] uppercase tracking-wider">銀行名與代碼</span>
                      <span className="font-semibold font-serif">{bankDetails.bankName} ({bankDetails.bankCode})</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-[#AAB3B1] uppercase tracking-wider">專屬戶名</span>
                      <span className="font-semibold font-serif">{bankDetails.accountName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer (Credit line or Quick helpful link) */}
        <div className="p-4 bg-stone-100 border-t border-[#AAB3B1]/20 flex items-center justify-between text-[11px] font-sans text-stone-400">
          <span>{currentLanguage === 'zh' ? '✦ 晨霧製所 AOP 低溫烘焙工藝' : '✦ Morning Mist Lamination Collective'}</span>
          <span>© 2026</span>
        </div>

      </div>
    </div>
  );
}
