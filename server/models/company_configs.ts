import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { CompanyConfig } from '../interfaces/company-config-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({  // اعدادات الشركة

    company: { type: ObjectId, ref: 'companies' },
    currencey: { type: ObjectId, ref: 'currencies' },
    start_delaying_first_hour: { type: mongoose.Schema.Types.String, default: '10' },
    start_delaying_second_hour: { type: mongoose.Schema.Types.String, default: '15' },
    start_delaying_third_hour: { type: mongoose.Schema.Types.String, default: '20' },
    first_hour_deduction: { type: mongoose.Schema.Types.Number, default: 0 },
    second_hour_deduction: { type: mongoose.Schema.Types.Number, default: 0 },
    third_hour_dedction: { type: mongoose.Schema.Types.Number, default: 0 },
    start_working_hour: { type: mongoose.Schema.Types.String, default: '8:00' },
    end_working_hour: { type: mongoose.Schema.Types.String, default: '17:00' },
    social_security_company: { type: Number, default: 0 },
    social_security_employee: { type: Number, default: 0 },
    income_tax: { type: Number, default: 0 },
    language: { type: String, enum: ['en', 'ar'], default: 'ar' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const company_configs = mongoose.model<CompanyConfig>("company_configs", schema);
