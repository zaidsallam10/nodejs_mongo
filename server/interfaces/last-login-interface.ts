import { Document, Model, Schema } from "mongoose";

export interface LastLogin extends Document {


    user_id?: any;
    user_type?: any;
    created_at?: Date;

}