import { Document, Model, Schema } from "mongoose";

export interface PayrollPayment extends Document {

    payroll?: any;
    employee?: any;
    total_deductions?: any;
    total_raises?: any;
    total_rewards?: any;
    total_leaves?: any;
    total_vacations?: any;
    basic_salary?: any;
    updated_salary?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}