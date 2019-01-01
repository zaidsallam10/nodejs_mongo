import { raises } from "../models/raises";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';
import { StatusController } from './status-controller';


export class RaisesController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return raises.findOne({})
                .populate('employee')
                .populate('by_employee')
                .populate('status')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no raises .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getById(_id).then((result_by_id: any) => {
                raises.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                    .then((result) => {
                        new EmployeeController().getRaises(result_by_id.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).catch(err => { reject(err) })
        });
    }


    update(raise): Promise<{}> {
        let self = this;
        raise.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            self.getById(raise._id).then((result_by_id: any) => {
                raises.update({ _id: raise._id }, raise)
                    .then((result) => {
                        new EmployeeController().getRaises(result_by_id.employee).then(all => {
                            resolve(all);
                        }, err => {
                            reject(err);
                        })
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

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return raises.find({})
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


    create(raise): Promise<{}> {
        return new Promise((resolve, reject) => {
            raise.status = '5b3515a97491b126b83000b9';
            return raises.create(raise)
                .then((result) => {
                    new EmployeeController().addRaises(raise.employee, result._id).then(response => {
                        new EmployeeController().getRaises(raise.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err.message);
                    })
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }



    updateStatus(raise_id: any, body: any, status_id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            let status1 = new StatusController();
            switch (status_id) {
                case 1://  update to pending
                    status1.getByStatusID(1).then((result: any) => {
                        resolve(this.updateStatusId(result._id, raise_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 2://  update to in-progress
                    status1.getByStatusID(2).then((result: any) => {
                        resolve(this.updateStatusId(result._id, raise_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 3://  update to approved
                    status1.getByStatusID(3).then((result: any) => {
                        resolve(this.updateStatusId(result._id, raise_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 4://  update to rejected
                    status1.getByStatusID(4).then((result: any) => {
                        resolve(this.updateStatusId(result._id, raise_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 5: //  update to payrolled
                    status1.getByStatusID(5).then((result: any) => {
                        resolve(this.updateStatusId(result._id, raise_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        })
    }

    updateStatusId(status_object_id, raise_id, body) {
        return new Promise((resolve, reject) => {
            raises.update({ _id: raise_id }, { status: status_object_id })
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err);
                })
        })
    }

}