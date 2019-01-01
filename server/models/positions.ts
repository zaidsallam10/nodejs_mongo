import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Position } from '../interfaces/position-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    company: { type: ObjectId, ref: 'companies' },
    name_en: { type: String },
    name_ar: { type: String },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const positions = mongoose.model<Position>("positions", schema);
