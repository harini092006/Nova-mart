'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderSuccessModal } from '@/components/OrderSuccessModal';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { useShop } from '@/context/ShopContext';

export default function Home() {
  const { setIsCartOpen, setIsCheckoutOpen, setSelectedProduct, setCompletedOrder } = useShop();

  // Esc closes any open overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
      setSelectedProduct(null);
      setCompletedOrder(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsCartOpen, setIsCheckoutOpen, setSelectedProduct, setCompletedOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryFilter />
        <ProductGrid />
      </main>
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <Toast />
    </div>
  );
}
