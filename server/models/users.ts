import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Users } from '../interfaces/user-interface';

const schema = new Schema({

    company: { type: Schema.Types.ObjectId, ref: 'companies' },
    role: { type: Schema.Types.ObjectId, ref: 'roles' },
    user_type: { type: Schema.Types.ObjectId, ref: 'user_types' },
    forename: { type: String, "default": '' },
    midname: { type: String, "default": '' },
    surname: { type: String, "default": '' },
    email_address: { type: String, "default": '' },
    password: { type: String, "default": 0 },
    mobile_number: { type: String, "default": '0' },
    image_url: { type: String, "default": '' },
    last_sign_in: { type: Date, "default": new Date() },
    token: { type: String, },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const users = mongoose.model<Users>("users", schema);