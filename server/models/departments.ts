import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Department } from '../interfaces/department-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    company: { type: ObjectId, ref: 'companies' },
    responsible: { type: ObjectId, ref: 'employees' },
    name_en: { type: String },
    name_ar: { type: String },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const departments = mongoose.model<Department>("departments", schema);