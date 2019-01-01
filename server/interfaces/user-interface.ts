import { Document, Model, Schema } from "mongoose";

export interface Users extends Document {
    company_id?: Number;
    first_name?: any;
    mid_name?: any;
    Last_name?: any;
    email_address?: any;
    mobile_number?: any;
    image_url?: any;
    major?: any;
    user_type_id?: any;
    password?: any;
    role?: any;
    last_sign_in?: any;
    token?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}