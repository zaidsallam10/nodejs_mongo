import { licenses } from "../models/licenses";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var fs = require('fs');
const csv = require('csvtojson');
const request = require('request')
var excelParser = require('excel-parser');
import parseXlsx from 'excel';
import * as moment from 'moment';
var fs = require('fs');
var _ = require('underscore');
var CsvReadableStream = require('csv-reader');
var AutoDetectDecoderStream = require('autodetect-decoder-stream');
var iconv = require('iconv-lite');
import { ExcelReader, ExcelWriter } from 'node-excel-stream';
var sheetToJson = require('csv-xlsx-to-json');
var node_xj = require("xls-to-json");
import { company_files } from "../models/company_files";
import { EmployeeController } from '../controllers/employee-controller';
import { CompanyController } from '../controllers/company-controller';
import { ConfigController } from '../controllers/config-controller';
import { EmployeeHistory } from '../interfaces/employee-history-interface';
import { CompanyFile } from '../interfaces/company-file-interface';
var mongoose = require('mongoose');
var async = require('async');
import { MessageController } from './message-controller'
import { company_configs } from '../models/company_configs'

export class FileController {


    read() {
        return new Promise((resolve, reject) => {
            csv()
                .fromStream(request.get('https://people.sc.fsu.edu/~jburkardt/data/csv/lead_shot.csv'))
                .on('csv', (csvRow) => {
                    let arr: any = [];
                    for (let i = 0; i < csvRow.length; i++) {
                        arr.push(csvRow[i]);
                    }
                    resolve(arr);
                })
                .on('done', (error) => {
                    reject(error)
                })
        })
    }

    // this we want
    readLocalCsv(csvFilePath, companyID) {
        let rows: any = [];
        let self = this;
        return new Promise((resolve, reject) => {
            sheetToJson.process(csvFilePath.originalname, function (err, result) {
                if (err) {
                    reject(err)
                }
                // resolve(result)
            })
        })
    }



    readLocalXls(csvFilePath, body) {
        let self = this;
        return new Promise((resolve, reject) => {
            node_xj({
                input: csvFilePath.originalname,  // input xls
                output: null, // output json
                sheet: null  // specific sheetname
            }, function (err, result) {
                if (err) {
                    reject(err);
                } else {

                    result.map(item => {

                        item.operation = item.Operation;
                        item.employee_id = parseInt(item['AC-No.']);
                        item.employee_name = item['Name'];
                        item.time = item['Time'];
                        item.status = item['State'];

                        delete item.Operation;
                        delete item['AC-No.'];
                        delete item['Name'];
                        delete item['Time'];
                        delete item['State'];
                        delete item['Exception'];
                        delete item['New State'];

                    });
                    resolve(self.fileProcessing(result, body.company));
                }
            });
        })
    }


    fileProcessing(myArray, company_id) {
        return new Promise((resolve, reject) => {
            let company = new CompanyController;
            let EmployeeObject = new EmployeeController();
            let companyID = mongoose.Types.ObjectId(company_id)
            company_configs.findOne()
                .where("company").equals(companyID)
                .then((config: any) => {
                    if (!config) {
                        reject("there's no config to this company")
                    }
                    let employees: any = [];
                    myArray.map((record, index) => {
                        let employeeId = record.employee_id;
                        let exist = _.find(employees, function (item) {
                            return item.employee_id == employeeId;
                        });
                        if (!exist) {

                            let actions = [];
                            myArray.map((item1, index) => {
                                let employeeId = item1.employee_id;
                                if (record.employee_id == employeeId) {
                                    actions.push(item1);
                                }
                            });
                            employees.push({
                                company: companyID,
                                employee_id: record.employee_id,
                                employee_name: record.employee_name,
                                actions: actions,
                            });
                        }
                    });

                    employees.map((employee) => {
                        employee.records = [];
                        let records = [];
                        employee.actions.map((action) => {
                            let exist = _.find(records, function (record) {
                                return moment(action.time).format("YYYY-MM-DD") == record.day
                            });
                            if (!exist) {
                                let transactions = [];
                                employee.actions.map((action1) => {
                                    if (moment(action1.time).format("YYYY-MM-DD") == moment(action.time).format("YYYY-MM-DD")) {
                                        action.action = this.takeAction(action, config).msg ? this.takeAction(action, config).msg : "nothing";
                                        action.action_id = this.takeAction(action, config).action_id
                                        delete action.operation;
                                        delete action['No.'];
                                        console.log(action)
                                        transactions.push(action);
                                    }
                                });
                                records.push({
                                    day: moment(action.time).format("YYYY-MM-DD"),
                                    transactions: transactions
                                })
                            }
                        });
                        employee.records = records;
                        delete employee.actions;
                    });
                    employees.map((employee) => {
                        EmployeeObject.getByEmployeeId(employee.employee_id).then((res: any) => {
                            employee.employee = res._id
                        }, err => {
                            reject(err);
                        });
                    })


                    let fileFingerData = [];
                    if (employees) {
                        employees.map((employee, index) => {
                            employee.records.map((record) => {
                                fileFingerData.push({
                                    company: employee.company,
                                    employee_id: employee.employee_id,
                                    employee_name: employee.employee_name,
                                    day: record.day,
                                    transactions: record.transactions,
                                    created_at: new Date()
                                })
                            })
                        })
                        company.createFile(fileFingerData)
                            .then(data => {
                                resolve(employees)
                            }, err => {
                                reject(err)
                            })
                    }
                });
        })
    }

