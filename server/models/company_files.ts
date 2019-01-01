import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { EmployeeLeaves } from '../interfaces/employee-leaves-interface';
import { CompanyFile } from '../interfaces/company-file-interface';

var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    employee_id: {
        type: mongoose.Schema.Types.Number
    },
    employee_name: {
        type: mongoose.Schema.Types.String
    },
    day: {
        type: mongoose.Schema.Types.String
    },
    transactions: {
        type: mongoose.Schema.Types.Mixed
    },
    created_at: {
        type: mongoose.Schema.Types.Date, "default": Date.now
    }

}, { versionKey: false });

export const company_files = mongoose.model("company_files", schema);