import { users } from "../models/users";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { GenerateController } from './generator-controller';
import { ValidationController } from './validation-controller';
import { AuthController } from './auth-controller';
import { Users } from '../interfaces/user-interface';
import { SubscriptionController } from './subscription-controller';
import { CompanyController } from './company-controller';
export class UserController {



    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            users.findOne({})
                .populate('role')
                .populate('company')
                .where('_id').equals(id)
                // .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result)
                    else
                        reject("there is no employees")
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.getById(_id).then((user: any) => {
                users.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                    .then((result) => {
                        resolve(this.getAllByCompanyId(user.company))
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }, err => {
                reject(err)
            })
        });
    }


    update(user, id): Promise<{}> {
        user.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            users.update({ _id: id }, user)
                .then((result) => {
                    resolve(this.getAllByCompanyId(user.company))
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            users.find({})
                .populate('role')
                .populate('company')
                // .where('deleted_at').equals(null)
                .then((result) => {
                    if (result)
                        resolve(result)
                    else
                        reject("there is no employees")
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // comp_object.getUsedAndOriginalEmployeesUsersCapacity(user.company)
    // .then((company_subsctibtion: any) => {
    // .catch((err) => { reject({ error: err }); });
    // })
    // if (company_subsctibtion.subscription.license.users_numbers <= company_subsctibtion.subscription.used_users)
    // reject  ({ error: "you cant add employee because you have been acheived you capacity" })
    // let new_employee_numbers = parseInt(company_subsctibtion.subscription.used_employees) + 1;
    // new SubscriptionController().update({ used_employees: new_employee_numbers }, company_subsctibtion.subscription._id)
    // .then(go => {
    //     // resolve(result)
    // })





    create(user) {
        let comp_object = new CompanyController();
        user.password = new GenerateController().generatePassword();
        let result = { users: null, user: null };
        return new Promise((resolve, reject) => {
            if (!new ValidationController().checkEmail(user.email_address) || user.email_address == null)
                reject({ error: "send your email address or send a valid email address please" })
            return users.create(user).then((user: any) => {
                result.user = user;
                return this.getAllByCompanyId(user.company)
            }).then((users) => {
                result.users = users;
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }







    getAllByCompanyId(company: any) {
        return new Promise((resolve, reject) => {
            users.find({})
                .where("company").equals(company)
                // .where('deleted_at').equals(null)
                .populate('role')
                .populate('company')
                .then(result => {
                    if (result)
                        resolve(result)
                    else
                        reject("there is no employees")
                }).catch(err => {
                    reject(err)
                })
        })
    }

    resetPassword(userId, body) {
        return new Promise((resolve, reject) => {
            users.update({ _id: userId }, { password: body.password }).then(result => {
                this.getById(userId).then((user: any) => {
                    resolve({ "password": user.password })
                }, err => {
                    reject(err)
                })
            }, err => {
                reject(err)
            })
        })
    }

    login(body) {
        return new Promise((resolve, reject) => {
            console.log(body)
            if (body.email_address == null || body.password == null)
                reject("send your email address and your password please")
            users.findOne({})
                .populate('role')
                .populate('company')
                .where('email_address').equals(body.email_address)
                .where('password').equals(body.password)
                .then((result: Users) => {
                    let tok = new AuthController();
                    // console.log(tok.generateToken(result))
                    result.token = tok.generateToken(result)
                    resolve(result)
                }, err => {
                    reject(err)
                })
        })
    }

}