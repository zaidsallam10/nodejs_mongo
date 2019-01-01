var api_key = 'key-8946a5dfaf2b8043a7db9ea81da7f90c';
var domain = 'walleterp.com';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
let ejs = require('ejs');
var fs = require('fs');
var path = require("path");
var fp = path.join(__dirname, 'views/email_verification.ejs');

export class EmailController {



    constructor() {

    }






    sendEmail(name, to_email) {
        return new Promise((resolve, reject) => {
            let user = { name: name, email_address: to_email }
            ejs.renderFile('server/views/email_verification.ejs', user, function (err, str) {
                var data = {
                    from: 'z.sallam@3oun.com',
                    to: to_email,
                    subject: 'this is verification email from H2ohr',
                    text: 'this is verification email from H2ohr',
                    html: str + ''
                };
                mailgun.messages().send(data, function (error, body) {
                    if (err)
                        reject(err)
                    else
                        resolve(body)
                });
            });
        })
    }


    myHtmlText() {
        return ""
    }

}