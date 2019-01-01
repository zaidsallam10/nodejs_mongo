import { work_permits } from "../models/work_permits";
import { CRUDController } from './crud-controller';
import { MomentController } from './moment-controller';
var validator = require("email-validator");

export class ValidationController {

    checkEmail(email) {
        return validator.validate(email);
    }

}