import { companies } from "../models/companies";
import { company_configs } from "../models/company_configs";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { subscriptions } from '../models/subscriptions';

export class ConfigController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return company_configs.findOne({})
                .populate('companies')
                .populate('currencey')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no configs .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    getByCompanyId(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            return company_configs.findOne({})
                .populate('company')
                .populate('currencey')
                .where('company').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no configs .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return company_configs.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(config): Promise<{}> {
        config.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return company_configs.update({ company: config.company }, config)
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
            company_configs.find({})
                .populate('currencey')
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(config): Promise<{}> {
        return new Promise((resolve, reject) => {
            company_configs.create(config)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}