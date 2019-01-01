import { rewards } from "../models/rewards";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';
import { StatusController } from './status-controller';


export class RewardController extends CRUDController {


    constructor() {
        super();
    }


    getAllBYDate(from_date: any, to_date: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            rewards.find({
                created_at: {
                    $gt: from_date,
                    $lt: to_date
                }
            })
                .where('deleted_at').equals(null)
                .populate('employee')
                .populate('by_employee')
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
            return rewards.findOne({})
                .where('_id').equals(id)
                .where('deleted_at').equals(null)
                .populate('employee')
                .populate('by_employee')
                .populate('status')
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no rewards .. sorry!!" });
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
                rewards.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                    .then((result) => {
                        new EmployeeController().getRewards(result_by_id.employee).then(all => {
                            resolve(all)
                        }).catch(err => {
                            reject(err)
                        })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }).catch(err => { reject(err) })
        });
    }


    update(reward): Promise<{}> {
        let self = this;
        reward.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            self.getById(reward._id).then((result_by_id: any) => {
                rewards.update({ _id: reward._id }, reward)
                    .then((result) => {
                        new EmployeeController().getRewards(result_by_id.employee)
                            .then(all => {
                                resolve(all)
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err)
            })
        });
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return rewards.find({})
                .populate('employee')
                .populate('by_employee')
                .populate('status')
                .sort([['created_at', 'descending']])
                .where('deleted_at').equals(null)
                .populate('employee')
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(reward): Promise<{}> {
        return new Promise((resolve, reject) => {
            reward.status = '5b3515a97491b126b83000b9';
            return rewards.create(reward)
                .then((result) => {
                    new EmployeeController().addRewards(reward.employee, result._id).then(response => {
                        new EmployeeController().getRewards(reward.employee).then(all => {
                            resolve(all);
                        }, err => {
                            reject(err.message);
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



    updateStatus(reward_id: any, body: any, status_id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            let status1 = new StatusController();
            switch (status_id) {
                case 1://  update to pending
                    status1.getByStatusID(1).then((result: any) => {
                        resolve(this.updateStatusId(result._id, reward_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 2://  update to in-progress
                    status1.getByStatusID(2).then((result: any) => {
                        resolve(this.updateStatusId(result._id, reward_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 3://  update to approved
                    status1.getByStatusID(3).then((result: any) => {
                        resolve(this.updateStatusId(result._id, reward_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 4://  update to rejected
                    status1.getByStatusID(4).then((result: any) => {
                        resolve(this.updateStatusId(result._id, reward_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
                case 5: //  update to payrolled
                    status1.getByStatusID(5).then((result: any) => {
                        resolve(this.updateStatusId(result._id, reward_id, body));
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        })
    }

    updateStatusId(status_object_id, reward_id, body) {
        return new Promise((resolve, reject) => {
            rewards.update({ _id: reward_id }, { status: status_object_id })
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err);
                })
        })
    }


}