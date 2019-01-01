import { Document, Model, Schema } from "mongoose";

export interface UserType extends Document {
    name_en?: any;
    name_ar?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}