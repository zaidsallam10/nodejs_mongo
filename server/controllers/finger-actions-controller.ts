import { finger_actions } from "../models/finger_actions";
import { subscriptions } from "../models/subscriptions";

import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class FingerActionsController {



    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            finger_actions.find({})
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no finger_actions .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(body): Promise<{}> {
        return new Promise((resolve, reject) => {
            finger_actions.create(body)
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                })
        })
    }
}