import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { EmployeeLeaves } from '../interfaces/employee-leaves-interface';
import { CompanyAvailabilityInterface } from '../interfaces/company-availability-interface';

var ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
    },
    day_id: {
        type: mongoose.Schema.Types.Number
    },
    from_time: {
        type: mongoose.Schema.Types.String
    },
    to_time: {
        type: mongoose.Schema.Types.String
    },
    created_at: {
        type: mongoose.Schema.Types.Date, "default": Date.now
    },
    updated_at: {
        type: mongoose.Schema.Types.Date
    }, deleted_at: {
        type: mongoose.Schema.Types.Date
    }

}, { versionKey: false });

export const company_availability = mongoose.model("company_availability", schema);