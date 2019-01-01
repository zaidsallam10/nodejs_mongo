import { currencies } from "../models/currencies";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var mongoose = require('mongoose');

export class CurrenceyController {


    constructor() {
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            currencies.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no currencies .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            currencies.findOne()
                .where('_id').equals(id)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }

    create(body) {
        return new Promise((resolve, reject) => {
            currencies.create(body)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }
}