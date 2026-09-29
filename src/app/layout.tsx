import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NOVA MART | Everything you need. One smart cart.',
  description: 'TECH ODYSSEY 2026 - Official Nova Mart online store.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
