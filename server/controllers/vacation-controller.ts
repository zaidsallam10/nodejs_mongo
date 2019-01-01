import { vacation_reasons } from '../models/vacation_reasons';
import { employee_vacations } from '../models/employee_vacations';
import { EmployeeController } from './employee-controller';
import { MomentController } from './moment-controller';
import { StatusController } from './status-controller';


export class VacationController {


    createVacationReasons(reason): Promise<{}> {
        return new Promise((resolve, reject) => {
            return vacation_reasons.create(reason)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getVacationReasons(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return vacation_reasons.find()
                .then((reasons) => {
                    resolve(reasons);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            employee_vacations.find({})
                .populate('reason')
                .populate('status')
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
            return employee_vacations.findOne({})
                .populate('employee')
                .populate('reason')
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


    create(raise): Promise<{}> {
        return new Promise((resolve, reject) => {
            employee_vacations.create(raise)
                .then((result) => {
                    new EmployeeController().addRaises(raise.employee, result._id).then(response => {
                        resolve(result);
                    }).catch(err => {
                        reject(err.message);
                    })
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }

    update(vacation): Promise<{}> {
        let self = this;
        vacation.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            if (vacation._id) {
                employee_vacations.update({ _id: vacation._id }, vacation)
                    .then((result) => {
                        self.getById(vacation._id).then((get_by_id: any) => {
                            new EmployeeController().getVacations(get_by_id.employee).then(all => {
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


    delete(_id: number): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getById(_id)
                .then((result: any) => {
                    employee_vacations.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                        .then((by_id_result: any) => {
                            new EmployeeController().getVacations(result.employee).then(all => {
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


    updateStatus(vacation_id: any, body: any, status_id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            let status1 = new StatusController();
            switch (status_id) {
                case 1://  update to pending
                    status1.getByStatusID(1).then((result: any) => {
                        resolve(this.updateStatusId(result._id, vacation_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 2://  update to in-progress
                    status1.getByStatusID(2).then((result: any) => {
                        resolve(this.updateStatusId(result._id, vacation_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 3://  update to approved
                    status1.getByStatusID(3).then((result: any) => {
                        resolve(this.updateStatusId(result._id, vacation_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 4://  update to rejected
                    status1.getByStatusID(4).then((result: any) => {
                        resolve(this.updateStatusId(result._id, vacation_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 5: //  update to payrolled
                    status1.getByStatusID(5).then((result: any) => {
                        resolve(this.updateStatusId(result._id, vacation_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        })
    }

    updateStatusId(status_object_id, vacation_id, body) {
        return new Promise((resolve, reject) => {
            employee_vacations.update({ _id: vacation_id }, { status: status_object_id })
                // .where("_id").equals(dedction_id)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err);
                })
        })
    }

}