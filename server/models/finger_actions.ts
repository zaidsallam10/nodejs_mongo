import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

const schema = new Schema({

    name_en: { type: String, "default": '' },
    name_ar: { type: String, "default": '' },
    created_at: { type: Date, "default": Date.now },

}, { versionKey: false });

export const finger_actions = mongoose.model("finger_actions", schema);
