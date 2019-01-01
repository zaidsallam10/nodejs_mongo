
var jwt = require('jsonwebtoken');

export class AuthController {

    constructor() {

    }

    generateToken(user) {
        return jwt.sign({ token: user }, 'h2o');
    }

}