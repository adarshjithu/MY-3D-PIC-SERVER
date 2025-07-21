import mongoose from "mongoose";
import { IAddress } from "../types/address";


const addressSchema = new mongoose.Schema<IAddress>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    default: '',
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  apartment: {
    type: String,
    trim: true,
    default: '',
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  type: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Address = mongoose.model<IAddress>('Address',addressSchema);
export default Address;