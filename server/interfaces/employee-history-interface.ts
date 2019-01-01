import { Document, Model, Schema } from "mongoose";

export interface EmployeeHistory extends Document {

    employee: any;
    employee_id?: any;
    from_date?: any;
    to_date?: any;
    status?: any;

}