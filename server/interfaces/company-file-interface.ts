import { Document, Model, Schema } from "mongoose";
import { Subscriptions } from '../interfaces/subscription-interface';
import { mongoose } from "../config/database";

export interface CompanyFile {

    company: any;
    employee_id: any;
    employee: any;
    date: any;
    day: any;
    status: any;
    action: any;
    created_at?: any;

}