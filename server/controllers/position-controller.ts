import { positions } from "../models/positions";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';

export class PositionsController {


    constructor() {
    }


    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            positions.findOne({})
                .populate('company')
                .where('_id').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no position .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            positions.find({})
                .populate('company')
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        reject('sorry !!!');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    getAllByCompanyId(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            return positions.find({})
                .populate('company')
                .where('company').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        reject('sorry !!!');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    create(body): Promise<{}> {
        return new Promise((resolve, reject) => {
            positions.create(body)
                .then((result) => {
                    this.getAllByCompanyId(body.company).then(all => {
                        resolve(all)
                    }, err => {
                        reject(err)
                    })
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.getById(_id).then((result_by_id: any) => {
                positions.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                    .then((result) => {
                        if (result_by_id.company) {
                            this.getAllByCompanyId(result_by_id.company).then(all => {
                                resolve(all)
                            }, err => {
                                reject(err)
                            })
                        }
                        else {
                            resolve([])
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).catch(err => {
                reject(err)
            })
        });
    }


    update(position, id): Promise<{}> {
        position.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            this.getById(id).then((result_by_id: any) => {
                positions.update({ _id: id }, position)
                    .then((result) => {
                        if (result_by_id.company) {
                            this.getAllByCompanyId(result_by_id.company).then(all => {
                                resolve(all)
                            }, err => {
                                reject(err)
                            })
                        }
                        else {
                            resolve([])
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}