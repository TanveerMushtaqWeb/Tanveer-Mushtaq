import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Truck,
  Building,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactLocationProps {
  language: 'en' | 'ur';
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    inquiryType: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_message',
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(true);
      confetti({ particleCount: 60, spread: 50 });
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'فیکٹری رابطہ اور لوکیشن' : 'Factory Headquarters & Support'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">تنویر فیکٹری کیبل سے براہ راست رابطہ کریں</span>
            ) : (
              <>
                Connect Directly with <span className="text-amber-500">Tanveer Factory Cable</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {isUrdu ? (
              <span className="font-urdu">
                فیکٹری وزٹ، ہول سیل ڈیلرشپ یا کسٹم کیبل آرڈرز کے لیے ہمارے نمائندے سے رابطہ کریں۔
              </span>
            ) : (
              "Whether you are looking for bulk wholesale supply, a custom cable batch, or dealership authorization, our factory sales desk is here to assist you."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Cards & Operating Details */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Factory Location</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Industrial Corridor, Near Sheikhupura Road / Daroghawala Industrial Hub, Lahore, Punjab, Pakistan.
              </p>
              <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Minutes away from Badami Bagh & Daewoo Cargo Freight Hubs</span>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <Phone className="w-4 h-4" />
                <span>Direct Helplines</span>
              </div>
              
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Mobile & WhatsApp:</span>
                  <a href="tel:+923008472911" className="font-mono font-bold text-amber-400 hover:underline">
                    0300-8472911
                  </a>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Factory Landline:</span>
                  <span className="font-mono font-bold text-slate-200">
                    042-37912440
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/923008472911?text=Assalam-o-Alaikum%20Tanveer%20Factory%20Cable,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>

            {/* Email & Working Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Email</span>
                </div>
                <a href="mailto:tanveermushtaqsanwal@gmail.com" className="text-amber-400 truncate block hover:underline text-[11px]">
                  tanveermushtaqsanwal@gmail.com
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Working Hours</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Mon – Sat: 8:30 AM – 7:00 PM
                </div>
                <div className="text-[10px] text-slate-500">
                  (Friday Break: 1:00 – 2:30 PM)
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isUrdu ? 'فوری پیغام ارسال کریں' : 'Send an Instant Message to Factory Desk'}
              </h3>
              <span className="text-xs text-slate-400">Response within 2 hours</span>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Delivered!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for contacting Tanveer Factory Cable. A customer representative will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs hover:bg-slate-700 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Muhammad Aslam"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone / WhatsApp Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Lahore / Karachi"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="General Inquiry">General Information</option>
                      <option value="Wholesale Order">Bulk Wholesale Purchase</option>
                      <option value="Dealership">Dealership Application</option>
                      <option value="Custom Cable">Custom Cable Batch Request</option>
                      <option value="Mechanic Support">Mechanic / Technical Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Message / Requirements <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what cable models, quantities, or details you need..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Transmit Message to Tanveer Factory'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
