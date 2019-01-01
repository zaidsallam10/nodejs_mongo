import { Document, Model, Schema } from "mongoose";

export interface Rewards extends Document {

    employee?: any;
    value?: any;
    note?: any;
    date?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}