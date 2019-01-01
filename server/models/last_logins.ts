import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { LastLogin } from '../interfaces/last-login-interface';

const schema = new Schema({

    user_id: { type: String, "default": '' },
    user_type: { type: String, "default": '' },
    created_at: { type: Date, "default": Date.now },

}, { versionKey: false });

export const last_logins = mongoose.model<LastLogin>("last_logins", schema);
