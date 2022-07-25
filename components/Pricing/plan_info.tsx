export type PricingInfo = {
  tierName: string;
  numSessionCredits: number;
  price: number;
  contactSales: boolean;
  mostPopular: boolean;
};

export const BasicInfo: PricingInfo = {
  tierName: 'Basic',
  numSessionCredits: 500,
  price: 0,
  contactSales: false,
  mostPopular: false,
};

export const EssentialsInfo: PricingInfo = {
  tierName: 'Essentials',
  numSessionCredits: 10000,
  price: 150,
  contactSales: false,
  mostPopular: false,
};

export const StartupInfo: PricingInfo = {
  tierName: 'Startup',
  numSessionCredits: 80000,
  price: 400,
  contactSales: false,
  mostPopular: true,
};

export const EnterpriseInfo: PricingInfo = {
  tierName: 'Enterprise',
  numSessionCredits: 0,
  price: 0,
  contactSales: true,
  mostPopular: false,
};
