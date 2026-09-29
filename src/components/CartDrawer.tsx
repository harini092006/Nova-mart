'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    discount,
    total,
    setIsCheckoutOpen,
    cartCount,
    clearCart,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMsg({ ok: res.ok, text: res.message });
    if (res.ok) setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-slate-900">Your Shopping Cart</h2>
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore our products and add your favorite tech & lifestyle items to the cart.
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const itemSubtotal = item.product.price * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-[72px] h-[72px] rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="pr-6">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Unit Price: ${item.product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Controls (Bug 3 embedded: updateQuantity does not change state quantity) */}
                          <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-slate-900">
                            ${itemSubtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button (Bug 5 embedded: removes wrong product from cart) */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Summary & Checkout Button (Bug 4 embedded: total/subtotal does not update dynamically) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-4">
                {/* Coupon */}
                {couponCode ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold rounded-xl px-3 py-2">
                    <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> {couponCode} applied</span>
                    <button onClick={handleRemoveCoupon} className="underline text-[11px]">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponMsg(null); }}
                        placeholder="Coupon code"
                        aria-label="Coupon code"
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors">
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <p className={`text-[11px] font-semibold ${couponMsg.ok ? 'text-emerald-600' : 'text-red-500'}`}>{couponMsg.text}</p>
                    )}
                  </form>
                )}

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-slate-800">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Summer Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Coupon ({couponCode})</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
