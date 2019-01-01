import { reports } from "../models/reports";
import { rewards } from "../models/rewards";
import { raises } from "../models/raises";
import { deductions } from "../models/deductions";
import { employee_leaves } from "../models/employee_leaves";
import { employee_vacations } from "../models/employee_vacations";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';

export class ReportController extends CRUDController {


    constructor() {
        super();
    }

    getById(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return reports.findOne({})
                .populate('employee reason')
                .where('_id').equals(id)
                .then((result) => {
                    if (result)
                        resolve(result);
                    else
                        resolve({ "message": "there's no reports .. sorry!!" });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    delete(_id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            return reports.update({ _id: _id }, { $set: { deleted_at: new MomentController().getCurrentDate() } })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    update(report): Promise<{}> {
        report.updated_at = new MomentController().getCurrentDate();
        return new Promise((resolve, reject) => {
            return reports.update({ _id: report._id }, report)
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
            reports.find({})
                .populate('employee reason')
                .where('deleted_at').equals(null)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    create(reason): Promise<{}> {
        return new Promise((resolve, reject) => {
            return reports.create(reason)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }

    exportAllData(from_date, to_date, employee, department) {
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(
                deductions.find({ created_at: { $gt: from_date, $lt: to_date } })
                    .populate('status')
                    .populate('employee')
                    .populate({
                        path: 'employee',
                        match: { 'deleted_at': null },
                        populate: { path: 'department' }
                    })
                    .where("deleted_at").equals(null)
            )
            promises.push(
                employee_leaves.find({ created_at: { $gt: from_date, $lt: to_date } })
                    .populate('status')
                    .populate({
                        path: 'employee',
                        match: { 'deleted_at': null },
                        populate: { path: 'department' }
                    })
                    .where("deleted_at").equals(null)
            )
            promises.push(
                employee_vacations.find({ created_at: { $gt: from_date, $lt: to_date } })
                    .populate('status')
                    .populate({
                        path: 'employee',
                        match: { 'deleted_at': null },
                        populate: { path: 'department' }
                    })
                    .where("deleted_at").equals(null)
            )
            promises.push(
                raises.find({ created_at: { $gt: from_date, $lt: to_date } })
                    .populate('status')
                    .populate({
                        path: 'employee',
                        match: { 'deleted_at': null },
                        populate: { path: 'department' }
                    })
                    .where("deleted_at").equals(null)
            )
            promises.push(
                rewards.find({ created_at: { $gt: from_date, $lt: to_date } })
                    .populate('status')
                    .populate({
                        path: 'employee',
                        match: { 'deleted_at': null },
                        populate: { path: 'department' }
                    })
                    .where("deleted_at").equals(null)
            )
            let all_deductions = []
            let all_raises = []
            let all_rewards = []
            let all_leaves = []
            let all_vacations = []

            if (employee == 0) {
                if (department == 0) {
                    Promise.all(promises).then(result => {
                        resolve({
                            deductions: result[0],
                            leaves: result[1],
                            vacations: result[2],
                            raises: result[3],
                            rewards: result[4]
                        })
                    }, err => {
                        reject(err)
                    })
                }
                else {
                    Promise.all(promises).then(result => {
                        let deductions = result[0]
                        let leaves = result[1]
                        let vacations = result[2]
                        let raises = result[3]
                        let rewards = result[4]
                        deductions.map((item) => {
                            if (department == item.department._id)
                                all_deductions.push(item)
                        })
                        leaves.map((item) => {
                            if (department == item.department._id)
                                all_leaves.push(item)
                        })
                        vacations.map((item) => {
                            if (department == item.department._id)
                                all_vacations.push(item)
                        })
                        raises.map((item) => {
                            if (department == item.department._id)
                                all_raises.push(item)
                        })
                        rewards.map((item) => {
                            if (department == item.department._id)
                                all_rewards.push(item)
                        })
                        resolve({
                            deductions: all_deductions,
                            leaves: all_leaves,
                            vacations: all_vacations,
                            raises: all_raises,
                            rewards: all_rewards
                        })
                    }, err => {
                        reject(err)
                    })
                }
            } else {
                if (department == 0) {
                    Promise.all(promises).then(result => {
                        let deductions = result[0]
                        let leaves = result[1]
                        let vacations = result[2]
                        let raises = result[3]
                        let rewards = result[4]
                        deductions.map((item) => {
                            if (employee == item.employee._id)
                                all_deductions.push(item)
                        })
                        leaves.map((item) => {
                            if (employee == item.employee._id)
                                all_leaves.push(item)
                        })
                        vacations.map((item) => {
                            if (employee == item.employee._id)
                                all_vacations.push(item)
                        })
                        raises.map((item) => {
                            if (employee == item.employee._id)
                                all_raises.push(item)
                        })
                        rewards.map((item) => {
                            if (employee == item.employee._id)
                                all_rewards.push(item)
                        })
                        resolve({
                            deductions: all_deductions,
                            leaves: all_leaves,
                            vacations: all_vacations,
                            raises: all_raises,
                            rewards: all_rewards
                        })
                    }, err => {
                        reject(err)
                    })
                } else {

                    Promise.all(promises).then(result => {
                        let deductions = result[0]
                        let leaves = result[1]
                        let vacations = result[2]
                        let raises = result[3]
                        let rewards = result[4]
                        deductions.map((item) => {
                            if (department == item.department._id && employee == item.employee._id)
                                all_deductions.push(item)
                        })
                        leaves.map((item) => {
                            if (department == item.department._id && employee == item.employee._id)
                                all_leaves.push(item)
                        })
                        vacations.map((item) => {
                            if (department == item.department._id && employee == item.employee._id)
                                all_vacations.push(item)
                        })
                        raises.map((item) => {
                            if (department == item.department._id && employee == item.employee._id)
                                all_raises.push(item)
                        })
                        rewards.map((item) => {
                            if (department == item.department._id && employee == item.employee._id)
                                all_rewards.push(item)
                        })
                        resolve({
                            deductions: all_deductions,
                            leaves: all_leaves,
                            vacations: all_vacations,
                            raises: all_raises,
                            rewards: all_rewards
                        })
                    }, err => {
                        reject(err)
                    })
                }
            }
        })
    }
}