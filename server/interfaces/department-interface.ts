import { Document, Model, Schema } from "mongoose";
import { mongoose } from "../config/database";

export interface Department extends Document {

    company?: any;
    name_en?: any;
    name_ar?: any;
    responsible:mongoose.Schema.Types.ObjectId;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}