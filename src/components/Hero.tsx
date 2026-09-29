'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl my-6 mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-slate-800">
      {/* Decorative Gradient Flares */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>LIMITED TIME PROMOTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Summer Tech & <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Lifestyle Sale
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
            Upgrade your daily routine with premium gear, gaming peripherals, and home smart accessories. Up to 40% off top-rated items.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#products"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Deals Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Value Props Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>Express Delivery</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Verified Quality</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900/60 p-6 border border-slate-700/50 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-full border border-amber-500/30">
                SAVE UP TO 40%
              </span>
              <span className="text-xs text-slate-400 font-mono">CODE: NOVA2026</span>
            </div>

            <div className="my-auto text-center space-y-3">
              <div className="w-28 h-28 mx-auto rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-inner">
                <ShoppingBag className="w-14 h-14" />
              </div>
              <h3 className="text-xl font-bold text-white">Smart Living & Tech Essentials</h3>
              <p className="text-xs text-slate-400">Curated products with 100% satisfaction guarantee</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
              <span>★ 4.9 Rating (1,200+ Reviews)</span>
              <span className="text-blue-400 font-semibold">Explore Catalog →</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
