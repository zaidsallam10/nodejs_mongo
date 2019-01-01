import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";
import { Employees } from '../interfaces/employee-interface';
import { companies } from './companies';
var Mongoose = require('mongoose');

const schema = new Schema({

  company: { type: Schema.Types.ObjectId, ref: 'companies' },
  department: { type: Schema.Types.ObjectId, ref: 'departments' },
  position: { type: Schema.Types.ObjectId, ref: 'positions' },
  deductions: [{ type: Schema.Types.ObjectId, ref: 'deductions' }],
  degree: { type: Schema.Types.ObjectId, ref: 'dagrees' },
  raises: [{ type: Schema.Types.ObjectId, ref: 'raises' }],
  rewards: [{ type: Schema.Types.ObjectId, ref: 'rewards' }],
  leaves: [{ type: Schema.Types.ObjectId, ref: 'employee_leaves' }],
  vacations: [{ type: Schema.Types.ObjectId, ref: 'employee_vacations' }],
  finger_data: [],
  id_number: { type: String, "default": '' },
  nationality: { type: Schema.Types.ObjectId, ref: 'countries' },
  employee_id: { type: Number, "default": 0 },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
  forename: { type: String, "default": '' },
  midname: { type: String, "default": '' },
  surname: { type: String, "default": '' },
  email_address: { type: String, "default": '' },
  password: { type: String, default: '' },
  mobile_number: { type: String, "default": '0' },
  birth_date: { type: Number, "default": 0 },
  gender: { type: String, enum: ["male", "female"] },
  address: { type: String, "default": '' },
  image_url: { type: String, "default": '' },
  contract_url: { type: String, "default": '' },
  salary: { type: Number, "default": 0 },
  social_security_deduction: { type: Number, "default": 0 },  //((setting table))   // خصم الضمان الاجتماعي
  insurance_deducted: { type: Number, "default": 0 }, // خصم التأمين
  joined_date: { type: Number, "default": 0 },
  token: { type: String },
  created_at: { type: Date, "default": Date.now },
  updated_at: { type: Date, "default": null },
  deleted_at: { type: Date, "default": null },


},
  { versionKey: false },
);
export const employees = mongoose.model<Employees>("employees", schema);
