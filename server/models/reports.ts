import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Report } from '../interfaces/report-interface';
import { subscriptions } from './subscriptions';
var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({ // الانذاراات

    employee: {
        type: ObjectId,
        ref: 'employees'
    },
    date: {
        type: Date
    },
    reason: {
        type: ObjectId,
        ref: 'report_reasons'
    },
    created_at: {
        type: Date, "default": Date.now
    },
    updated_at: {
        type: Date, "default": null
    },
    deleted_at: {
        type: Date, "default": null
    }

}, { versionKey: false });

export const reports = mongoose.model<Report>("reports", schema);
