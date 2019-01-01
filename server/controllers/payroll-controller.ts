import { raises } from "../models/raises";
import { statuses } from "../models/statuses";
import { rewards } from "../models/rewards";
import { employees } from "../models/employees";
import { deductions } from "../models/deductions";
import { employee_leaves } from "../models/employee_leaves";
import { employee_vacations } from "../models/employee_vacations";
import { payrolls } from "../models/payrolls";
import { payroll_payments } from "../models/payroll_payments";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
import { EmployeeController } from './employee-controller';
import { StatusController } from './status-controller';
import { mongoose } from "../config/database";

export class PayrollController {

    // we have to check if the statuses for each deduction / raises / rewards are approved
    // this function will get all raises /deductions/rewards and compare them with the salary 
    realyPayroll(employeeID: any, body): Promise<{}> {
        return new Promise((resolve, reject) => {
            // let promises = [];
            new StatusController().getByStatusID(5)
                .then((status: any) => {
                    body.to_user = employeeID;
                    body.status = status._id
                    payrolls.create(body)
                        .then(payroll_result => {

                            // promises.push(


                            // deductions.find({ sum: "amount" })
                            //     .where("employee").equals(employee)
                            //     .then(result222 => {
                            //         resolve('asdasd==' + result222)
                            //     }, err => {
                            //         reject(err)
                            //     })


                            // deductions.collection.sum({}
                            //     { "$match": { "employee": employeeID } },
                            //     // { "$group": { "_id": null, "amount": { "$sum": "$amount" } } }
                            // )

                            // deductions.aggregate([
                            //     { "employee": employeeID },
                            //     {
                            //         $group: {
                            //             _id: "$employee",
                            //             markAvg: { $sum: '$amount' }
                            //         }
                            //     }
                            // ])

                            // deductions.aggregate([

                            //     { '$match': { 'employee': employeeID } },
                            //     {
                            //         $group: {
                            //             _id: null,
                            //             markAvg: { $sum: '$amount' }
                            //         }
                            //     }])


                            //     deductions.aggregate([
                            //         {employee: '$employeeID'}, 
                            //         // sum the `qty` in the carted array, put this result to `qt`
                            //         {$group: {
                            //                _id: null,
                            //                qt: {$sum: '$amount'}
                            //         }}, 
                            //         // add the `qt` and `sku.qty`
                            //         // and reshape the output result.
                            //         // {$project: {
                            //         //        _id: 0, 
                            //         //        productName: '$_id.productName', 
                            //         //        qty: {$add: ['$_id.q', '$qt']}
                            //         // }}
                            //  ])

                            // deductions.find({
                            //     sum: {
                            //         sum: "$amount"
                            //     }
                            // })
                            //     .where("employee").equals(employeeID)
                            //     .then(result222 => {
                            //         resolve('asdasd==' + result222)
                            //     }, err => {
                            //         reject(err)
                            //     })


                            // deductions.aggregate([{
                            //     $group: {
                            //         _id: null,
                            //         totalSpending: {
                            //             $sum: '$amount'
                            //         }
                            //     }
                            // }])

                            deductions.aggregate({
                                $match: { employee: mongoose.Types.ObjectId(employeeID) }
                            }, {
                                    $group: {
                                        _id: null,
                                        totalSpending: {
                                            $sum:
                                            "$amount"
                                        }
                                    }
                                },
                              
                            )


                                // deductions.aggregate(
                                //     { $match: { "employee": employeeID } },
                                //     { $project: { "amount": 1 } },
                                //     { $group: { "_id": null, "result": { $sum: "$amount" } } })

                                // deductions.aggregate([

                                // { $match: { employee: employeeID } },
                                // {
                                //     $group: {
                                //         _id: null,
                                //         total: {
                                //             $sum: "$amount"
                                //         }
                                // }
                                // }
                                // ])
                                .then(result222 => {
                                    resolve('asdasd==' + JSON.stringify(result222))
                                }, err => {
                                    reject(err)
                                })

                            // deductions.aggregate(
                            //     {

                            //          amount: { $sum: 1 } 
                            //     },
                            //     function (err, res) {
                            //         if (err) reject(err);
                            //         resolve(res);
                            //     }
                            // );

                            // )




                            //     promises.push(
                            //         rewards.find({
                            //             created_at: {
                            //                 $gt: body.from_date,
                            //                 $lt: body.to_date
                            //             }
                            //         })
                            //             .where('employee').equals(employee)
                            //     )
                            //     promises.push(
                            //         raises.find({
                            //             created_at: {
                            //                 $gt: body.from_date,
                            //                 $lt: body.to_date
                            //             }
                            //         })
                            //             .where('employee').equals(employee)
                            //     )
                            //     promises.push(
                            //         employee_leaves.find({
                            //             created_at: {
                            //                 $gt: body.from_date,
                            //                 $lt: body.to_date
                            //             }
                            //         })
                            //             .where('employee').equals(employee)
                            //     )
                            //     promises.push(
                            //         employee_vacations.find({
                            //             created_at: {
                            //                 $gt: body.from_date,
                            //                 $lt: body.to_date
                            //             }
                            //         })
                            //             .where('employee').equals(employee)
                            //     )
                            //     promises.push(
                            //         employees.findOne({})
                            //             .where('_id').equals(employee)
                            //     )
                            //     Promise.all(promises)
                            //         .then(result => {
                            //             let all_deductions = result[0];
                            //             let all_rewards = result[1];
                            //             let all_raises = result[2];
                            //             let all_leaves = result[3];
                            //             let all_vacations = result[4];
                            //             let employee = result[5];
                            //             let total_deductions = 0;
                            //             let total_rewards = 0;
                            //             let total_raises = 0;
                            //             let total_leaves = 0;
                            //             let total_vacations = 0;

                            //             all_deductions.map((deduction) => {
                            //                 total_deductions += deduction.amount != null ? deduction.amount : 0;
                            //             })
                            //             all_rewards.map((reward) => {
                            //                 total_rewards += reward.amount != null ? reward.amount : 0;
                            //             })
                            //             all_raises.map((raise) => {
                            //                 total_raises += raise.amount;
                            //             })
                            //             let social_sec_deduction = employee.salary * employee.social_security_deduction
                            //             let my_payroll = {
                            //                 employee: employee,
                            //                 total_deductions: total_deductions,
                            //                 total_rewards: total_rewards,
                            //                 total_raises: total_raises,
                            //                 basic_salary: employee.salary,
                            //                 updated_salary: (employee.salary + ((total_raises + total_rewards) - (total_deductions + social_sec_deduction)))
                            //             }
                            //             payroll_payments.create(my_payroll)
                            //                 .then(data => {
                            //                     resolve(my_payroll)
                            //                 })
                            //                 .catch(err => {
                            //                     reject(err)
                            //                 })
                            //         })
                        }).catch(err => {
                            reject(err)
                        })
                }).catch(err => {
                    reject(err)
                })
        })
    }

}