    //send config one time

    takeAction(record, config) {
        let moment = new MomentController();
        let message = new MessageController();
        let date_time_finger = moment.formatDateTime(record.time);
        let current_date_time_company_start_working = moment.formatDateTime(moment.formatDate(record.time) + '' + config.start_working_hour);
        let current_date_time_company_end_working = moment.formatDateTime(moment.formatDate(record.time) + '' + config.end_working_hour);
        let first_our_delaying = config.start_delaying_first_hour
        let second_our_delaying = config.start_delaying_second_hour
        let third_our_delaying = config.start_delaying_third_hour
        console.log(record.status)
        console.log(record.time)
        console.log('start=' + config.start_working_hour)
        console.log('start=' + config.end_working_hour)
        console.log('my date = ' + date_time_finger)
        console.log('current_date_time_company_start_working = ' + current_date_time_company_start_working)
        console.log('current_date_time_company_end_working = ' + current_date_time_company_end_working)
        console.log('is before=' + date_time_finger.isBefore(current_date_time_company_start_working))

        if (record.status == "C/In") {
            //حالة اذا جاء مبكرا
            // console.log(date_time_finger.isAfter(current_date_time_company_start_working))
            if (date_time_finger.isBefore(current_date_time_company_start_working)) {
                return { msg: (message.getActionFingerPrintMessage(3)), action_id: 1 }
                // حالة اذا جاء متأخرا
            } else if (date_time_finger.isAfter(current_date_time_company_start_working)) {

                // حالة التأكد من التأخر بحالة ساعة واحدة
                if (moment.getDifferenceHours(current_date_time_company_start_working, date_time_finger) <= 1) {

                    // عدد دقائق التأخر خلال الساعة الاولى

                    if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > first_our_delaying) {
                        return { msg: (message.getActionFingerPrintMessage(6)), action_id: 2 }
                    }

                    // حالة التأكد من التأخر بحالة ساعتين


                } else if (moment.getDifferenceHours(current_date_time_company_start_working, date_time_finger) < 3) {

                    // عدد دقائق التأخر خلال الساعة الثانية
                    if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > first_our_delaying) {
                        if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > second_our_delaying)
                            return { msg: (message.getActionFingerPrintMessage(7)), action_id: 2 }
                        else
                            return { msg: (message.getActionFingerPrintMessage(6)), action_id: 2 }

                    }

                    // حالة التأكد من التأخر بحالة ثلاث ساعات
                } else if (moment.getDifferenceHours(current_date_time_company_start_working, date_time_finger) >= 3) {

                    if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > first_our_delaying)
                        if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > second_our_delaying)
                            if (moment.getDifferenceMinuites(current_date_time_company_start_working, date_time_finger) > third_our_delaying)
                                //اذا ثلاث ساعات اذا غياب
                                return { msg: (message.getActionFingerPrintMessage(2)), action_id: 4 }
                            else
                                // تأخير ساعتين
                                return { msg: (message.getActionFingerPrintMessage(7)), action_id: 2 }
                        else
                            // تأخير ساعة واحدة
                            return { msg: (message.getActionFingerPrintMessage(7)), action_id: 2 }
                    else
                        // تأخير ساعة واحدة
                        return { msg: (message.getActionFingerPrintMessage(2)), action_id: 2 }
                }
            }
            else {
                return { msg: ("nothing"), action_id: 0 }
            }
        }
        else if (record.status == "C/Out") {
            if (date_time_finger.isBefore(current_date_time_company_end_working)) {
                // return (message.getActionFingerPrintMessage(5))
                return { msg: (message.getActionFingerPrintMessage(5)), action_id: 0 }

            } else if (date_time_finger.isAfter(current_date_time_company_end_working)) {
                // return (message.getActionFingerPrintMessage(4))
                return { msg: (message.getActionFingerPrintMessage(4)), action_id: 0 }

            }
            else {
                return { msg: ("nothing"), action_id: 0 }
            }
        }
        else {
            return { msg: ("nothing"), action_id: 0 }
        }
    }
}