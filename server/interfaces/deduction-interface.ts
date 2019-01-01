import { Document, Model, Schema } from "mongoose";

export interface Deduction extends Document {

    employee?: any;
    amount?: number;
    date?: any;
    note?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}