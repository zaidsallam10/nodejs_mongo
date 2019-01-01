import { departments } from "../models/departments";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var mongoose = require('mongoose');

export class DepartmentController {


    constructor() {
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            departments.find({})
                .populate('company responsible')
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no deprtments .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }




    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            departments.findOne({})
                .populate('company responsible')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no deprtment .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }



    createBulk(my_departments): Promise<{}> {
        return new Promise((resolve, reject) => {
            console.log(my_departments)
            if (my_departments) {
                my_departments.map((item) => {
                    if (item.company) {
                        item.company = mongoose.Types.ObjectId(item.company);
                    } else {
                        reject("please fill the company id")
                    }
                })
            }
            else {
                reject("please fill your data");
            }
            return departments.collection.insert(my_departments)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }


    getAllByCompanyId(id): Promise<{}> {
        console.log(id)
        return new Promise((resolve, reject) => {
            return departments.find({})
                .populate('responsible')
                .where('company').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no deprtments .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(body) {
        return new Promise((resolve, reject) => {
            departments.create(body)
                .then((result) => {
                    this.getAllByCompanyId(body.company).then(all => {
                        resolve(all)
                    }, err => {
                        reject(err);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });

    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.getById(_id).then((result_by_id: any) => {
                departments.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
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


    update(department, id): Promise<{}> {
        department.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            this.getById(id).then((result_by_id: any) => {
                departments.update({ _id: id }, department)
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