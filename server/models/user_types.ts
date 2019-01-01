import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { UserType } from '../interfaces/user-type-interface';

const schema = new Schema({
    name_en: { type: String, "default": '' },
    name_ar: { type: String, "default": '' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const user_types = mongoose.model<UserType>("user_types", schema);






