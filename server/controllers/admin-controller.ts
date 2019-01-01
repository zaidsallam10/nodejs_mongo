import { companies } from "../models/companies";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { subscriptions } from '../models/subscriptions';
import { licenses } from '../models/licenses';
import { employees } from '../models/employees';
import { user_types } from '../models/user_types';
import { work_permits } from "../models/work_permits";


export class AdminController {


    constructor() {

    }

    getAllLicenses() {
        return new Promise((resolve, reject) => {
            return licenses.find({})
                // .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getAllSubscriptions() {
        return new Promise((resolve, reject) => {
            return subscriptions.find({})
                .populate('licenses')
                .then(data => {
                    if (data)
                        resolve(data);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                }, err => {
                    reject(err);
                });
        });
    }


    getAllEmployees() {
        return new Promise((resolve, reject) => {
            return employees.find({})
                .populate('company')
                .then(data => {
                    if (data)
                        resolve(data);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                }, err => {
                    reject(err);
                });
        });
    }

    getAllUserTypes() {
        return new Promise((resolve, reject) => {
            return user_types.find({})
                // .populate('company')
                .then(data => {
                    if (data)
                        resolve(data);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                }, err => {
                    reject(err);3
                });
        });
    }
    getAllWorkPermits() {
        return new Promise((resolve, reject) => {
            return work_permits.find({})
                .populate('employee company')
                .then(data => {
                    if (data)
                        resolve(data);
                    else
                        resolve({ "message": "there's no data .. sorry!!" });
                }, err => {
                    reject(err);

                })
        })
    }

}