import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Deduction } from '../interfaces/deduction-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({  // الخصومات

    employee: { type: ObjectId, ref: 'employees' },
    by_employee: { type: ObjectId, ref: 'employees' },
    amount: { type: Number },
    notes: { type: String, "default": '' },
    request_date: { type: Number, "default": 0  },
    status: { type: ObjectId, ref: 'statuses' },
    approved_by: { type: ObjectId, ref: 'employees', default: null },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });



export const deductions = mongoose.model<Deduction>("deductions", schema);
