import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  language: 'en' | 'ur';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const isUrdu = language === 'ur';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why does Honda CG 125 clutch cable snap frequently in ordinary bazaar brands?',
      qUrdu: 'ہونڈا سی جی 125 کی کلچ کیبل بار بار کیوں ٹوٹتی ہے؟',
      a: 'The CG 125 has heavy 4-spring clutch baskets that exert substantial tension on the inner strand. In ordinary bazaar cables, weak 7-strand steel and soft tin solder nipples fail under fatigue. Tanveer Factory Cable uses heavy 2.5mm pre-stretched 19-strand aircraft steel with die-cast zinc terminals and virgin Teflon lining, eliminating friction and wire fraying.',
      aUrdu: 'سی جی 125 کے کلچ اسپرنگز بہت سخت ہوتے ہیں۔ عام کیبلز سستی تار کی بنی ہوتی ہیں۔ تنویر فیکٹری 2.5mm موٹی 19-تاروں والی مضبوط تار اور ٹیفلون پائپ استعمال کرتی ہے جس سے کلچ کبھی اچانک نہیں ٹوٹتا۔'
    },
    {
      q: 'Do Tanveer Factory Cables require oiling or lubrication before installation?',
      qUrdu: 'کیا تنویر فیکٹری کیبل لگانے سے پہلے تیل یا گریس ڈالنے کی ضرورت ہے؟',
      a: 'No! Our cables feature virgin PTFE (Teflon) internal sleeves that are permanently self-lubricating. In fact, pouring engine oil or heavy grease inside Teflon-lined cables can attract road grit and dust, creating a sticky paste. Tanveer cables should be installed dry directly out of the sealed packet.',
      aUrdu: 'ہرگز نہیں۔ ہماری کیبل میں ورجن ٹیفلون کی تہہ ہوتی ہے جو قدرتی طور پر رگڑ سے پاک ہے۔ اندر موبل آئل ڈالنے سے مٹی جمع ہو جاتی ہے، اس لیے اسے پیکٹ سے نکال کر بغیر آئلنگ کے لگائیں۔'
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ) for retailers and wholesale distributors?',
      qUrdu: 'دکانداروں اور ہول سیلرز کے لیے کم از کم کتنا آرڈر دینا ضروری ہے؟',
      a: 'For registered auto parts retailers and workshop mechanics, our starter pack MOQ is just 5 dozens (60 pieces, can be mixed models such as CD 70, CG 125, YBR). For regional distributors ordering master cartons (200 pieces per carton), we provide volume tiered discounts up to 35% and free cargo freight.',
      aUrdu: 'دکانداروں کے لیے کم از کم آرڈر صرف 5 درجن (مکس ماڈلز) ہے۔ بڑے ہول سیلرز کے لیے 200 پیسز کے کارٹن پر 35% تک رعایت اور مفت کارگو ترسیل دستیاب ہے۔'
    },
    {
      q: 'How fast is nationwide cargo dispatch across Pakistan?',
      qUrdu: 'پاکستان بھر میں کارگو ڈیلیوری کتنے وقت میں پہنچتی ہے؟',
      a: 'Orders confirmed before 3:00 PM are dispatched the same day from our Lahore industrial logistics hub via Daewoo Express Cargo, TCS, Leopard, or Bilal Cargo. Delivery to Karachi, Rawalpindi/Islamabad, Faisalabad, Multan, and Gujranwala takes 24 to 48 hours.',
      aUrdu: 'لاہور سے روزانہ ڈائیوو ایکسپریس کارگو اور بلال کارگو کے ذریعے ترسیل ہوتی ہے۔ کراچی، راولپنڈی، فیصل آباد اور ملتان میں آرڈر 24 سے 48 گھنٹوں میں موصول ہو جاتا ہے۔'
    },
    {
      q: 'How does the 6-Month Snapping Replacement Guarantee work?',
      qUrdu: '6 ماہ تار ٹوٹنے کی ریپلیسمنٹ گارنٹی کس طرح کام کرتی ہے؟',
      a: 'If any Tanveer Factory Cable inner strand snaps or nipple pulls off under regular riding conditions within 6 months of purchase, the authorized dealer or rider receives a free 1-to-1 immediate replacement upon presenting the damaged cable.',
      aUrdu: 'اگر 6 ماہ کے دوران عام استعمال میں تار ٹوٹ جائے یا نپل نکل جائے، تو ہمارا مجاز ڈیلر آپ کو پرانی کیبل کے بدلے فوری نئی کیبل فراہم کرے گا۔'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'عام پوچھے گئے سوالات' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {isUrdu ? (
              <span className="font-urdu">موٹرسائیکل کیبلز کے متعلق اہم سوالات و جوابات</span>
            ) : (
              <>
                Common Questions from <span className="text-amber-500">Riders & Mechanics</span>
              </>
            )}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                >
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </h4>
                    {isUrdu && (
                      <p className="text-xs text-amber-400 font-urdu pt-1">
                        {faq.qUrdu}
                      </p>
                    )}
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/30 space-y-2">
                    <p>{faq.a}</p>
                    {isUrdu && (
                      <p className="font-urdu text-amber-300/90 text-xs leading-loose pt-1">
                        {faq.aUrdu}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
