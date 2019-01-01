import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Payroll } from '../interfaces/payroll-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    by_user: { type: ObjectId, ref: 'employees' },
    to_user: { type: ObjectId, ref: 'employees' },
    status: { type: ObjectId, ref: 'statuses' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const payrolls = mongoose.model<Payroll>("payrolls", schema);
