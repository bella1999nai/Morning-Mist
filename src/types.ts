/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'es';

export interface MultilingualText {
  zh: string;
  en: string;
  ja: string;
  ko: string;
  es: string;
}

export type FlavorType = 'lake' | 'tea' | 'coffee' | 'mountain';

export interface Product {
  id: string;
  flavor_type: FlavorType;
  price: number; // in TWD
  images: string[];
  title: MultilingualText;
  description: MultilingualText;
  story: MultilingualText;
  details?: {
    ingredients: MultilingualText;
    allergens: MultilingualText;
    weight: string;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface WebMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface StorySection {
  title: MultilingualText;
  paragraphs: MultilingualText[];
  image?: string;
}

export interface CraftStep {
  step: number;
  title: MultilingualText;
  description: MultilingualText;
  iconName: string;
}

export interface Testimonial {
  author: MultilingualText;
  role: MultilingualText;
  quote: MultilingualText;
}

export interface BankDetails {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  addCoolingBag: boolean;
  receiverName: string;
  phone: string;
  address: string;
  deliveryDate: string;
  timeSlot: string;
  status: 'pending_payment' | 'verifying' | 'completed';
  lastFiveDigits?: string;
  transferAmount?: string;
}

export interface Member {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  orders: Order[];
}

