export interface Price {
  basePrice: number;
  actualPrice?: number;
}

export interface Inventory {
  quantity?: number;
  sku?: string;
  lowStockThreshold?: number;
  allowBackorder?: boolean;
  isTrackable?: boolean;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

export interface IBaseProduct {
  _id?: string; // Optional if used before saving to DB
  name: string;
  slug: string;
  description: string;
  price: Price;
  thumbnail: string;
  images?: string[];
  inventory?: Inventory;
  seo?: SEO;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
