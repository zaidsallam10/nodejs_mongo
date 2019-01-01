import { work_permits } from "../models/work_permits";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class WorkPermitsController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return work_permits.findOne({})
                .populate('employee')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no permit .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return work_permits.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(permit): Promise<{}> {
        permit.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return work_permits.update({ _id: permit._id }, permit)
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
            return work_permits.find({})
                .populate('employee')
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(employee): Promise<{}> {
        return new Promise((resolve, reject) => {
            return work_permits.create(employee)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}