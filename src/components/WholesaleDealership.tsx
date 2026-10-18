import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Gift, 
  CheckCircle2, 
  MessageSquare, 
  Send,
  Calculator,
  Store,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { POPULAR_CITIES } from '../data/cablesData';
import { DealerApplication } from '../types';

interface WholesaleDealershipProps {
  language: 'en' | 'ur';
}

export const WholesaleDealership: React.FC<WholesaleDealershipProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  // Calculator state
  const [estimatedMonthlyUnits, setEstimatedMonthlyUnits] = useState<number>(200);

  // Form state
  const [formData, setFormData] = useState<DealerApplication>({
    shopName: '',
    ownerName: '',
    city: 'Lahore',
    marketLocation: '',
    phoneNumber: '',
    whatsappNumber: '',
    businessType: 'Retailer',
    estimatedMonthlyUnits: '100-250 pieces',
    notes: ''
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Financial calculations
  const avgRetailPrice = 240; // PKR
  const avgWholesaleCost = 155; // PKR
  const profitPerUnit = avgRetailPrice - avgWholesaleCost; // 85 PKR (~35.4% margin)
  const totalMonthlyInvestment = estimatedMonthlyUnits * avgWholesaleCost;
  const totalMonthlyRevenue = estimatedMonthlyUnits * avgRetailPrice;
  const totalMonthlyProfit = estimatedMonthlyUnits * profitPerUnit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'dealer_application',
          data: formData,
          timestamp: new Date().toISOString()
        })
      });

      const resJson = await response.json();
      setSubmittedRef(resJson.referenceId || 'TFC-DEALER-' + Math.floor(1000 + Math.random() * 9000));

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Offline fallback
      setSubmittedRef('TFC-DEALER-' + Math.floor(1000 + Math.random() * 9000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="wholesale" className="py-20 bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دکانداروں اور ہول سیلرز کے لیے خصوصی پروگرام' : 'B2B Wholesale & Dealership Network'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">موٹرسائیکل آٹو پارٹس ڈیلرز اور مکینکس کے لیے خصوصی شراکت داری</span>
            ) : (
              <>
                Grow Your Shop Profits with <span className="text-emerald-400">Tanveer Factory Cable</span> Dealership
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                پاکستان بھر کے آٹو پارٹس مارکیٹوں میں 450+ دکاندار اور ورکشاپس ہمارے ساتھ جڑے ہوئے ہیں۔ 35% تک بہترین منافع، 6 ماہ ریپلیسمنٹ گارنٹی اور فوری کارگو ترسیل۔
              </span>
            ) : (
              "Join over 450+ spare parts shops and mechanic workshops across Pakistan. Enjoy guaranteed 35% profit margins, free workshop display racks, and direct factory freight to your city."
            )}
          </p>
        </div>

        {/* Benefits 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Up to 35% Profit Margin</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct factory pricing with no middleman agent commissions. Maximize your shop revenue on high-turnover CD 70 and CG 125 cables.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">6 Months Replacement</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hassle-free 100% replacement warranty on inner strand breakage or nipple detachment. Protects your shop reputation with customers.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Nationwide Express Cargo</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Same-day dispatch via Daewoo Express Cargo, TCS, Leopard, and Bilal Cargo to Punjab, Sindh, KPK, and Balochistan.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Branded Display Racks</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Qualifying dealers receive complimentary metal hanging display racks, branded banners, and shop counter point-of-sale materials.
            </p>
          </div>
        </div>

        {/* Interactive Dual Box: Profit Calculator & Dealer Application */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Dealer Margin Calculator */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                {isUrdu ? 'دکان داروں کا متوقع منافع کیلکولیٹر' : 'Dealer Monthly Profit Calculator'}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Estimated Monthly Cable Sales:</span>
                  <span className="text-emerald-400 font-mono text-sm font-bold">{estimatedMonthlyUnits} Pieces</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={estimatedMonthlyUnits}
                  onChange={(e) => setEstimatedMonthlyUnits(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50 pcs (Starter)</span>
                  <span>250 pcs (Medium Shop)</span>
                  <span>1,000 pcs (Wholesaler)</span>
                </div>
              </div>

              {/* Financial Metrics Cards */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-400">Total Factory Cost:</span>
                  <span className="text-white font-mono font-bold">
                    PKR {totalMonthlyInvestment.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-400">Customer Retail Revenue:</span>
                  <span className="text-white font-mono font-bold">
                    PKR {totalMonthlyRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 text-sm">
                  <div>
                    <span className="text-emerald-400 font-bold block">Estimated Net Profit:</span>
                    <span className="text-[11px] text-slate-400">~35.4% clear return on inventory</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    PKR {totalMonthlyProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                <span className="text-amber-400 font-bold">★ Wholesale Benefit:</span> Orders over 200 pieces receive free master carton freight packaging + 1 complimentary counter display hanger.
              </div>
            </div>
          </div>

          {/* Right Column: Dealer Registration Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-white">
                  {isUrdu ? 'ڈیلرشپ رجسٹریشن فارم' : 'Apply for Official Dealership'}
                </h3>
              </div>
              <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Fast Approval
              </span>
            </div>

            {submittedRef ? (
              <div className="p-8 text-center bg-slate-900 border border-emerald-500/40 rounded-xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Received Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for your interest in Tanveer Factory Cable. Your registration reference is:
                </p>
                <div className="inline-block px-4 py-2 bg-slate-950 text-amber-400 font-mono font-black text-base rounded-lg border border-amber-500/30">
                  {submittedRef}
                </div>
                <p className="text-xs text-slate-400">
                  Our regional distributor manager for <strong className="text-white">{formData.city}</strong> will contact you on WhatsApp/phone within 24 hours with wholesale trade samples.
                </p>
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Shop / Business Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder="e.g. Al-Rehman Autos & Tuning"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Owner / Contact Person <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="e.g. Haji Muhammad Tariq"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      City <span className="text-amber-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {POPULAR_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Bazaar / Market Location <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.marketLocation}
                      onChange={(e) => setFormData({ ...formData, marketLocation: e.target.value })}
                      placeholder="e.g. Montgomery Road / Badami Bagh"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (Call) <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp Number <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="03xx-xxxxxxx"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Retailer">Motorcycle Spare Parts Retailer</option>
                      <option value="Wholesaler">Wholesale Distributor</option>
                      <option value="Workshop">Mechanic Workshop / Ustad</option>
                      <option value="Fleet">Rickshaw / Loader Fleet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Expected Monthly Volume
                    </label>
                    <select
                      value={formData.estimatedMonthlyUnits}
                      onChange={(e) => setFormData({ ...formData, estimatedMonthlyUnits: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="50-100 pieces">50 – 100 pieces / month</option>
                      <option value="100-250 pieces">100 – 250 pieces / month</option>
                      <option value="250-500 pieces">250 – 500 pieces / month</option>
                      <option value="500+ pieces (Cartons)">500+ pieces (Bulk Cartons)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Inquiries or Models Requested (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Please send rate list for Honda CG 125 clutch cables and Rickshaw gear cables..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? (
                      <span>Processing Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isUrdu ? 'ڈیلرشپ درخواست ارسال کریں' : 'Submit Dealership Application'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
