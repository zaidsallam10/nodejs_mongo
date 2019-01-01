import { dagrees } from "../models/dagrees";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var mongoose = require('mongoose');

export class DagreeController {


    constructor() {
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            dagrees.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no dagrees .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    create(dagree) {
        return new Promise((resolve, reject) => {
            dagrees.create(dagree)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }
}