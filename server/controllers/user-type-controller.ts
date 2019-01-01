import { user_types } from "../models/user_types";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class UserTypeController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return user_types.findOne({})
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no user .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return user_types.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(user): Promise<{}> {
        user.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return user_types.update({ _id: user._id }, user)
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
            return user_types.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(type): Promise<{}> {
        return new Promise((resolve, reject) => {
            return user_types.create(type)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}