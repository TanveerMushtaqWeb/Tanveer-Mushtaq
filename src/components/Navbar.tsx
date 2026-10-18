import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Menu, 
  X, 
  ShoppingBag, 
  Sparkles,
  FileText,
  Factory
} from 'lucide-react';

interface NavbarProps {
  quoteCount: number;
  onOpenQuote: () => void;
  onOpenAdvisor: () => void;
  language: 'en' | 'ur';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteCount,
  onOpenQuote,
  onOpenAdvisor,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isUrdu = language === 'ur';

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 transition-all">
      {/* Top Industrial Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 text-xs text-slate-300 py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'تنویر فیکٹری کیبل - 6 ماہ گارنٹی' : 'Tanveer Factory Cable • ISO Certified Quality Standards'}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Industrial Corridor, Sheikhupura Road, Lahore, Pakistan</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+923008472911" 
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span className="font-mono font-medium tracking-wider">0300-8472911</span>
            </a>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            <a
              href="https://wa.me/923008472911?text=Assalam-o-Alaikum%20Tanveer%20Factory%20Cable,%20I%20am%20interested%20in%20motorcycle%20cables%20wholesale%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp Direct</span>
            </a>

            <div className="h-3 w-px bg-slate-700"></div>

            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-amber-400 hover:bg-slate-700 border border-amber-500/30 transition-all flex items-center gap-1"
              title="Toggle Language"
            >
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 border border-amber-400/40 group-hover:scale-105 transition-transform">
              {/* Cable coil styled emblem */}
              <div className="absolute inset-1 rounded-lg border border-slate-950/40 border-dashed"></div>
              <span>TFC</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                  TANVEER <span className="text-amber-500">FACTORY</span> CABLE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-urdu font-bold">تنویر فیکٹری کیبل</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="hidden sm:inline-block text-[11px] text-slate-400 tracking-wider uppercase">
                  Motorcycle & Industrial Control Cables
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('cable-finder')}
              className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>{isUrdu ? 'بائیک کیبل فائنڈر' : 'Cable Finder'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">CD/CG</span>
            </button>

            <button 
              onClick={() => scrollToSection('catalog')}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {isUrdu ? 'پراڈکٹ کیٹلاگ' : 'Products Catalog'}
            </button>

            <button 
              onClick={() => scrollToSection('anatomy')}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {isUrdu ? 'کیبل کی ساخت' : 'Cable Anatomy'}
            </button>

            <button 
              onClick={() => scrollToSection('wholesale')}
              className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1 text-emerald-400"
            >
              <span>{isUrdu ? 'ڈیلرشپ و ہول سیل' : 'Dealership & Bulk'}</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded border border-emerald-500/30 font-semibold uppercase">Margin 35%</span>
            </button>

            <button 
              onClick={() => scrollToSection('manufacturing')}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {isUrdu ? 'فیکٹری و کوالٹی لیب' : 'Factory & Quality'}
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {isUrdu ? 'رابطہ' : 'Contact'}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* AI Technical Consultant Button */}
            <button
              onClick={onOpenAdvisor}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 shadow-sm transition-all"
              title="Ask Tanveer Technical Desk"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{isUrdu ? 'ٹیکنیکل ایڈوائزر' : 'Technical Desk'}</span>
            </button>

            {/* Bulk Quote / Inquiry Cart Button */}
            <button
              onClick={onOpenQuote}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">{isUrdu ? 'ہول سیل کوٹیشن' : 'Wholesale Quote'}</span>
              {quoteCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-xs font-black ring-2 ring-amber-400">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdvisor(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'ٹیکنیکل ایڈوائزر' : 'Technical Desk'}</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'کوٹیشن فہرست' : `Quote (${quoteCount})`}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            <button 
              onClick={() => scrollToSection('cable-finder')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{isUrdu ? 'بائیک کیبل فائنڈر' : 'Motorcycle Cable Matcher'}</span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">CD 70 / CG 125</span>
            </button>
            <button 
              onClick={() => scrollToSection('catalog')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {isUrdu ? 'مکمل پراڈکٹ کیٹلاگ' : 'Full Products Catalog'}
            </button>
            <button 
              onClick={() => scrollToSection('anatomy')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {isUrdu ? 'کیبل کی اندرونی ساخت' : 'Cable Anatomy & Engineering'}
            </button>
            <button 
              onClick={() => scrollToSection('wholesale')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-emerald-400 text-emerald-400 transition-colors flex items-center justify-between"
            >
              <span>{isUrdu ? 'ڈیلرشپ اور ہول سیل پروگرام' : 'Wholesale & Dealership Program'}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">35% Margin</span>
            </button>
            <button 
              onClick={() => scrollToSection('manufacturing')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {isUrdu ? 'فیکٹری مینوفیکچرنگ و ٹیسٹنگ' : 'Factory & Quality Control'}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {isUrdu ? 'فیکٹری رابطہ و پتہ' : 'Contact & Factory Location'}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Direct Orders Helpline:</span>
            <a href="tel:+923008472911" className="text-amber-400 font-bold font-mono">0300-8472911</a>
          </div>
        </div>
      )}
    </header>
  );
};
