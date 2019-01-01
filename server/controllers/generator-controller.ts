var crypto = require("crypto");


export class GenerateController {


    generatePassword() {
        return crypto.randomBytes(8).toString('hex');
    }


}