import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Flame, 
  Layers, 
  Gauge, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import cableDetailImg from '../assets/images/cable_detail_spec_1788975346020.jpg';

interface CableAnatomyViewerProps {
  language: 'en' | 'ur';
}

interface AnatomyLayer {
  id: number;
  title: string;
  titleUrdu: string;
  material: string;
  function: string;
  functionUrdu: string;
  advantageVsBazaar: string;
  icon: string;
}

export const CableAnatomyViewer: React.FC<CableAnatomyViewerProps> = ({ language }) => {
  const [activeLayer, setActiveLayer] = useState<number>(4); // Default to core wire
  const isUrdu = language === 'ur';

  const layers: AnatomyLayer[] = [
    {
      id: 1,
      title: '1. Heavy Weatherproof Outer PVC Sheath',
      titleUrdu: '1. الٹرا وائلٹ پروف بیرونی پی وی سی کور',
      material: 'Virgin Thermal-Stabilized PVC with Anti-Ozone Additives',
      function: 'Shields inner spring conduit from Pakistani mud, engine oil splashes, and 48°C extreme summer pavement temperatures without cracking.',
      functionUrdu: 'پاکستان کی شدید گرمی، بارش کے پانی اور مٹی سے کیبل کی مکمل حفاظت کرتا ہے۔',
      advantageVsBazaar: 'Cheap cables use recycled PVC that gets brittle, cracks in winter, or softens and melts near CG 125 exhaust pipes.',
      icon: 'ShieldCheck'
    },
    {
      id: 2,
      title: '2. High-Carbon Spring Steel Spiral Conduit',
      titleUrdu: '2. ہائی کاربن اسپرنگ اسٹیل کونوڈٹ پائپ',
      material: 'Continuously Wound Cold-Drawn Flat Spring Wire',
      function: 'Maintains longitudinal rigidity. Transmits 100% of rider hand leverage directly to clutch and brake arms without mushy outer casing collapse.',
      functionUrdu: 'بریک اور کلچ کے دباؤ کو بغیر جھول کھائے فوراً منتقل کرتا ہے۔',
      advantageVsBazaar: 'Bazaar cables compress like a spring when you squeeze the lever, causing spongy brakes and incomplete clutch release.',
      icon: 'Layers'
    },
    {
      id: 3,
      title: '3. Virgin PTFE (Teflon) Low-Friction Sleeve',
      titleUrdu: '3. ورجن ٹیفلون (PTFE) اندرونی ٹیوب',
      material: 'Extruded Seamless Polytetrafluoroethylene (PTFE)',
      function: 'Creates a microscopic slip boundary with μ < 0.08 friction coefficient. The inner wire glides effortlessly with zero binding.',
      functionUrdu: 'کیبل کو رگڑ سے بچاتا ہے اور کلچ کو بغیر آئلنگ کے بھی مکھن جیسا ہلکا رکھتا ہے۔',
      advantageVsBazaar: 'Cheap cables use rough unlined plastic or dry metal-on-metal that grinds, sticks, and causes heavy hand fatigue in city traffic.',
      icon: 'Zap'
    },
    {
      id: 4,
      title: '4. 19-Strand Pre-Stretched Aircraft Steel Core',
      titleUrdu: '4. پری اسٹریچڈ 19-اسٹرینڈ ہائی ٹینسائل اسٹیل تار',
      material: '19-Strand Concentric Galvanized Aircraft Steel Wire (Ø 1.5 - 2.8mm)',
      function: 'Pre-tensioned at factory under 2,500N hydraulic load. Virtually zero cable stretch over lifetime, eliminating constant lever play adjustments.',
      functionUrdu: '250 کلوگرام کھچاؤ برداشت کرنے والا اسٹیل کور جو بار بار ڈھیلا نہیں پڑتا اور تار ٹوٹنے سے بچاتا ہے۔',
      advantageVsBazaar: 'Standard market wires stretch continuously during the first 2 weeks, leading to gear grinding and premature snapped strands at the lever neck.',
      icon: 'Gauge'
    },
    {
      id: 5,
      title: '5. High-Pressure Die-Cast Terminals & Boots',
      titleUrdu: '5. ڈائی کاسٹ زنک نپلز اور ڈسٹ سیل بوٹس',
      material: 'Ultra-Pure Zinc-Aluminium Alloy / Solid Machined Brass',
      function: 'Die-cast directly onto the strand tips under molten injection pressure. Withstands over 2,800N pull force without pulling off the wire.',
      functionUrdu: 'نپلز تار کے اوپر پریشر سے ڈائی کاسٹ ہوتے ہیں تاکہ اچانک ہنگامی بریک پر کبھی الگ نہ ہوں۔',
      advantageVsBazaar: 'Low-cost cables use hand-soldered or weakly crimped tin nipples that pop off under emergency braking or heavy clutch pull.',
      icon: 'Flame'
    }
  ];

  const currentLayer = layers.find(l => l.id === activeLayer) || layers[3];

  return (
    <section id="anatomy" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تکنیکی انجینئرنگ کی تفصیل' : 'Proprietary 5-Layer Cable Architecture'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">تنویر فیکٹری کیبل بازار کی عام کیبلز سے مختلف کیوں ہے؟</span>
            ) : (
              <>
                Why Tanveer Factory Cables <span className="text-amber-500">Outlast</span> Generic Market Cables
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                ہر پرت پر کلک کریں اور جانیں کہ ہماری کیبلز کس طرح 50,000 بار کھینچنے پر بھی تار ٹوٹنے سے محفوظ رہتی ہیں۔
              </span>
            ) : (
              "Click through each layer below to inspect the microscopic engineering and heavy-duty materials that prevent clutch lever stiffness and cable snapping."
            )}
          </p>
        </div>

        {/* Interactive Layout: Left Layer Selector, Right Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Layer Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                    isActive
                      ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-950/20'
                      : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      0{layer.id}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {layer.title}
                      </h4>
                      <p className="text-[11px] text-amber-400/80 font-urdu">
                        {layer.titleUrdu}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-400 rotate-90 sm:rotate-0' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Layer Microscopic Detail Panel & Photography */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
            
            {/* Top Bar with Layer Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                Layer {currentLayer.id} of 5
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Tested to ISO 9001:2015 Spec
              </span>
            </div>

            {/* Title & Material */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentLayer.title}
              </h3>
              <div className="text-xs sm:text-sm font-mono text-amber-400 font-semibold">
                Material: {currentLayer.material}
              </div>
            </div>

            {/* Split layout: Photo asset and Description */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                <img 
                  src={cableDetailImg} 
                  alt="Tanveer Cable Layer Detail" 
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover object-center"
                />
              </div>

              <div className="sm:col-span-7 space-y-3 text-sm text-slate-300">
                <p className="leading-relaxed">
                  {currentLayer.function}
                </p>
                {isUrdu && (
                  <p className="font-urdu text-amber-300/90 text-xs leading-loose">
                    {currentLayer.functionUrdu}
                  </p>
                )}
              </div>
            </div>

            {/* Advantage vs Cheap Market Cables Comparison Card */}
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Tanveer Factory Engineering Advantage:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {currentLayer.advantageVsBazaar}
              </p>
            </div>

            {/* Bottom Lab Benchmark Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Tensile Max</div>
                <div className="text-sm font-extrabold text-white font-mono">3,400 N</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Heat Resistance</div>
                <div className="text-sm font-extrabold text-amber-400 font-mono">-20°C to +120°C</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Cycle Lifespan</div>
                <div className="text-sm font-extrabold text-emerald-400 font-mono">50,000+ Pulls</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
