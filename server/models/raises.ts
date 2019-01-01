import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Raises } from '../interfaces/raises-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({ // زيادة رواتب

    employee: { type: ObjectId, ref: 'employees' },
    by_employee: { type: ObjectId, ref: 'employees' },
    status: { type: ObjectId, ref: 'statuses' },
    amount: { type: Number },
    notes: { type: String },
    request_date: { type: Date },
    approved_by: { type: ObjectId, ref: 'employees', default: null },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const raises = mongoose.model<Raises>("raises", schema);
