import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { VacationReason } from '../interfaces/vacation-reason-interface';

const schema = new Schema({

    name_en: { type: String, "default": '' },
    name_ar: { type: String, "default": '' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const vacation_reasons = mongoose.model<VacationReason>("vacation_reasons", schema);