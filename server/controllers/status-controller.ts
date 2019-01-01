import { statuses } from "../models/statuses";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class StatusController {

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            statuses.find({})
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }



    getByStatusID(status_id): Promise<{}> {
        return new Promise((resolve, reject) => {
            statuses.findOne()
                .where('status_id').equals(status_id)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }


    create(status): Promise<{}> {
        return new Promise((resolve, reject) => {
            return statuses.create(status)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }
}