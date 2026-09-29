'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from './ProductCard';
import { ShoppingBag, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, searchQuery, setSearchQuery, selectedCategory, wishlist, showWishlistOnly, setShowWishlistOnly } = useShop();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter products by category and searchQuery
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesWishlist = !showWishlistOnly || wishlist.includes(product.id);

    return matchesCategory && matchesSearch && matchesWishlist;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredProducts.length} items
            {searchQuery.trim() && <> for &ldquo;{searchQuery.trim()}&rdquo;</>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showWishlistOnly && (
            <button
              onClick={() => setShowWishlistOnly(false)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1"
            >
              Wishlist only <X className="w-3 h-3" />
            </button>
          )}
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-full px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {showWishlistOnly
              ? 'Tap the heart on a product to save it to your wishlist.'
              : 'Try adjusting your search terms or selecting a different category from above.'}
          </p>
          {(searchQuery || showWishlistOnly) && (
            <button
              onClick={() => { setSearchQuery(''); setShowWishlistOnly(false); }}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors"
            >
              Clear search &amp; filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
