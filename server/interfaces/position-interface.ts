import { Document, Model, Schema } from "mongoose";

export interface Position extends Document {

    company?: any;
    name_en?: any;
    name_ar?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}