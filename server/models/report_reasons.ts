import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { ReportReason } from '../interfaces/report_reason-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    reason_en: { type: String,  "default": '' },
    reason_ar: { type: String, "default": '' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const report_reasons = mongoose.model<ReportReason>("report_reasons", schema);












