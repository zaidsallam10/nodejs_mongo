import { Document, Model, Schema } from "mongoose";

export interface Payroll extends Document {

    by_user?: any;
    to_user?: any;
    status?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}