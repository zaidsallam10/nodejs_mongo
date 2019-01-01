import { deductions } from "../models/deductions";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';
import { StatusController } from './status-controller';


import { mongoose } from "../config/database";
var ObjectId = mongoose.Schema.Types.ObjectId;

export class DeductionController extends CRUDController {


    constructor() {
        super();
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return deductions.find({})
                .populate('employee')
                .populate('by_employee')
                .populate('status')
                .sort([['created_at', 'descending']])
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return deductions.findOne({})
                .populate('employee')
                .populate('by_employee')
                .populate('status')
                .where('_id').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        reject("there's no deductions .. sorry!!");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getById(_id)
                .then((result) => {
                    deductions.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                        .then(by_id_result => {
                            new EmployeeController().getDudctions(result.employee).then(all => {
                                resolve(all);
                            }).catch(err => {

                            })
                        }).catch(err => {
                            reject(err);
                        })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(deduct): Promise<{}> {
        let self = this;
        deduct.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            if (deduct._id) {
                deductions.update({ _id: deduct._id }, deduct)
                    .then((result) => {
                        self.getById(deduct._id).then(get_by_id => {
                            new EmployeeController().getDudctions(get_by_id.employee).then(all => {
                                resolve(all);
                            }, err => {
                                reject(err)
                            })
                        }).catch(err => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
            else {
                reject("please add the _id in the body")
            }
        });
    }


    create(deduct): Promise<{}> {
        return new Promise((resolve, reject) => {
            deduct.status = '5b3515a97491b126b83000b9';
            return deductions.create(deduct)
                .then((result) => {
                    new EmployeeController().addDeduction(deduct.employee, result._id).then(response => {
                        new EmployeeController().getDudctions(deduct.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    updateStatus(dedction_id: any, body: any, status_id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            let status1 = new StatusController();
            switch (status_id) {
                case 1://  update to pending
                    status1.getByStatusID(1).then((result: any) => {
                        resolve(this.updateStatusId(result._id, dedction_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 2://  update to in-progress
                    status1.getByStatusID(2).then((result: any) => {
                        resolve(this.updateStatusId(result._id, dedction_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 3://  update to approved
                    status1.getByStatusID(3).then((result: any) => {
                        resolve(this.updateStatusId(result._id, dedction_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 4://  update to rejected
                    status1.getByStatusID(4).then((result: any) => {
                        resolve(this.updateStatusId(result._id, dedction_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 5: //  update to payrolled
                    status1.getByStatusID(5).then((result: any) => {
                        resolve(this.updateStatusId(result._id, dedction_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        })
    }

    updateStatusId(status_object_id, dedction_id, body) {
        return new Promise((resolve, reject) => {
            deductions.update({ _id: dedction_id }, { status: status_object_id })
                // .where("_id").equals(dedction_id)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err);
                })
        })
    }




}