import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { EmployeeVacation } from '../interfaces/employee-vacation-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    employee: { type: ObjectId, ref: 'employees' },
    by_employee: { type: ObjectId, ref: 'employees' },
    reason: { type: ObjectId, ref: 'vacation_reasons' },
    approved_by: { type: ObjectId, ref: 'employees', default: null },
    approved_date: { type: String, default: null },
    status: { type: ObjectId, ref: 'statuses' },
    from_date: { type: Number, "default": 0  },
    to_date: { type: Number, "default": 0  },
    notes: { type: String },
    request_date: { type: Number, "default": 0 },
    file_url: { type: String },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }



}, { versionKey: false });

export const employee_vacations = mongoose.model<EmployeeVacation>("employee_vacations", schema);
