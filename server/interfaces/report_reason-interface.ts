import { Document, Model, Schema } from "mongoose";

export interface ReportReason extends Document {

    reason_en?: any;
    reason_ar?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}