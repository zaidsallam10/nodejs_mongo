import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";
var tunnel = require('tunnel-ssh');
var fs = require("fs");
// var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');
const openSshTunnel = require('open-ssh-tunnel');

(mongoose as any).Promise = global.Promise;

if (process.env.NODE_ENV === "testing") {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion("3.4.3");
  mockgoose.prepareStorage().then((): void => {
    mongoose.connect("mongodb://example.com:23400/TestingDB", {
      useMongoClient: true,
    });
  });
}
else {
  mongoose.connect("mongodb://35.176.33.235:27017/CloudHR", {
    useMongoClient: true,
    pass: 'hr',
    user: 'hr'
  });
}
export { mongoose };
