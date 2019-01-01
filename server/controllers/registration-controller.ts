import { reports } from "../models/reports";
import { companies } from "../models/companies";
import { company_configs } from "../models/company_configs";
import { CompanyController } from "../controllers/company-controller";
import { users } from "../models/users";
import { last_logins } from '../models/last_logins';
import { MomentController } from './moment-controller';
import { AuthController } from './auth-controller';
import { employees } from '../models/employees';
import { subscriptions } from '../models/subscriptions';
import { Mailgun } from 'mailgun';
// var mg = new Mailgun('key-8946a5dfaf2b8043a7db9ea81da7f90c');
// var Mailgun = require('mailgun');
var mg = new Mailgun('8946a5dfaf2b8043a7db9ea81da7f90c');


export class RegistrationController {

    private api_key = 'key-8946a5dfaf2b8043a7db9ea81da7f90c';

    //Your domain, from the Mailgun Control Panel
    private domain = 'postmaster@walleterp.com';

    //Your sending email address
    private from_who = 'zaidsallam2017@gmail.com';


    constructor() {
        // super();
    }

    login(user): Promise<{}> {
        return new Promise((resolve, reject) => {
            employees.findOne({ $and: [{ email_address: user.email_address }, { password: user.password }] })
                .select('-password -leaves -rewards -raises -deduction -vacations')
                .populate('company user_type department position')
                .then((result) => {
                    if (result) {
                        result.token = new AuthController().generateToken(result)
                        resolve(result);
                    }
                    else {
                        reject("try again your password or email address is invalid .. sorry!!");
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    lastLogin(user_id: any, user_type): Promise<{}> {
        return new Promise((resolve, reject) => {
            return last_logins.create({ user_id: user_id, user_type: user_type })
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "you have an error!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    fogotPassword(object: any): Promise<{}> {
        return new Promise((resolve, reject) => {

        });
    }
    resetPassword(object: any): Promise<{}> {
        return new Promise((resolve, reject) => {

        });
    }
    verify(object: any): Promise<{}> {
        return new Promise((resolve, reject) => {

            // let mailgun = new Mailgun(this.api_key);

            var data = {
                //Specify email data
                from: this.from_who,
                //The email to contact
                to: object.mail,
                //Subject and text data  
                subject: 'Hello from Mailgun',
                html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + object.mail + '">Click here to add your email address to a mailing list</a>'
            }

            //Invokes the method to send emails given the above data with the helper library
            // mg.messages().send(data, function (err, body) {
            //     //If there is an error, render the error page
            //     if (err) {
            //         reject(err);
            //     }
            //     //Else we can greet    and leave
            //     else {
            //         //Here "submitted.jade" is the view file for this landing page 
            //         //We pass the variable "email" from the url parameter in an object rendered by Jade
            //         console.log(body);
            //         resolve({ "message": "has been sent" + body });

            //     }
            // });

            mg.sendText('zaidsallam2017@gmail.com', ['z.sallam@3oun.com'],
                'This is the subject',
                'This is the text',
                'smtp.mailgun.org', {},
                function (err) {
                    if (err) console.log('Oh noes: ' + err);
                    else console.log('Success');
                });
        });
    }
    changePassword(object: any): Promise<{}> {
        return new Promise((resolve, reject) => {

        });
    }
    sendVerificationEmail(object: any): Promise<{}> {
        return new Promise((resolve, reject) => {

        });
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
        });
    }





}