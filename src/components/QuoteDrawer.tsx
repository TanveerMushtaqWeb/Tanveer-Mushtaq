import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  Send, 
  Printer, 
  CheckCircle2, 
  Truck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuoteItem } from '../types';
import { POPULAR_CITIES } from '../data/cablesData';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  language: 'en' | 'ur';
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  language
}) => {
  const isUrdu = language === 'ur';

  // Customer details for submitting quote
  const [customerName, setCustomerName] = useState('');
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Calculation logic
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPkr = items.reduce((sum, item) => sum + (item.quantity * item.product.wholesalePricePkr), 0);

  // Volume discount tiers
  let discountPercentage = 0;
  if (totalPieces >= 500) {
    discountPercentage = 15;
  } else if (totalPieces >= 300) {
    discountPercentage = 10;
  } else if (totalPieces >= 100) {
    discountPercentage = 5;
  }

  const discountAmount = Math.round((subtotalPkr * discountPercentage) / 100);
  const finalTotalPkr = subtotalPkr - discountAmount;

  // Compile pre-formatted WhatsApp order message
  const generateWhatsAppMessage = () => {
    let msg = `*Assalam-o-Alaikum Tanveer Factory Cable Sales Desk*\n`;
    msg += `I would like to place an order / request formal wholesale quote:\n\n`;
    if (shopName) msg += `*Shop:* ${shopName}\n`;
    if (customerName) msg += `*Contact Person:* ${customerName}\n`;
    msg += `*City:* ${city}\n`;
    msg += `*Phone:* ${phoneNumber || 'Via WhatsApp'}\n\n`;
    msg += `*ORDER ITEMS:*\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (${item.product.oemPartNumber}) - *Qty:* ${item.quantity} pcs @ PKR ${item.product.wholesalePricePkr} = PKR ${(item.quantity * item.product.wholesalePricePkr).toLocaleString()}\n`;
    });

    msg += `\n*Total Pieces:* ${totalPieces} pcs\n`;
    msg += `*Subtotal:* PKR ${subtotalPkr.toLocaleString()}\n`;
    if (discountPercentage > 0) {
      msg += `*Volume Discount (${discountPercentage}%):* -PKR ${discountAmount.toLocaleString()}\n`;
    }
    msg += `*Estimated Total:* PKR ${finalTotalPkr.toLocaleString()}\n\n`;
    msg += `Please confirm stock availability and nearest cargo dispatch details. JazakAllah.`;

    return encodeURIComponent(msg);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bulk_quote',
          customerName,
          shopName,
          city,
          phoneNumber,
          items: items.map(i => ({
            id: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            rate: i.product.wholesalePricePkr
          })),
          totalPieces,
          finalTotalPkr,
          timestamp: new Date().toISOString()
        })
      });

      const res = await response.json();
      setSubmittedRef(res.referenceId || 'TFC-Q-' + Math.floor(1000 + Math.random() * 9000));

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {
      setSubmittedRef('TFC-Q-' + Math.floor(1000 + Math.random() * 9000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isUrdu ? 'ہول سیل کوٹیشن اور آرڈر لسٹ' : 'Wholesale Order & Quote Builder'}
                </h2>
                <p className="text-xs text-slate-400">
                  {items.length} unique cable items • {totalPieces} total pieces
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Your quote list is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our motorcycle cable catalog and click "Add to Quote" to build your wholesale order.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs mt-2"
                >
                  Explore Cable Catalog
                </button>
              </div>
            ) : submittedRef ? (
              <div className="p-6 text-center bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Quote Request Registered!</h3>
                <div className="p-3 bg-slate-900 rounded-xl font-mono text-amber-400 text-base font-bold border border-amber-500/30">
                  Ref: {submittedRef}
                </div>
                <p className="text-xs text-slate-300">
                  Our factory distribution manager will review stock availability and contact you with shipment dispatch details.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/923008472911?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send this Order to WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      onClearAll();
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Start New Order
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Selected Cables</span>
                    <button onClick={onClearAll} className="text-red-400 hover:underline">
                      Clear list
                    </button>
                  </div>

                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] font-mono text-amber-400">
                            {item.product.oemPartNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity selector & price */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(10, item.quantity - 10))}
                            className="p-1 hover:bg-slate-800 rounded text-slate-300"
                            title="-10"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 10)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-300"
                            title="+10"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right font-mono">
                          <span className="text-[10px] text-slate-400 block">@ PKR {item.product.wholesalePricePkr}</span>
                          <span className="text-xs font-bold text-emerald-400">
                            PKR {(item.quantity * item.product.wholesalePricePkr).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Volume Discount Progress Banner */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Bulk Discount Tier:</span>
                    <span className="text-amber-400 font-bold">
                      {discountPercentage > 0 ? `${discountPercentage}% Extra Off Applied!` : 'Order 100+ pcs for 5% off'}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalPieces / 500) * 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>100 pcs: 5%</span>
                    <span>300 pcs: 10%</span>
                    <span>500+ pcs: 15% + Free Cargo</span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal ({totalPieces} pieces):</span>
                    <span className="font-mono text-white">PKR {subtotalPkr.toLocaleString()}</span>
                  </div>

                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Volume Discount ({discountPercentage}%):</span>
                      <span className="font-mono">- PKR {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Nationwide Cargo Packaging:</span>
                    <span className="text-emerald-400">Complimentary Wooden/Carton Packaging</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Estimated Order Total:</span>
                    <span className="text-lg font-black text-amber-400 font-mono">
                      PKR {finalTotalPkr.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Direct 1-Click WhatsApp Export */}
                <a
                  href={`https://wa.me/923008472911?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Order Directly to Sales WhatsApp</span>
                </a>

                {/* Submit Online Inquiry Form */}
                <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Or Register Quotation Online:
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Shop / Workshop Name *"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      {POPULAR_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp *"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Register Formal Factory Quote'}</span>
                  </button>
                </form>
              </>
            )}

          </div>

          {/* Footer Print & Support info */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Spec Sheet</span>
            </button>
            <div className="flex items-center gap-1 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>6 Months Warranty Included</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
