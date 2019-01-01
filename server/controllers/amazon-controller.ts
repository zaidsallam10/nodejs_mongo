import { deductions } from "../models/deductions";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var fs = require('fs');
var moment = require('moment');
var S3FS = require('s3fs');
var accessKeyId = '';
var rootBucket = '';
var secretAccessKey = '';
var s3fsImplRoot = new S3FS(rootBucket, {
    accessKeyId: accessKeyId,
    signatureVersion: 'v4',
    secretAccessKey: secretAccessKey,
    ACL: 'public-read'
});
export class AmazonController {

    constructor() {
    }

    createXlsxFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file.path, function (err, data) {
                s3fsImplRoot.writeFile(file.filename + ".xlsx", data, function (err, result) {
                    fs.unlink(file.path);
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve({ path: "https://s3.eu-central-1.amazonaws.com/" + rootBucket + "/" + file.filename + ".xlsx" });
                    }
                });
            });
        })
    }

    upload(file, path) {
        return new Promise((resolve, reject) => {
            fs.readFile(file.path, function (err, data) {
                s3fsImplRoot.writeFile(file.filename + path, data, function (err, result) {
                    fs.unlink(file.path);
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve({ path: "https://s3.eu-central-1.amazonaws.com/" + rootBucket + "/" + file.filename + path });
                    }
                });
            });
        })
    }
}







