import { Document, Model, Schema } from "mongoose";

export interface Report extends Document {

    employee?: any;
    date?: any;
    reason_id?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}