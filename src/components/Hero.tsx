import React from 'react';
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  MessageSquare, 
  Award, 
  Zap, 
  Gauge,
  Factory
} from 'lucide-react';
import heroCableImg from '../assets/images/hero_factory_cable_1788975307223.jpg';

interface HeroProps {
  onFindCable: () => void;
  onRequestQuote: () => void;
  language: 'en' | 'ur';
}

export const Hero: React.FC<HeroProps> = ({ onFindCable, onRequestQuote, language }) => {
  const isUrdu = language === 'ur';

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-10 pb-16 lg:py-24 border-b border-slate-800">
      {/* Subtle industrial background mesh and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>
                {isUrdu 
                  ? 'پاکستان کی مستند آٹوموٹو کنٹرول کیبل فیکٹری' 
                  : 'Pakistan\'s Certified High-Tensile Automotive Cable Manufacturer'}
              </span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {isUrdu ? (
                  <span className="font-urdu leading-relaxed">
                    پاکستان کی سڑکوں کے لیے سب سے پائیدار اور معیاری <span className="text-amber-500">موٹرسائیکل کیبلز</span>
                  </span>
                ) : (
                  <>
                    Engineered for Pakistan's Toughest Roads — <span className="text-amber-500 underline decoration-amber-500/30 decoration-wavy">High-Tensile</span> Control Cables
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {isUrdu ? (
                  <span className="font-urdu leading-loose">
                    تنویر فیکٹری کیبل: 19-اسٹرینڈ اعلیٰ کوالٹی اسٹیل، ورجن ٹیفلون انر لائننگ اور ڈائی کاسٹ زنک نپلز کے ساتھ۔ ہونڈا سی ڈی 70، سی جی 125، یاماہا، سوزوکی اور چنگچی رکشوں کے لیے 6 ماہ بغیر تار ٹوٹنے کی گارنٹی۔
                  </span>
                ) : (
                  "Manufacturer of heavy-duty motorcycle clutch, brake, accelerator, and speedometer cables. Fitted with 19-strand aircraft galvanized steel, low-friction virgin PTFE Teflon liners, and die-cast zinc terminals. Guaranteed to withstand heavy summer heat, stop-and-go traffic, and potholed roads without snapping."
                )}
              </p>
            </div>

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">340 kg+</div>
                  <div className="text-[11px] text-slate-400">Tensile Break Force</div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Teflon PTFE</div>
                  <div className="text-[11px] text-slate-400">Zero-Friction Pull</div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">6 Months</div>
                  <div className="text-[11px] text-slate-400">Replacement Guarantee</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onFindCable}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all active:scale-95"
              >
                <span>{isUrdu ? 'اپنی بائیک کیبل تلاش کریں' : 'Find Cable For My Bike'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm sm:text-base border border-slate-700 hover:border-amber-500/50 flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{isUrdu ? 'ہول سیل ریٹ لسٹ' : 'Wholesale Dealer Rates'}</span>
              </button>

              <a
                href="https://wa.me/923008472911?text=Hello%20Tanveer%20Factory%20Cable,%20I%20want%20to%20inquire%20about%20motorcycle%20cables."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 text-sm font-semibold transition-all"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>

            {/* Nationwide distribution ticker */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <span className="text-amber-400 font-semibold flex items-center gap-1 shrink-0">
                <Factory className="w-3.5 h-3.5" />
                <span>Daily Dispatch To:</span>
              </span>
              <p className="truncate text-slate-300">
                Lahore (Montgomery Rd) • Karachi (Aurangzeb Mkt) • Rawalpindi • Faisalabad • Multan • Gujranwala • Peshawar • Quetta
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset & Floating Spec Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer glowing border frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl shadow-amber-950/30 group">
                <img 
                  src={heroCableImg} 
                  alt="Tanveer Factory Cable motorcycle control cables manufactured in Pakistan" 
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% OEM Fitment</span>
                </div>

                {/* Bottom spec card inside image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold uppercase tracking-wider">Tanveer Signature Spec</span>
                    <span className="text-slate-400">Grade 304 / Galvanized</span>
                  </div>
                  <div className="flex items-center justify-between text-white font-bold text-sm">
                    <span>CD 70 & CG 125 Master Series</span>
                    <span className="text-emerald-400 font-mono">PKR 145 - 260</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[95%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Stress Tested: 50,000 Cycles</span>
                    <span className="text-amber-400">Zero-Friction PTFE</span>
                  </div>
                </div>
              </div>

              {/* Floating Industrial Production Stat pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 p-3.5 rounded-xl shadow-xl flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-white">500,000+</div>
                  <div className="text-[11px] text-slate-400">Cables Produced Annually</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
