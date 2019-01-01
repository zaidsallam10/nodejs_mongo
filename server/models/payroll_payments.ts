import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { PayrollPayment } from '../interfaces/payroll-payment-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    payroll: { type: ObjectId, ref: 'payrolls' },
    employee: { type: ObjectId, ref: 'employees' },
    total_deductions: { type: Number },
    total_raises: { type: Number },
    total_rewards: { type: Number },
    total_leaves: { type: Number },
    total_vacations: { type: Number },
    basic_salary: { type: Number },
    updated_salary: { type: Number },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const payroll_payments = mongoose.model<PayrollPayment>("payroll_payments", schema);
