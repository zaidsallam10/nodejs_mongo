import { Document, Model, Schema } from "mongoose";
import { Subscriptions } from '../interfaces/subscription-interface';

export interface Company extends Document {

  company_name?: any;
  trade_name?: any;
  address?: any;
  email_address?: any;
  mobile_number?: any;
  fax_number?: any;
  country?: any;
  city?: any;
  postal_code?: any;
  subscription: [Subscriptions];
  image_url?: any;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}