import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Bike, 
  Check, 
  Plus, 
  Sparkles, 
  Info, 
  MessageSquare,
  Wrench,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CableProduct, CableCategory, BikeBrand } from '../types';
import { CABLE_PRODUCTS, CABLE_CATEGORIES_INFO } from '../data/cablesData';

interface CableFinderProps {
  onAddToQuote: (product: CableProduct) => void;
  onSelectProduct: (product: CableProduct) => void;
  language: 'en' | 'ur';
}

export const CableFinder: React.FC<CableFinderProps> = ({
  onAddToQuote,
  onSelectProduct,
  language
}) => {
  const [selectedBrand, setSelectedBrand] = useState<BikeBrand | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CableCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const isUrdu = language === 'ur';

  const brands: { id: BikeBrand | 'all'; label: string; labelUrdu: string }[] = [
    { id: 'all', label: 'All Brands', labelUrdu: 'تمام برانڈز' },
    { id: 'Honda', label: 'Honda (CD 70 / CG 125)', labelUrdu: 'ہونڈا' },
    { id: 'Yamaha', label: 'Yamaha (YBR 125/G)', labelUrdu: 'یا ماہا' },
    { id: 'Suzuki', label: 'Suzuki (GS 150 / GD 110)', labelUrdu: 'سوزوکی' },
    { id: 'United / Road Prince (Chinese 70cc/100cc)', label: 'Chinese 70cc / United', labelUrdu: 'یونائیٹڈ / چائنیز' },
    { id: 'Qingqi / Sazgar (3-Wheelers & Loaders)', label: 'Rickshaw & Loaders', labelUrdu: 'رکشہ و لوڈر' },
    { id: 'Industrial & Agriculture', label: 'Industrial & Agri', labelUrdu: 'انڈسٹریل' }
  ];

  const filteredCables = useMemo(() => {
    return CABLE_PRODUCTS.filter(item => {
      const matchBrand = selectedBrand === 'all' || item.brand === selectedBrand;
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        item.name.toLowerCase().includes(query) ||
        item.nameUrdu.includes(query) ||
        item.oemPartNumber.toLowerCase().includes(query) ||
        item.compatibleModels.some(m => m.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);

      return matchBrand && matchCat && matchSearch;
    });
  }, [selectedBrand, selectedCategory, searchQuery]);

  const handleAdd = (product: CableProduct) => {
    onAddToQuote(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  return (
    <section id="cable-finder" className="py-16 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'فوری تلاش برائے مکینکس و خریدار' : 'Interactive Motorcycle Compatibility Finder'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">اپنی موٹرسائیکل ماڈل کے مطابق درست کیبل منتخب کریں</span>
            ) : (
              <>
                Find the <span className="text-amber-500">Exact Cable</span> for Your Motorcycle
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                ہونڈا سی ڈی 70، سی جی 125، یاماہا، سوزوکی، چائنیز 70cc بائیکس یا چنگچی رکشے کے مطابق OEM فٹنگ کیبل تلاش کریں۔
              </span>
            ) : (
              "Filter by motorcycle make, model, or cable function. Every cable is guaranteed 100% OEM fitment with zero modification required."
            )}
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8 space-y-5">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? "ماڈل یا کیبل کا نام تلاش کریں (مثلاً: CD 70, CG 125, Clutch, Brake)..." : "Search model or cable (e.g., 'CG 125 Clutch', 'CD 70 Brake', 'Rickshaw', 'YBR')..."}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Motorcycle Brand Selector */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-amber-500" />
              <span>{isUrdu ? 'موٹرسائیکل برانڈ منتخب کریں' : 'Select Motorcycle Brand:'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {brands.map(b => {
                const isSelected = selectedBrand === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {isUrdu ? b.labelUrdu : b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cable Function / Category Selector */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>{isUrdu ? 'کیبل کی قسم منتخب کریں' : 'Cable Function / Category:'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CABLE_CATEGORIES_INFO.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CableCategory)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected 
                        ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {isUrdu ? cat.nameUrdu : cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Summary */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span>
              Found <strong className="text-amber-400 font-mono text-sm">{filteredCables.length}</strong> matching factory cables
            </span>
            {(selectedBrand !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => { setSelectedBrand('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-amber-400 hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>

        </div>

        {/* Cable Results Grid */}
        {filteredCables.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/60 rounded-2xl border border-slate-800 p-8 space-y-3">
            <Info className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No exact cable found for this filter</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Tanveer Factory Cable also manufactures custom control cables for special lengths or rare vehicle models. Contact our engineering desk.
            </p>
            <a
              href="https://wa.me/923008472911?text=Hello%20Tanveer%20Cable,%20I%20need%20a%20custom%20cable%20for%20my%20motorcycle."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs mt-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire Custom Cable on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCables.map((cable) => {
              const isAdded = recentlyAddedId === cable.id;

              return (
                <div 
                  key={cable.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20 group relative"
                >
                  {/* Popular Tag Badge */}
                  {cable.popularTag && (
                    <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      {cable.popularTag}
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Brand & Part No */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-[11px] font-semibold border border-amber-500/20">
                        {cable.oemPartNumber}
                      </span>
                      <span className="text-slate-400 text-[11px] font-medium">
                        {cable.brand}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 
                        onClick={() => onSelectProduct(cable)}
                        className="text-base font-bold text-white group-hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                      >
                        {cable.name}
                      </h3>
                      <div className="text-xs text-amber-400/90 font-urdu pt-1">
                        {cable.nameUrdu}
                      </div>
                    </div>

                    {/* Compatible Models Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cable.compatibleModels.map((model, idx) => (
                        <span 
                          key={idx} 
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
                        >
                          {model}
                        </span>
                      ))}
                    </div>

                    {/* Technical Specs Compact Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Wire Core:</span>
                        <span className="font-semibold text-slate-200">Ø {cable.wireDiameterMm} mm / 19-Strand</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Conduit Length:</span>
                        <span className="font-semibold text-slate-200">{cable.conduitLengthMm} mm</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tensile Strength:</span>
                        <span className="font-bold text-amber-400">{cable.tensileStrengthRatingKg} kg load</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Inner Liner:</span>
                        <span className="font-semibold text-slate-200">Virgin PTFE (Teflon)</span>
                      </div>
                    </div>

                    {/* Price Bracket */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Retail MSRP:</span>
                        <span className="text-base font-extrabold text-white font-mono">
                          PKR {cable.msrpPkr}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 font-semibold block">Wholesale Rate:</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          PKR {cable.wholesalePricePkr} <span className="text-[10px] text-slate-400">/ pc</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-850 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(cable)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{isUrdu ? 'تفصیلات' : 'Specs'}</span>
                    </button>

                    <button
                      onClick={() => handleAdd(cable)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded 
                          ? 'bg-emerald-500 text-slate-950 scale-95' 
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'کوٹیشن میں شامل کریں' : 'Add to Quote'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/923008472911?text=Salam%20Tanveer%20Factory%20Cable,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(cable.name)}%20(${cable.oemPartNumber}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                      title="Direct WhatsApp order"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
