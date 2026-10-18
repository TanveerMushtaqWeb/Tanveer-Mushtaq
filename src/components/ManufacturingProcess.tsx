import React from 'react';
import { 
  Factory, 
  Cpu, 
  Award, 
  CheckCircle, 
  Gauge, 
  Flame, 
  ShieldCheck,
  Microscope,
  RotateCw
} from 'lucide-react';
import factoryMachineryImg from '../assets/images/factory_machinery_1788975329759.jpg';
import { MANUFACTURING_STEPS } from '../data/cablesData';

interface ManufacturingProcessProps {
  language: 'en' | 'ur';
}

export const ManufacturingProcess: React.FC<ManufacturingProcessProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  return (
    <section id="manufacturing" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Factory className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'جدید فیکٹری و ٹیسٹنگ لیبارٹری' : 'State-of-the-Art Factory & Quality Lab'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">تنویر فیکٹری کیبل کی مینوفیکچرنگ اور کوالٹی کنٹرول کا معیار</span>
            ) : (
              <>
                Inside Tanveer Factory: <span className="text-amber-500">Precision Engineering</span> & Testing
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                لاہور اور شیخوپورہ روڈ انڈسٹریل زون میں قائم جدید ترین وائر ڈرائنگ مشینیں، ہائی پریشر ڈائی کاسٹنگ اور خودکار ٹیسٹنگ ریگز۔
              </span>
            ) : (
              "From raw high-carbon steel rod cold drawing to computerized tensile pull testing, see how each cable is manufactured to endure Pakistani road vibrations and heavy traffic."
            )}
          </p>
        </div>

        {/* Hero Factory Banner & Founder Note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-hidden relative">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Factory Tour & Overview
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Engineered for Zero-Failure in Tough Environments
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Founded under the leadership of <strong className="text-white">Tanveer Mushtaq</strong>, Tanveer Factory Cable has pioneered high-tensile control cable manufacturing in Pakistan for over two decades. While ordinary market cables cut corners with cheap recycled materials, our factory adheres to stringent metallurgical and dimensional standards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="text-amber-400 font-extrabold text-lg sm:text-xl font-mono">100% In-House</div>
                <div className="text-[11px] text-slate-400">Stranding, Extrusion & Casting</div>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="text-emerald-400 font-extrabold text-lg sm:text-xl font-mono">ISO 9001:2015</div>
                <div className="text-[11px] text-slate-400">Quality Certified Protocol</div>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-slate-300">
              <span className="text-amber-400 font-bold font-urdu block text-sm mb-1">
                "ہمارا مقصد ہر موٹرسائیکل سوار اور مکینک کو ایک ایسا اعتماد دینا ہے کہ سفر کے دوران کبھی کیبل ٹوٹنے کا خوف نہ ہو۔"
              </span>
              <span className="text-slate-400 text-[11px]">— تنویر مشتاق (بانی و چیف انجینئر)</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group">
              <img 
                src={factoryMachineryImg} 
                alt="Tanveer Factory Cable modern automated production facility" 
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Automated Winding & Wire Twisting Section</span>
                <span className="text-amber-400 font-mono text-[11px]">Factory Floor Unit 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            {isUrdu ? '5 مرحلہ وار مینوفیکچرنگ پروسیس' : 'The 5-Stage Precision Manufacturing Pipeline'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MANUFACTURING_STEPS.map((step) => (
              <div 
                key={step.stepNumber}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-amber-500">
                      {step.stepNumber}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {step.title}
                  </h4>
                  <div className="text-[11px] text-amber-400/80 font-urdu">
                    {step.titleUrdu}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-emerald-400 bg-slate-950/60 p-2 rounded-lg border border-slate-850">
                  <span className="text-slate-400 block">Test Metric:</span>
                  {step.spec}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
