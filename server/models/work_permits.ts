import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { WorkPermits } from '../interfaces/work-permits-interface';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({  // تراخيص العمل

    employee: {
        type: ObjectId,
        ref: 'employees'
    },
    permit_number: { type: Number, "default": '' },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const work_permits = mongoose.model<WorkPermits>("work_permits", schema);