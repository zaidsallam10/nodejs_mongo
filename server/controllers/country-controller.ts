import { countries } from "../models/countries";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var mongoose = require('mongoose');

export class CountryController {


    constructor() {
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            countries.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's are countries .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    create(country) {
        return new Promise((resolve, reject) => {
            countries.create(country)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }
}