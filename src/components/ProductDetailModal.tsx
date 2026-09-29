'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { X, Star, ShoppingCart, Shield, Truck, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen, setIsCheckoutOpen } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAddedToast(false);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Section */}
            <div className="relative aspect-square bg-slate-50 flex items-center justify-center p-6">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {selectedProduct.badge && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Right Details Section */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>

                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-sm font-bold text-slate-800">
                      {selectedProduct.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ({selectedProduct.reviewsCount} customer reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black text-slate-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  {selectedProduct.description}
                </p>

                {/* Quantity Control */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">Quantity</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    {addedToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all shadow-md shadow-blue-500/20"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-500" />
                    <span>Free Shipping $100+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
