'use client';

import React, { useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const OrderSuccessModal: React.FC = () => {
  const { completedOrder, setCompletedOrder } = useShop();

  useEffect(() => {
    if (completedOrder) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if canvas context fails
      }
    }
  }, [completedOrder]);

  if (!completedOrder) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCompletedOrder(null)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Success Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 border border-slate-100 z-10 my-auto"
        >
          {/* Animated Check Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ORDER CONFIRMED
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight pt-2">
              Thank You, {completedOrder.customerName || 'Valued Customer'}!
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your order has been placed successfully and is now being processed by NOVA MART.
            </p>
          </div>

          {/* Order Info Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-3">
            <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Order Reference:</span>
              <span className="font-mono font-bold text-blue-600 text-sm">
                {completedOrder.orderId}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Total Paid:</span>
              <span className="font-extrabold text-slate-900">
                ${completedOrder.total.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700 pt-1">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold block">Estimated Delivery</span>
                <span className="text-slate-500">{completedOrder.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Purchased Items Preview */}
          <div className="text-xs text-slate-500 text-left space-y-1 max-h-28 overflow-y-auto pr-1">
            <span className="font-bold text-slate-700 block">Ordered Items:</span>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px] text-slate-600">
                <span className="truncate max-w-[200px]">{item.product.name} (x{item.quantity})</span>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setCompletedOrder(null)}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
