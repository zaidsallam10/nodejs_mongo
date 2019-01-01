import { companies } from "../models/companies";
import { CRUDController } from './crud-controller';
import { ConfigController } from './config-controller';
import { SubscriptionController } from './subscription-controller';
import { MomentController } from './moment-controller';
import { UserController } from './user-controller';
import { subscriptions } from '../models/subscriptions';
import { company_files } from "../models/company_files";
import { employees } from "../models/employees";
import { company_configs } from "../models/company_configs";
import { EmailController } from "../controllers/email-controller";

import { company_availability } from "../models/company_availability";
import { users } from "../models/users";


var mongoose = require('mongoose');


export class CompanyController {



    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return companies.findOne({})
                .populate('subscriptions')
                .populate('config')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    getAllCompanyEmployees(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            return employees.find({})
                .select('-password -leaves -rewards -raises -deduction -vacations -company')
                .populate('user_type department position')
                .where('company').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no company .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }




    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return companies.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(company, companyID): Promise<{}> {
        company.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            companies.update({ _id: companyID }, company)
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
            companies.find({})
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    create(employee): Promise<{}> {
        return new Promise((resolve, reject) => {
            companies.create(employee)
                .then((company) => {
                    new ConfigController().create({ company: company._id })
                        .then(config => {
                            resolve(company)
                        }, err => {
                            reject(err)
                        })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getCompnaySubscriptions(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            companies.findById({})
                .populate('company license')
                .where('_id').equals(id)
                .then((company: any) => {
                    if (company) {
                        new SubscriptionController().getById(mongoose.Types.ObjectId(company.subscription)).then(result => {
                            resolve(result)
                        }, err => {
                            reject(err)
                        })
                    }
                    else {
                        reject({ "message": "there's no company .. sorry!!" });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    addCompanySubscription(id: any, body: any) {
        return new Promise((resolve, reject) => {
            companies.update({ _id: id }, { subscription: body.subscription, updated_at: new Date() })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }


    getCompanyConfigs(id: any) {
        return new ConfigController().getByCompanyId(id);
    }

    createCompanyConfig(configs) {
        return new ConfigController().create(configs);
    }


    createFile(data): Promise<{}> {
        return new Promise((resolve, reject) => {
            company_files.collection.insertMany(data)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    getFile(id: any): Promise<{}> {
        console.log(id)
        return new Promise((resolve, reject) => {
            company_files.find({})
                .where('company').equals(id)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getFileByTwoDates(id: any, from_date: any, to_date: any): Promise<{}> {
        console.log(id)
        console.log(from_date)
        console.log(to_date)

        return new Promise((resolve, reject) => {
            company_files.find({
                created_at: {
                    $gt: from_date,
                    $lt: to_date
                }
            })
                .where('company').equals(mongoose.Types.ObjectId(id))
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }




    // in on the time
    // in late
    // leave 
    // vacation 


    getFingerPrintFiltered(id: any, year: any, month: any): Promise<{}> {
        var from_date = year + '-' + month + '-01';
        var to_date = year + '-' + month + '-31' + ' ' + '23:56:18.017';
        console.log(from_date)
        console.log(to_date)
        return new Promise((resolve, reject) => {
            company_files.find({
                created_at: {
                    $gt: from_date,
                    $lt: to_date
                }
            })
                .where('company').equals(id)
                .then((result) => {
                    let employees = [];
                    let employeesIds: any = [];
                    if (result) {
                        result.map((item: any) => {
                            if (!employeesIds.includes(item.employee_id)) {
                                employeesIds.push(item.employee_id);
                                let employee = { employee_id: item.employee_id, employee_name: item.employee_name, company: item.company, records: [] };
                                result.map((item2: any) => {
                                    if (item.employee_id == item2.employee_id) {
                                        employee.records.push({ day: item2.day, transactions: item2.transactions })
                                    }
                                })
                                employees.push(employee)
                            }
                        })
                    }
                    resolve(employees);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        // return new Promise((resolve, reject) => {
        //     company_files.find({
        //         day: {
        //             $gt: from_date,
        //             $lt: to_date
        //         }
        //     })
        //         .where('company').equals(mongoose.Types.ObjectId(id))
        //         .select('-company -records')
        //         .then((data) => {
        //             let array = []
        //             let employee_ids: any = []
        //             data.map((item: any) => {
        //                 let employee_id = item.employee_id
        //                 if (!employee_ids.includes(employee_id)) {
        //                     employee_ids.push(employee_id)
        //                     let object: any = {}
        //                     let transactions = []
        //                     data.map((item2: any) => {
        //                         if (item.employee_id == item2.employee_id) {

        //                             item2.transactions.map((transaction) => {
        //                                 transaction.map((record) => {
        //                                     transactions.push(record)
        //                                 })
        //                             })


        //                         }
        //                     })
        //                     object.employee_id = item.employee_id
        //                     object.employee_name = item.employee_name
        //                     object.transactions = transactions
        //                     array.push(object)
        //                 }
        //             })
        //             if (array.length != 0) {
        //                 resolve(array)
        //             }
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });
    }




    getCompanyDetails(company: any) {
        let self = this;
        return self.getCompnaySubscriptions(company).then(function (subscription) {
            return self.getById(company).then(function (myCompany) {
                return new UserController().getAllByCompanyId(company).then(function (users) {
                    return new ConfigController().getByCompanyId(company).then(function (config) {
                        let data = {
                            company: myCompany,
                            subscription: subscription,
                            users: users,
                            config: config
                        }
                        return data;
                    })
                })
            })
        }).catch(err => {
            return { error: err.toString() }
        })
    }

    getUsedAndOriginalEmployeesUsersCapacity(company) {
        return new Promise((resolve, reject) => {
            console.log("asd");

            companies.findOne()
                .populate({ path: 'subscription', populate: { path: 'license' } })
                .where('_id').equals(company)
                .then(data => {
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    getAvailaviltyTime(companyId) {
        return new Promise((resolve, reject) => {
            company_availability.find()
                .where('company').equals(companyId)
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                })
        })
    }


    deleteAvailabilityTime(companyId) {
        return new Promise((resolve, reject) => {
            resolve(company_availability.deleteMany({ "company": companyId }))
        })
    }

    createAvailabilityTime(companyId, body) {
        body.company = companyId;
        return new Promise((resolve, reject) => {
            this.getAvailaviltyTime(companyId).then((myAvailability: any) => {
                if (myAvailability.length != 0 || myAvailability != null) {
                    this.deleteAvailabilityTime(companyId);
                }
                if (body) {
                    let availability = []
                    body.map((item) => {
                        availability.push({
                            company: companyId,
                            day_id: item.day_id,
                            from_time: item.from_time,
                            to_time: item.to_time,
                        })
                    })
                    company_availability.collection.insertMany(availability).then(result => {
                        resolve(result)
                    }).catch(err => {
                        reject(err)
                    })
                } else {
                    reject("please send the body")
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    addCompanyConfig(companyID, configs) {
        return new Promise((resolve, reject) => {
            new ConfigController().getByCompanyId(companyID).then(result1 => {
                configs.company = companyID
                if (result1) {
                    new ConfigController().update(configs).then(result => {
                        resolve(result1)
                    }).catch(err => {
                        reject(err)
                    })
                } else {
                    company_configs.create(configs).then(result => {
                        resolve(result)
                    }).catch(err => {
                        reject(err)
                    })
                }
            }).catch(err => {
                reject(err)
            })
        })
    }




    addBasicInfo(companyId, company) {
        return new Promise((resolve, reject) => {
            let companyObject = new CompanyController()
            companyObject.createAvailabilityTime(companyId, company.company_availabilty).then(availability => {
                companyObject.addCompanyConfig(companyId, company.configs).then(resultConfigs => {
                    company.company_info.config_finished = 1
                    companyObject.update(company.company_info, companyId).then(info => {
                        resolve(company);
                    }).catch(err => {
                        reject(err)
                    })
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    }
















    // this function to
    // 1. add company
    // 2. and his subscription 
    // 3 . and add user to this compoany as adminstrator
    // 4 . and add his availability
    // 5 . and add his configs
    createCompany(company) {
        company.company_name = company.first_name + '' + company.last_name;
        company.trade_name = company.first_name + '' + company.last_name;
        let companyObject = new CompanyController();
        return new Promise((resolve, reject) => {
            companies.create(company).then(result => {
                let subscription = {
                    company: result._id,
                    license: '5b46555b156ae634aceabc3b',
                    start_date: new MomentController().getCurrentDate(),
                    end_date: new MomentController().plusDaysToCurrentDate(14)
                }
                subscriptions.create(subscription).then(mySubscription => {
                    companyObject.addCompanySubscription(result.id, { subscription: mySubscription._id }).then(subs => {
                        let user = { company: result.id, forename: company.first_name, surname: company.last_name, email_address: company.email_address, password: company.password, user_type: '5b6d797b66444c03fb70ae1c' }
                        users.create(user).then(result2 => {
                            new EmailController().sendEmail(company.first_name, company.email_address).then(verificationResult => {
                                resolve(company)
                            }).catch(err => {
                                reject(err)
                            })
                        }).catch(err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err)
                    })
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        });
    }


}