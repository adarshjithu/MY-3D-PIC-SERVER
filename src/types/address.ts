import { Document, Types } from "mongoose";

export interface IAddress extends Document{
  
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  zip: string;
  province: string;
  country: string;
  phone?: string;
  type: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
