'use client';

import React from 'react';
import { ShoppingBag, ShieldCheck, RefreshCw, Headphones, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">100% Buyer Protection</h4>
              <p className="text-[11px] text-slate-400">Guaranteed authentic items and safe checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Hassle-Free Returns</h4>
              <p className="text-[11px] text-slate-400">30-day money-back policy on all orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">24/7 Priority Support</h4>
              <p className="text-[11px] text-slate-400">Dedicated assistance anytime you need help</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                NOVA <span className="text-blue-400">MART</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Everything you need. One smart cart. NOVA MART is a next-generation shopping store delivering top-tier consumer electronics, lifestyle gear, and smart home essentials.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#products" className="hover:text-white transition-colors">Electronics & Audio</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Fashion & Apparel</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Home & Living</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Smart Accessories</a></li>
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Event Info</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>TECH ODYSSEY 2026</li>
              <li>Tech Emergency Room</li>
              <li>Debugging Round 2</li>
              <li>Storefront Challenge #1</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 NOVA MART. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for TECH ODYSSEY 2026
          </p>
        </div>

      </div>
    </footer>
  );
};
