'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Product, CartItem, Category, CheckoutFormData, OrderConfirmation } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';

interface ShopContextType {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: OrderConfirmation | null;
  setCompletedOrder: (order: OrderConfirmation | null) => void;
  placeOrder: (formData: CheckoutFormData) => void;
  clearCart: () => void;
  cartCount: number;
  couponCode: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  showWishlistOnly: boolean;
  setShowWishlistOnly: (show: boolean) => void;
  toast: string | null;
  showToast: (message: string) => void;
}

export const COUPONS: Record<string, number> = { NOVA2026: 0.1 };
const STORAGE_KEY = 'nova-mart-state-v1';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Restore cart / wishlist / coupon after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.cart)) {
          const restored: CartItem[] = [];
          saved.cart.forEach((item: { productId: string; quantity: number }) => {
            const product = INITIAL_PRODUCTS.find(p => p.id === item.productId);
            if (product && item.quantity > 0) restored.push({ product, quantity: item.quantity });
          });
          setCart(restored);
        }
        if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist);
        if (typeof saved.couponCode === 'string' && COUPONS[saved.couponCode]) setCouponCode(saved.couponCode);
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cart: cart.map(i => ({ productId: i.product.id, quantity: i.quantity })),
          wishlist,
          couponCode,
        })
      );
    } catch {
      // storage unavailable
    }
  }, [cart, wishlist, couponCode, hydrated]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (message: string) => setToast(message);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const has = prev.includes(productId);
      return has ? prev.filter(id => id !== productId) : [...prev, productId];
    });
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: 'Enter a coupon code' };
    if (!COUPONS[normalized]) return { ok: false, message: 'Invalid coupon code' };
    setCouponCode(normalized);
    return { ok: true, message: `${normalized} applied — ${COUPONS[normalized] * 100}% off` };
  };

  const removeCoupon = () => setCouponCode(null);

  // Add product to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    showToast(`${product.name} added to cart`);
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = cart.length > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const discount = subtotal > 150 ? 15.00 : 0;
  const couponDiscount = couponCode
    ? Math.round(subtotal * (COUPONS[couponCode] || 0) * 100) / 100
    : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount - couponDiscount);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const placeOrder = (formData: CheckoutFormData) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: OrderConfirmation = {
      orderId: `#NM-${randomNum}`,
      items: [...cart],
      total: total,
      customerName: formData.fullName,
      estimatedDelivery: '3–5 Business Days'
    };

    setCompletedOrder(newOrder);
    setIsCheckoutOpen(false);
    clearCart();
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        deliveryFee,
        discount,
        total,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        placeOrder,
        clearCart,
        cartCount,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        showWishlistOnly,
        setShowWishlistOnly,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
