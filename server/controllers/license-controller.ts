import { licenses } from "../models/licenses";
import { subscriptions } from "../models/subscriptions";

import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class LicenseController {



    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return licenses.findOne({})
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no license .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            subscriptions.find({})
                .where('license').equals(_id)
                .where('deleted_at').equals(null)
                .then(result => {
                    if (result)
                        reject("this licencse is used you cant delete it")
                    licenses.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }).catch(error => { reject(error) })
        });
    }


    update(license, id): Promise<{}> {
        license.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return licenses.update({ _id: id }, license)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return licenses.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(license): Promise<{}> {
        return new Promise((resolve, reject) => {
            return licenses.create(license)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}