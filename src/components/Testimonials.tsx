import React from 'react';
import { Star, ShieldCheck, Wrench, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/cablesData';

interface TestimonialsProps {
  language: 'en' | 'ur';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  return (
    <section className="py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مکینکس اور دکانداروں کی رائے' : 'Mechanic & Dealer Endorsements'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">پاکستان بھر کے سینئر مکینکس اور ڈیلرز کا اعتماد</span>
            ) : (
              <>
                Trusted by 450+ Workshops from <span className="text-amber-500">Montgomery Road</span> to <span className="text-amber-500">Aurangzeb Market</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                لاہور، کراچی، راولپنڈی اور فیصل آباد کے آٹو پارٹس مارکیٹ رہنماؤں کے حقیقی تاثرات۔
              </span>
            ) : (
              "Hear directly from automotive spare parts retailers and motorcycle mechanics who install Tanveer Factory Cables every single day."
            )}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition-all"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Trade Customer</span>
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.feedback}"
                </p>

                {isUrdu && (
                  <p className="text-xs text-amber-400/90 font-urdu leading-loose pt-1">
                    "{t.feedbackUrdu}"
                  </p>
                )}
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.name}
                  </h4>
                  <div className="text-xs text-slate-400">
                    {t.shop}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
