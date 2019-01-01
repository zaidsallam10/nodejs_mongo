import { Document, Model, Schema } from "mongoose";
import { Company } from './company-interface'
export interface Employees extends Document {

  company_id?: Number;
  company?: Company[];
  employee_id?: Number;
  user_type?: any;
  first_name?: any;
  mid_name?: any;
  last_name?: any;
  email_address?: any;
  mobile_number?: any;
  birth_of_date?: any;
  address?: any;
  gender?: any;
  image_url?: any;
  major?: any;
  salary?: Number;
  social_security_deduction?: any;
  insurance_deducted?: any;
  department_id?: Number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  deductions?: any;
  raises?: any;
  vacations?: any;
  leaves?: any;
  employee_vacations?: any;
  finger_data?: any;
  token?: any;
}