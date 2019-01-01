import { Document, Model, Schema } from "mongoose";
import { Subscriptions } from '../interfaces/subscription-interface';

export interface CompanyAvailabilityInterface extends Document {

    company: any;
    day_id: any;
    from_time: any;
    to_time: any;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;

}