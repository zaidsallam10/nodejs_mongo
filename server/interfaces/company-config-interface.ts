import { Document, Model, Schema } from "mongoose";
import { Subscriptions } from '../interfaces/subscription-interface';

export interface CompanyConfig extends Document {

    company: any;
    first_hour_discount: any;
    second_hour_discount: any;
    third_hour_discount: any;
    social_security_deduction: any;
    language: any;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;

}