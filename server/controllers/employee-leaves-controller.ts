import { employee_leaves } from "../models/employee_leaves";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';
import { StatusController } from './status-controller';


export class EmployeeLeavesController extends CRUDController {


    constructor() {
        super();
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return employee_leaves.find({})
                .populate('by_employee')
                .populate('status')
                .where('deleted_at').equals(null)
                .sort([['created_at', 'descending']])
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
            return employee_leaves.findOne({})
                .populate('by_employee')
                .populate('status')
                .where('deleted_at').equals(null)
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no departures and delays .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: any): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getById(_id).then((result_by_id: any) => {
                employee_leaves.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                    .then((result) => {
                        new EmployeeController().getLeaves(result_by_id.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).catch(err => {
                reject(err);
            })
        });
    }


    update(leave): Promise<{}> {
        let self = this;
        leave.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            self.getById(leave._id).then((result_by_id: any) => {
                employee_leaves.update({ _id: leave._id }, leave)
                    .then((result) => {
                        new EmployeeController().getLeaves(result_by_id.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).catch(err => {
                reject(err);
            })
        });
    }


    create(leaves): Promise<{}> {
        return new Promise((resolve, reject) => {
            leaves.status = '5b3515a97491b126b83000b9';
            employee_leaves.create(leaves)
                .then((result) => {
                    new EmployeeController().addLeaves(leaves.employee, result._id).then(response => {
                        new EmployeeController().getLeaves(leaves.employee).then(all => {
                            resolve(all)
                        }, err => {
                            reject(err.message);
                        })
                    }).catch(err => {
                        reject(err.message);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }






    updateStatus(leave_id: any, body: any, status_id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            let status1 = new StatusController();
            switch (status_id) {
                case 1://  update to pending
                    status1.getByStatusID(1).then((result: any) => {
                        resolve(this.updateStatusId(result._id, leave_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 2://  update to in-progress
                    status1.getByStatusID(2).then((result: any) => {
                        resolve(this.updateStatusId(result._id, leave_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 3://  update to approved
                    status1.getByStatusID(3).then((result: any) => {
                        resolve(this.updateStatusId(result._id, leave_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 4://  update to rejected
                    status1.getByStatusID(4).then((result: any) => {
                        resolve(this.updateStatusId(result._id, leave_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 5: //  update to payrolled
                    status1.getByStatusID(5).then((result: any) => {
                        resolve(this.updateStatusId(result._id, leave_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        })
    }

    updateStatusId(status_object_id, leave_id, body) {
        return new Promise((resolve, reject) => {
            employee_leaves.update({ _id: leave_id }, { status: status_object_id })
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err);
                })
        })
    }


}