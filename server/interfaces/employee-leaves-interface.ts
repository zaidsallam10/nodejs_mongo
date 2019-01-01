import { Document, Model, Schema } from "mongoose";

export interface EmployeeLeaves extends Document {

    employee?: any;
    type?: any;
    date?: any;
    note?: any;
    hours?: any;
    from_date?: any;
    to_date?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}