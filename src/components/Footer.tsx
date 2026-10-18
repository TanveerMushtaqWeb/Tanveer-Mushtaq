import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  MessageSquare, 
  ArrowUp,
  Factory
} from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ur';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner / Callout */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {isUrdu ? 'کیا آپ آٹو پارٹس ڈیلر یا ورکشاپ مالک ہیں؟' : 'Are you an Auto Spare Parts Dealer or Workshop Owner?'}
            </h3>
            <p className="text-xs text-slate-300">
              Get direct factory supply with up to 35% profit margin and free nationwide cargo dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/923008472911?text=Salam%20Tanveer%20Factory%20Cable,%20I%20want%20to%20apply%20for%20a%20dealership."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Dealer Desk</span>
            </a>
            <button
              onClick={() => scrollToSection('wholesale')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
            >
              View Wholesale Terms
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                TFC
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  TANVEER <span className="text-amber-500">FACTORY</span> CABLE
                </span>
                <div className="text-[11px] text-amber-400 font-urdu font-bold">
                  تنویر فیکٹری کیبل • لاہور، پاکستان
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Pakistan's premier manufacturer of high-tensile motorcycle clutch, brake, accelerator, and speedometer cables. Fitted with Teflon liners and 19-strand aircraft steel for extreme reliability on Pakistani roads.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001:2015 Quality Manufacturing Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-amber-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('cable-finder')} className="hover:text-amber-400 transition-colors">
                  Motorcycle Cable Finder
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('anatomy')} className="hover:text-amber-400 transition-colors">
                  5-Layer Cable Anatomy
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('wholesale')} className="hover:text-amber-400 transition-colors text-emerald-400">
                  Wholesale & Dealership
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('manufacturing')} className="hover:text-amber-400 transition-colors">
                  Factory & Testing Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Motorcycle Cables */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Selling Models
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300">Honda CD 70 Teflon Clutch Cable</span>
              </li>
              <li>
                <span className="text-slate-300">Honda CG 125 Reinforced Clutch Cable</span>
              </li>
              <li>
                <span className="text-slate-300">Yamaha YBR 125 Smooth Action Cable</span>
              </li>
              <li>
                <span className="text-slate-300">Suzuki GS 150 Heavy Touring Cable</span>
              </li>
              <li>
                <span className="text-slate-300">Qingqi & 200cc Rickshaw Gear Cable</span>
              </li>
            </ul>
          </div>

          {/* Factory Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Factory Sales Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Industrial Zone, Sheikhupura Road Corridor, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="tel:+923008472911" className="font-mono text-amber-400 font-bold hover:underline">
                  0300-8472911
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="mailto:tanveermushtaqsanwal@gmail.com" className="text-slate-300 hover:text-white truncate">
                  tanveermushtaqsanwal@gmail.com
                </a>
              </div>
              <div className="pt-1 text-[11px] text-slate-500">
                Mon - Sat: 8:30 AM to 7:00 PM PKT
              </div>
            </div>
          </div>

        </div>

        {/* Major Trade Hubs Served */}
        <div className="mt-10 pt-6 border-t border-slate-900 text-[11px] text-slate-400 space-y-1">
          <span className="text-amber-500 font-semibold block">Serving Auto Spare Parts Markets Across Pakistan:</span>
          <p>
            Montgomery Road (Lahore) • Badami Bagh • Aurangzeb Market (Karachi) • Liaquat Road (Rawalpindi) • Circular Road (Faisalabad) • Railway Road (Gujranwala) • Chowk Shaheedan (Multan) • Shoba Bazar (Peshawar) • Double Road (Quetta) • Sukkur • Hyderabad
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">Tanveer Factory Cable</strong>. All Rights Reserved. Manufactured in Pakistan.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
