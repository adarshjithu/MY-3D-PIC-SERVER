import { Roles } from "../models/userModel";

// types/User.ts
export enum AuthType {
  MOBILE = "mobile",
  GOOGLE = "google",
  EMAIL = "email",
}

export interface IUser {
    _id:any
  firstName: string;
  lastName: string;
  email:string;
  phoneNumber: number;
  countryCode: number;
  role:Roles
  country?: string;
  authType: AuthType;
  password: string;
  image?: string;
  isActive?: boolean;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
