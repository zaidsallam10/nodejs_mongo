import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Status } from '../interfaces/status-interface';

const schema = new Schema({

    status_id: { type: Number },
    name_en: { type: String },
    name_ar: { type: String }

}, { versionKey: false });

export const statuses = mongoose.model<Status>("statuses", schema);
