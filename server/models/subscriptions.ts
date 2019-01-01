import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Subscriptions } from '../interfaces/subscription-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    company: { type: ObjectId, ref: 'companies' },
    license: { type: ObjectId, ref: 'licenses' },
    used_users: { type: Number },
    used_employees: { type: Number },
    start_date: { type: Date, "default": '' },
    end_date: { type: Date, "default": '' },
    hold: { type: Boolean, "default": false },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }


}, { versionKey: false });

export const subscriptions = mongoose.model<Subscriptions>("subscriptions", schema);












