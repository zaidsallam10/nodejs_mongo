import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Currencey } from '../interfaces/currencey-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    name_en: { type: String },
    name_ar: { type: String },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const currencies = mongoose.model<Currencey>("currencies", schema);