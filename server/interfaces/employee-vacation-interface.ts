import { Document, Model, Schema } from "mongoose";


export interface EmployeeVacation extends Document {

    employee?: any;
    reason?: any;
    from_date?: any;
    to_date?: any;
    notes?: any;
    file_url?: any;
    approved_by?: any;
    approved_date?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}