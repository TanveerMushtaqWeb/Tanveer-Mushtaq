export type CableCategory = 
  | 'all'
  | 'clutch'
  | 'front_brake'
  | 'accelerator'
  | 'speedometer'
  | 'rpm'
  | 'choke'
  | 'gear_rickshaw'
  | 'industrial_wire';

export type BikeBrand = 
  | 'all'
  | 'Honda'
  | 'Yamaha'
  | 'Suzuki'
  | 'United / Road Prince (Chinese 70cc/100cc)'
  | 'Qingqi / Sazgar (3-Wheelers & Loaders)'
  | 'Industrial & Agriculture';

export interface CableProduct {
  id: string;
  name: string;
  nameUrdu: string;
  category: CableCategory;
  brand: BikeBrand;
  compatibleModels: string[];
  oemPartNumber: string;
  wireDiameterMm: number;
  conduitLengthMm: number;
  innerStrand: string;
  innerLining: string;
  nippleFitting: string;
  tensileStrengthRatingKg: number;
  msrpPkr: number;
  wholesalePricePkr: number;
  moqDozens: number;
  inStock: boolean;
  warrantyMonths: number;
  features: string[];
  popularTag?: string;
  description: string;
  image?: string;
}

export interface QuoteItem {
  product: CableProduct;
  quantity: number; // in pieces or dozens
  unitType: 'pieces' | 'dozens' | 'cartons';
}

export interface DealerApplication {
  shopName: string;
  ownerName: string;
  city: string;
  marketLocation: string; // e.g., Montgomery Road, Badami Bagh, Aurangzeb Market
  phoneNumber: string;
  whatsappNumber: string;
  businessType: 'Retailer' | 'Wholesaler' | 'Workshop' | 'Fleet';
  estimatedMonthlyUnits: string;
  notes?: string;
}

export interface TechnicalInquiry {
  riderName: string;
  phone: string;
  bikeModel: string;
  issueDescription: string;
}
