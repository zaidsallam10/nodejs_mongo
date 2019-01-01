import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { EmployeeLeaves } from '../interfaces/employee-leaves-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({  // المغادرات والتأخير

    employee: { type: ObjectId, ref: 'employees' },
    by_employee: { type: ObjectId, ref: 'employees' },
    status: { type: ObjectId, ref: 'statuses' },
    request_date: { type: Number, default: 0 },
    notes: { type: String, "default": '' },
    type: { type: String, enum: ['personal', 'work'] },
    from_date: { type: Number, default: 0 },
    to_date: { type: Number, default: 0 },
    approved_by: { type: ObjectId, ref: 'employees', default: null },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const employee_leaves = mongoose.model<EmployeeLeaves>("employee_leaves", schema);