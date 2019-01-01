import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Company as company_interface } from '../interfaces/company-interface';
import { subscriptions } from './subscriptions';

const schema = new Schema({

    company_name: { type: String, "default": 0 },
    trade_name: { type: String, "default": '' },
    address: { type: String, "default": '' },
    email_address: { type: String, "default": '' },
    mobile_number: { type: String, "default": '0' },
    image_url: { type: String, "default": '' },
    fax_number: { type: Number, "default": '' },
    country: { type: String, "default": '' },
    city: { type: String, "default": '' },
    postal_code: { type: String, "default": '' },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'subscriptions' },
    config: { type: mongoose.Schema.Types.ObjectId, ref: 'company_configs' },
    config_finished: { type: mongoose.Schema.Types.Boolean, "default": 0 },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": null },
    deleted_at: { type: Date, "default": null }

}, { versionKey: false });

export const companies = mongoose.model<company_interface>("companies", schema);
