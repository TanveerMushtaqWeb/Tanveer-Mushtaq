import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Layers, 
  Check, 
  Plus, 
  Info, 
  MessageSquare, 
  ShieldCheck, 
  LayoutGrid, 
  ListFilter,
  ArrowUpDown
} from 'lucide-react';
import { CableProduct, CableCategory } from '../types';
import { CABLE_PRODUCTS } from '../data/cablesData';

interface ProductCatalogProps {
  onAddToQuote: (product: CableProduct) => void;
  onSelectProduct: (product: CableProduct) => void;
  language: 'en' | 'ur';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToQuote,
  onSelectProduct,
  language
}) => {
  const isUrdu = language === 'ur';

  const [activeCategory, setActiveCategory] = useState<CableCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'tensileDesc'>('recommended');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: { id: CableCategory; label: string; labelUrdu: string }[] = [
    { id: 'all', label: 'All Products (14)', labelUrdu: 'تمام پروڈکٹس' },
    { id: 'clutch', label: 'Clutch Cables', labelUrdu: 'کلچ کیبلز' },
    { id: 'front_brake', label: 'Front Brake Cables', labelUrdu: 'فرنٹ بریک کیبلز' },
    { id: 'accelerator', label: 'Throttle / Accelerator', labelUrdu: 'ایکسلریٹر کیبلز' },
    { id: 'speedometer', label: 'Speedometer Cables', labelUrdu: 'میٹر کیبلز' },
    { id: 'rpm', label: 'RPM / Tachometer', labelUrdu: 'آر پی ایم کیبلز' },
    { id: 'gear_rickshaw', label: 'Rickshaw & Loaders', labelUrdu: 'رکشہ و لوڈر' },
    { id: 'industrial_wire', label: 'Industrial & Agri', labelUrdu: 'انڈسٹریل و زرعی' }
  ];

  const processedProducts = useMemo(() => {
    let list = CABLE_PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory);

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.wholesalePricePkr - b.wholesalePricePkr);
    } else if (sortBy === 'tensileDesc') {
      list.sort((a, b) => b.tensileStrengthRatingKg - a.tensileStrengthRatingKg);
    }

    return list;
  }, [activeCategory, sortBy]);

  const handleAdd = (product: CableProduct) => {
    onAddToQuote(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  return (
    <section id="catalog" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Package className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'مکمل مینوفیکچرنگ کیٹلاگ' : 'Official Factory Catalog & Trade Pricelist'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {isUrdu ? (
                <span className="font-urdu">موٹرسائیکل و انڈسٹریل کیبل پروڈکٹ رینج</span>
              ) : (
                <>
                  Heavy-Duty <span className="text-amber-500">Motorcycle & Control</span> Cables
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              100% genuine manufactured in our Lahore plant with virgin Teflon lining and galvanized steel core.
            </p>
          </div>

          {/* Controls: Sort and View switch */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 text-xs py-1 pr-2 focus:outline-none cursor-pointer"
              >
                <option value="recommended" className="bg-slate-900">Recommended</option>
                <option value="priceAsc" className="bg-slate-900">Price: Low to High</option>
                <option value="tensileDesc" className="bg-slate-900">Tensile Load (Max)</option>
              </select>
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Table view"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {isUrdu ? cat.labelUrdu : cat.label}
              </button>
            );
          })}
        </div>

        {/* Display: Grid View or Table View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <div
                  key={product.id}
                  className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {product.oemPartNumber}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {product.brand}
                      </span>
                    </div>

                    <div>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-base font-bold text-white group-hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>
                      <div className="text-xs text-amber-400/90 font-urdu pt-1">
                        {product.nameUrdu}
                      </div>
                    </div>

                    {/* Spec badges */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        Ø {product.wireDiameterMm} mm Core
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {product.conduitLengthMm} mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {product.tensileStrengthRatingKg} kg Tensile
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price Breakdown */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Retail MSRP:</span>
                        <span className="text-sm font-extrabold text-white font-mono">
                          PKR {product.msrpPkr}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 font-semibold block">Wholesale Rate:</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          PKR {product.wholesalePricePkr} <span className="text-[10px] text-slate-400">/ pc</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{isUrdu ? 'تفصیل' : 'Specs'}</span>
                    </button>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-slate-950'
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
                          <span>{isUrdu ? 'کوٹیشن' : 'Add to Quote'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View for bulk commercial buyers */
          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Part / Model</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Wire Diameter</th>
                  <th className="p-4">Conduit Length</th>
                  <th className="p-4">Tensile Load</th>
                  <th className="p-4">Retail MSRP</th>
                  <th className="p-4 text-emerald-400">Wholesale Rate</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {processedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="font-mono text-[10px] text-amber-400">{p.oemPartNumber}</div>
                    </td>
                    <td className="p-4 capitalize">{p.category.replace('_', ' ')}</td>
                    <td className="p-4 font-mono">Ø {p.wireDiameterMm} mm</td>
                    <td className="p-4 font-mono">{p.conduitLengthMm} mm</td>
                    <td className="p-4 font-bold text-amber-400">{p.tensileStrengthRatingKg} kg</td>
                    <td className="p-4 font-mono">PKR {p.msrpPkr}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">PKR {p.wholesalePricePkr}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleAdd(p)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-colors"
                      >
                        + Add to Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
