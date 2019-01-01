import { subscriptions } from "../models/subscriptions";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class SubscriptionController  {



    getById(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            return subscriptions.findOne({})
                .where('_id').equals(id)
                .populate('license')
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no subscriptions .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return subscriptions.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(subscription,id): Promise<{}> {
        subscription.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
             subscriptions.update({ _id: id }, subscription)
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
            return subscriptions.find({})
                .populate('company license')
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(subscription): Promise<{}> {
        return new Promise((resolve, reject) => {
            return subscriptions.create(subscription)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }
}