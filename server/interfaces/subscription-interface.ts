import { Document, Model, Schema } from "mongoose";

export interface Subscriptions extends Document {

    company_id?: any;
    start_date?: any;
    end_date?: any;
    license_type_id?: any;
    hold?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;



    
}