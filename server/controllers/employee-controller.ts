import { employees } from "../models/employees";
import { rewards } from "../models/rewards";
import { deductions } from "../models/deductions";
import { company_files } from "../models/company_files";
import { raises } from "../models/raises";
import { dagrees } from "../models/dagrees";
import { countries } from "../models/countries";
import { work_permits } from "../models/work_permits";
import { employee_leaves } from "../models/employee_leaves";
import { reports } from "../models/reports";
import { users } from "../models/users";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { companies } from '../models/companies';
import { employee_vacations } from '../models/employee_vacations';
import { Employees } from '../interfaces/employee-interface';
import { DeductionController } from '../controllers/deduction-controller';
import { NumericalController } from '../controllers/numerical-controller';
import { VacationController } from '../controllers/vacation-controller';
import { departments } from "../models/departments";
import { positions } from "../models/positions";
import { vacation_reasons } from "../models/vacation_reasons";
// import { company_files } from "../models/company_files";
import { GenerateController } from '../controllers/generator-controller'
import { ValidationController } from '../controllers/validation-controller'
import { AuthController } from '../controllers/auth-controller'
import { CompanyController } from '../controllers/company-controller'
import { SubscriptionController } from '../controllers/subscription-controller'


var _ = require('underscore');



export class EmployeeController extends CRUDController {


