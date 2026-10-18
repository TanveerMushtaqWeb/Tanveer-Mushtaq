import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Plus, 
  MessageSquare, 
  Award, 
  FileText,
  Wrench,
  Layers,
  Sparkles
} from 'lucide-react';
import { CableProduct } from '../types';
import cableDetailImg from '../assets/images/cable_detail_spec_1788975346020.jpg';

interface ProductDetailModalProps {
  product: CableProduct | null;
  onClose: () => void;
  onAddToQuote: (product: CableProduct) => void;
  language: 'en' | 'ur';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  language
}) => {
  if (!product) return null;

  const isUrdu = language === 'ur';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Tag & Part Number */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
            OEM #{product.oemPartNumber}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
            {product.brand}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{product.warrantyMonths} Months Warranty</span>
          </span>
        </div>

        {/* Titles */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {product.name}
          </h2>
          <div className="text-sm font-bold text-amber-400 font-urdu pt-1">
            {product.nameUrdu}
          </div>
        </div>

        {/* Visual Spec Snippet */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <img 
            src={cableDetailImg} 
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-800 shrink-0" 
          />
          <div className="space-y-1 text-xs text-slate-300">
            <p className="leading-relaxed">
              {product.description}
            </p>
            <div className="text-amber-400 font-semibold pt-1">
              ✓ Guaranteed no-stretch pre-tensioned core wire
            </div>
          </div>
        </div>

        {/* Engineering Specification Blueprint Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Factory Engineering Specification:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Wire Strand Core:</span>
              <span className="font-semibold text-white">{product.innerStrand}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Core Wire Diameter:</span>
              <span className="font-semibold text-white">Ø {product.wireDiameterMm} mm</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Conduit Length:</span>
              <span className="font-semibold text-white">{product.conduitLengthMm} mm</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Tensile Breaking Force:</span>
              <span className="font-bold text-amber-400">{product.tensileStrengthRatingKg} kg load</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Low-Friction Sleeve:</span>
              <span className="font-semibold text-white">{product.innerLining}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400">Nipple / End Terminal:</span>
              <span className="font-semibold text-white">{product.nippleFitting}</span>
            </div>
          </div>
        </div>

        {/* Motorcycle Fitment Compatibility */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Compatible Motorcycles:
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.compatibleModels.map((m, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Key Quality Features:
          </h3>
          <ul className="space-y-1 text-xs text-slate-300">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Action Bar */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-slate-400">Recommended Retail:</div>
            <div className="text-lg font-black text-white font-mono">
              PKR {product.msrpPkr}
            </div>
            <div className="text-xs font-semibold text-emerald-400 font-mono">
              Wholesale: PKR {product.wholesalePricePkr} / pc (Min {product.moqDozens} Dozens)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onAddToQuote(product);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>{isUrdu ? 'کوٹیشن لسٹ میں شامل کریں' : 'Add to Quote'}</span>
            </button>

            <a
              href={`https://wa.me/923008472911?text=Salam%20Tanveer%20Factory%20Cable,%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}%20(${product.oemPartNumber}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              title="WhatsApp inquiry for this item"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
