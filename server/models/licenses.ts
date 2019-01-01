import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Licenses } from '../interfaces/license-interface';

const schema = new Schema({

    name_en: { type: String, "default": '' },
    name_ar: { type: String, "default": '' },
    users_numbers: { type: Number, "default": 0 },
    employees_numbers: { type: Number, "default": 0 },
    price: { type: Number, "default": 0 },
    hold: { type: Boolean, "default": false },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const licenses = mongoose.model<Licenses>("licenses", schema);