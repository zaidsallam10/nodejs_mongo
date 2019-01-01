import { Document, Model, Schema } from "mongoose";

export interface Licenses extends Document {

    name?: any;
    number_of_users?: any;
    duration?: any;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

}