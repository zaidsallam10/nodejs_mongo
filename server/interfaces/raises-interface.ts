import { Document, Model, Schema } from "mongoose";

export interface Raises extends Document {

    employee?: any;
    amount?: any;
    date?: any;
    note?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}