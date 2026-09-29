'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Category } from '@/types';
import { Laptop, Shirt, Home as HomeIcon, Watch, Grid } from 'lucide-react';

const CATEGORY_ITEMS: { name: Category; icon: React.ElementType; color: string }[] = [
  { name: 'All', icon: Grid, color: 'from-slate-700 to-slate-900' },
  { name: 'Electronics', icon: Laptop, color: 'from-blue-600 to-indigo-700' },
  { name: 'Fashion', icon: Shirt, color: 'from-purple-600 to-pink-600' },
  { name: 'Home', icon: HomeIcon, color: 'from-amber-500 to-orange-600' },
  { name: 'Accessories', icon: Watch, color: 'from-emerald-600 to-teal-700' },
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Explore Categories</h2>
          <p className="text-xs text-slate-500">Filter through our wide selection of premium goods</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {CATEGORY_ITEMS.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 group relative overflow-hidden ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <span className={`text-sm font-bold block ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                  {cat.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  {cat.name === 'All' ? '12 Products' : 'Featured Collection'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
