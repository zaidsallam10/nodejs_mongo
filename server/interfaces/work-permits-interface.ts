import { Document, Model, Schema } from "mongoose";

export interface WorkPermits extends Document {
 
    employee?: any;
    permit_number?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}