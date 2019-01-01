import { report_reasons } from "../models/report_reasons";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class ReportReasonController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return report_reasons.findOne({})
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no report reasons .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return report_reasons.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(report): Promise<{}> {
        report.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return report_reasons.update({ _id: report._id }, report)
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
            return report_reasons.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(reason): Promise<{}> {
        return new Promise((resolve, reject) => {
            return report_reasons.create(reason)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }
}