    constructor() {
        super();
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return employees.find({})
                .populate('company')
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getAllME(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return employees.find({})
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
            return employees.findOne({})
                .select('-raises -rewards -deductions -rewards -vacations -leaves')
                .populate('company')
                .populate('position')
                .populate('department')
                .populate('nationality')
                .populate('degree')
                .where('_id').equals(id)
                .then((result) => {
                    console.log(JSON.stringify(result))
                    if (result)
                        resolve(result);
                    else
                        reject("there's no employee .. sorry!!");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }





    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return employees.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    update(employee): Promise<{}> {
        employee.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return employees.update({ _id: employee._id }, employee)
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
            let comp_object = new CompanyController();
            comp_object.getUsedAndOriginalEmployeesUsersCapacity(employee.company)
                .then((company_subsctibtion: any) => {
                    if (company_subsctibtion.subscription.license.employees_numbers <= company_subsctibtion.subscription.used_employees)
                        reject("you cant add employee because you have been acheived you capacity")
                    if (!new ValidationController().checkEmail(employee.email_address) || employee.email_address == null)
                        reject("send your email address or send a valid email address please")
                    employee.password = new GenerateController().generatePassword();
                    users.create(employee).then(result_user => {
                        employee.user_id = result_user._id
                        employees.create(employee)
                            .then((result) => {
                                let new_employee_numbers = parseInt(company_subsctibtion.subscription.used_employees) + 1;
                                new SubscriptionController().update({ used_employees: new_employee_numbers }, company_subsctibtion.subscription._id)
                                    .then(go => {
                                        resolve(result)
                                    }, err => {
                                        reject(err);
                                    })
                            })
                            .catch((err) => {
                                reject(err);
                            }).catch(err => {
                                reject(err);
                            })
                    });
                }, err => {
                    reject(err)
                })
        });
    }


    createVacation(vacation): Promise<{}> {
        return new Promise((resolve, reject) => {
            vacation.status = '5b3515a97491b126b83000b9';
            new VacationController().getById(vacation.employee).then(result_by_id => {
                employee_vacations.create(vacation).then((result) => {
                    new EmployeeController().addVacations(vacation.employee, result._id).then(response => {
                        new EmployeeController().getVacations(vacation.employee).then(all => {
                            resolve(all);
                        }).catch(err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err);
                    })
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getVacations(id: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            employee_vacations.find({})
                .populate('by_employee')
                .populate('status')
                .populate('reason')
                .sort([['created_at', 'descending']])
                .where('employee').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    getRewards(id) {
        return new Promise((resolve, reject) => {
            rewards.find({})
                .populate('by_employee')
                .populate('status')
                .sort([['created_at', 'descending']])
                .where('employee').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getLeaves(id) {
        return new Promise((resolve, reject) => {
            employee_leaves.find({})
                .populate('by_employee')
                .populate('status')
                .sort([['created_at', 'descending']])
                .where('employee').equals(id)
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getReports(id) {
        return new Promise((resolve, reject) => {
            reports.find({})
                .populate('by_employee')
                .populate('status')
                .where('employee').equals(id)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getRaises(id) {
        return new Promise((resolve, reject) => {
            raises.find({})
                .select('-by_employee')
                .populate('status')
                .sort([['created_at', 'descending']])
                .where('deleted_at').equals(null)
                .where('employee').equals(id)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getWorkPermits(id) {
        return new Promise((resolve, reject) => {
            work_permits.find({})
                // .populate('employee')
                .where('employee').equals(id)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    getDudctions(id) {
        return new Promise((resolve, reject) => {
            deductions.find({})
                .select('-by_employee')
                .populate('status')
                .where('deleted_at').equals(null)
                .where('employee').equals(id)
                .sort([['created_at', 'descending']])
                .then((all_deductions) => {
                    resolve(all_deductions);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getByEmployeeId(employee_id: any) {
        return new Promise((resolve, reject) => {
            employees.findOne({})
                .populate('company')
                .where('employee_id').equals(employee_id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no employee .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }






   



    getFingerPrintDate(id: any) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getById(id).then(empploye => {
                company_files.find({
                    employee_id: empploye.employee_id
                })
                    .then((result) => {
                        if (result)
                            resolve(result);
                        else
                            resolve({ "message": "there's no employee .. sorry!!" });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }


    getAllDetails(id: any) {
        return new Promise((resolve, reject) => {
            employees.findOne({})
                .populate('company')
                .populate('position')
                .populate('department')
                .populate('nationality')
                .populate('degree')
                .populate({
                    path: 'deductions',
                    match: { 'deleted_at': null },
                    populate: { path: 'status' }
                })
                .populate({
                    path: 'raises',
                    match: { 'deleted_at': null },
                    populate: { path: 'status' }
                })
                .populate({
                    path: 'rewards',
                    match: { 'deleted_at': null },
                    populate: { path: 'status' }
                })
                .populate({
                    path: 'leaves',
                    match: { 'deleted_at': null },
                    populate: { path: 'status' }
                })
                .populate({
                    path: 'vacations',
                    match: { 'deleted_at': null },
                    populate: { path: 'status reason' }
                })
                .where('_id').equals(id)
                .then((result: Employees) => {
                    let user: any = result;
                    if (result) {
                        this.getMyDataFromFingerPrint(result.employee_id, result.company._id).then(finger => {
                            user.finger_data = finger;
                            resolve(user)
                        }, err => {
                            reject(err)
                        })
                    }
                    else {
                        resolve({ "message": "there's no employee .. sorry!!" });
                    }

                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    addDeduction(employee_id, new_deductions): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            let my_deductions = [];
            self.getAllDetails(employee_id).then(result => {
                if (result.deductions) {
                    my_deductions.push(new_deductions);
                    result.deductions.map((item) => {
                        my_deductions.push(item._id)
                    })
                } else {
                    my_deductions.push(new_deductions);
                }
                employees.update({ _id: employee_id }, { deductions: my_deductions })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }

    addRaises(employee_id, new_raises): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            let my_raises = [];
            self.getAllDetails(employee_id).then(result => {
                if (result.raises) {
                    my_raises.push(new_raises);
                    result.raises.map((item) => {
                        console.log(JSON.stringify(item))
                        my_raises.push(item._id)
                    })
                }
                else {
                    my_raises.push(new_raises);
                }
                employees.update({ _id: employee_id }, { raises: my_raises })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }

    addRewards(employee_id, new_rewards): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            let my_rewards = [];
            self.getAllDetails(employee_id).then(result => {
                if (result.rewards) {
                    my_rewards.push(new_rewards);
                    result.rewards.map((item) => {
                        my_rewards.push(item._id)
                    })
                }
                else {
                    my_rewards.push(new_rewards);
                }
                employees.update({ _id: employee_id }, { rewards: my_rewards })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }



    addLeaves(employee_id, new_leaves): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            let my_leaves = [];
            self.getAllDetails(employee_id).then(result => {
                if (result.leaves) {
                    my_leaves.push(new_leaves);
                    result.leaves.map((item) => {
                        my_leaves.push(item._id)
                    })
                }
                else {
                    my_leaves.push(new_leaves);
                }
                employees.update({ _id: employee_id }, { leaves: my_leaves })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }


    addVacations(employee_id, new_vacation): Promise<{}> {
        let self = this;
        return new Promise((resolve, reject) => {
            let my_vacations = [];
            self.getAllDetails(employee_id).then(result => {
                if (result.vacations) {
                    my_vacations.push(new_vacation);
                    result.vacations.map((item) => {
                        my_vacations.push(item._id)
                    })
                }
                else {
                    my_vacations.push(new_vacation);
                }
                employees.update({ _id: employee_id }, { vacations: my_vacations })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            })
        });
    }


    getAllInitilizes() {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(
                departments.find()
                    .where("deleted_at").equals(null)
            )
            promises.push(
                positions.find()
                    .where("deleted_at").equals(null)
            )
            promises.push(
                vacation_reasons.find()
                    .where("deleted_at").equals(null)
            )
            promises.push(
                dagrees.find()
                    .where("deleted_at").equals(null)
            )
            promises.push(
                countries.find()
                    .where("deleted_at").equals(null)
            )

            Promise.all(promises).then(result => {
                resolve({
                    departments: result[0],
                    positions: result[1],
                    vacation_reasons: result[2],
                    dagrees: result[3],
                    countries: result[4]

                })
            }).catch(err => { reject(err) })
        })
    }


    getEmployeeIdByCompanyIdAndEmployeeNumber(company, employee_number) {
        return new Promise((resolve, reject) => {
            employees.findOne({})
                .where("company").equals(company)
                .where("employee_id").equals(employee_number)
                .then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }

    getMyDataFromFingerPrint(employee_id, company) {
        return new Promise((resolve, reject) => {
            company_files.find({})
                .where("company").equals(company)
                .where("employee_id").equals(employee_id)
                .then(result => {

                    // here we will split the data into array of arrays every array contain all the data for a specefic day

                    let finger_data = [];

                    result.map((item: any, index1) => {
                        if (finger_data.length == 0) {
                            let my_array = []
                            my_array.push(item)
                            finger_data.push(my_array)
                        }
                        else {
                            finger_data.map((array: any, index2) => {
                                array.map((item3, index3) => {
                                    if (item3.date == item.date)
                                        array.push(item)
                                    else {
                                        let my_array2 = []
                                        my_array2.push(item)
                                        finger_data.push(my_array2)
                                    }
                                })
                            })
                        }
                    })


                    if (finger_data) {
                        resolve(finger_data)
                    }
                }, err => {
                    reject(err)
                })
        })
    }

    resetPassword(userId, body) {
        return new Promise((resolve, reject) => {
            employees.update({ _id: userId }, { password: body.password })
                .then(result => {
                    resolve({ "success": "done" })
                }, err => {
                    reject(err)
                })
        })
    }
}