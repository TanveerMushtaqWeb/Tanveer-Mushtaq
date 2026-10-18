/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CableFinder } from './components/CableFinder';
import { ProductCatalog } from './components/ProductCatalog';
import { CableAnatomyViewer } from './components/CableAnatomyViewer';
import { WholesaleDealership } from './components/WholesaleDealership';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { AITechnicalAdvisor } from './components/AITechnicalAdvisor';

import { CableProduct, QuoteItem } from './types';
import { CABLE_PRODUCTS } from './data/cablesData';
import { Sparkles, MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  
  // Modals & Drawers state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CableProduct | null>(null);

  // Quote cart state - start with top 2 bestsellers preloaded for great UX
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem('tfc_quote_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default starter items
    return [
      { product: CABLE_PRODUCTS[0], quantity: 30, unitType: 'pieces' },
      { product: CABLE_PRODUCTS[4], quantity: 30, unitType: 'pieces' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tfc_quote_items', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const handleAddToQuote = (product: CableProduct) => {
    setQuoteItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 10 }
            : item
        );
      }
      return [...prev, { product, quantity: 20, unitType: 'pieces' }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearAll = () => {
    setQuoteItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${language === 'ur' ? 'font-urdu' : ''}`}>
      
      {/* Top sticky navigation */}
      <Navbar
        quoteCount={quoteItems.length}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'ur' : 'en')}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onFindCable={() => scrollToSection('cable-finder')}
          onRequestQuote={() => scrollToSection('wholesale')}
          language={language}
        />

        {/* 2. Interactive Motorcycle Compatibility Matcher */}
        <CableFinder
          onAddToQuote={handleAddToQuote}
          onSelectProduct={(p) => setSelectedProduct(p)}
          language={language}
        />

        {/* 3. Detailed Product Catalog with Grid & Table views */}
        <ProductCatalog
          onAddToQuote={handleAddToQuote}
          onSelectProduct={(p) => setSelectedProduct(p)}
          language={language}
        />

        {/* 4. Interactive 5-Layer Cable Anatomy */}
        <CableAnatomyViewer
          language={language}
        />

        {/* 5. Wholesale, Dealership Program & Profit Calculator */}
        <WholesaleDealership
          language={language}
        />

        {/* 6. Manufacturing Facility & Quality Testing */}
        <ManufacturingProcess
          language={language}
        />

        {/* 7. Verified Pakistani Market Testimonials */}
        <Testimonials
          language={language}
        />

        {/* 8. Frequently Asked Questions */}
        <FAQSection
          language={language}
        />

        {/* 9. Contact & Factory Location */}
        <ContactLocation
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
      />

      {/* Floating Quick Action Buttons on Mobile & Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Technical Advisor Quick Trigger */}
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/50 text-amber-400 text-xs font-bold shadow-xl shadow-slate-950/60 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          title="Ask Tanveer Cable Advisor"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
          <span className="hidden sm:inline">Ask Cable Expert</span>
        </button>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/923008472911?text=Assalam-o-Alaikum%20Tanveer%20Factory%20Cable,%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95"
          title="Chat with Factory on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        language={language}
      />

      <QuoteDrawer
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        language={language}
      />

      <AITechnicalAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        language={language}
      />

    </div>
  );
}
