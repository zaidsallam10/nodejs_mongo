import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import { EmployeesRouter } from "./routes/employees-router";
import { UsersRouter } from "./routes/users-router";
import { CompaniesRouter } from "./routes/companies-router";
import { LicensesRouter } from './routes/licenses-router';
import { UserTypesRouter } from './routes/user-types-router';
import { SubscriptionsRouter } from './routes/subscriptions-router';
import { VacationsRouter } from './routes/vacations-router';
import { ReportReasonRouter } from './routes/report-reasons-router';
import { ReportRouter } from './routes/report-router';
import { RewardRouter } from './routes/rewards-router';
import { RaisesRouter } from './routes/raises-router';
import { DeductionsRouter } from './routes/deductions-router';
import { EmployeeLeavesRouter } from './routes/employee-leaves-router';
import { WorkPermitsRouter } from './routes/work-permits-router';
import { RegistrationRouter } from './routes/registration-routes';
import { AdminRouter } from './routes/admin-router';
import { FilesRouter } from './routes/file-router';
import { AmazonRouter } from './routes/amazon-router';
import { ConfigRouter } from './routes/config-router';
import { StatusRouter } from './routes/status-router';
import { PositionRouter } from './routes/position-router';
import { DepartmentRouter } from './routes/department-router';
import { FileController } from './controllers/file-controller';
import { AmazonController } from './controllers/amazon-controller';
import { DagreeRouter } from './routes/dagree-router';
import { CountryRouter } from './routes/country-router';
import { PayrollRouter } from './routes/payrolls-router';
import { RoleRouter } from './routes/role-router';
import { UserController } from './controllers/user-controller';
import { CurrenceyRouter } from './routes/currencey-router';
import { H2oRouter } from './routes/h2o-router';
import { FingerActionRouter } from './routes/finger_actions-router';



var jwt = require('jsonwebtoken');
import { APIDocsRouter } from "./routes/swagger";
import { TestingRouter } from "./routes/testing-router";
var path = require('path')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express();
var FormData = require('form-data');
var API_KEY = "##H2oApi**";

// var multiparty = require('connect-multiparty'),
// multipartyMiddleware = multiparty();
// app.use(multipartyMiddleware);
// var file = req.files;


app.use(json());
app.use(urlencoded({
  extended: true
}));

app.get("/", (request: express.Request, response: express.Response) => {
  response.json({
    name: "Express application"
  })
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,authorization Access-Control-Allow-Credentials , token , api_key');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.status(err.status || 500);
  response.json({
    error: "Server error"
  })
});


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', ' Token , token , Api-Key , api_key , Origin, X-Requested-With, Content-Type, Accept, Authorization,authorization Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  // Pass to next layer of middleware

  next();
  // if (req.url != "/api/users/login" && req.url != "/api/registration/login/employee") {
  //   if (req.headers.Token && req.headers['Api-Key']) {
  //     jwt.verify(req.headers.Token, 'h2o', function (err, decoded) {
  //       if (err) {
  //         res.status(401).json({ message: "You have a problem in the token" });
  //       } else {
  //         if (req.headers['Api-Key'] != API_KEY)
  //           res.status(401).json({ message: "Please send a valid API_KEY" });
  //         jwt.verify(req.headers.Token, 'h2o', function (err, user) {
  //           let user1 = { last_sign_in: new Date() }
  //           console.log(user.Token._id)
  //           new UserController().update(user1, user.Token._id);
  //         });
  //         next();
  //       }
  //     });
  //   } else {
  //     res.status(401).json({ message: "Please Send Your Token Or The API KEY" });
  //   }
  // } else {
  //   next();
  // }
});



app.use("/api/employees", new EmployeesRouter().router);
app.use("/api/users", new UsersRouter().router);
app.use("/api/companies", new CompaniesRouter().router);
app.use("/api/licenses", new LicensesRouter().router);
app.use("/api/subscriptions", new SubscriptionsRouter().router);
app.use("/api/user_types", new UserTypesRouter().router);
app.use("/api/vacations", new VacationsRouter().router);
app.use("/api/report_reasons", new ReportReasonRouter().router);
app.use("/api/reports", new ReportRouter().router);
app.use("/api/rewards", new RewardRouter().router);
app.use("/api/raises", new RaisesRouter().router);
app.use("/api/deductions", new DeductionsRouter().router);
app.use("/api/leaves", new EmployeeLeavesRouter().router);
app.use("/api/work_permits", new WorkPermitsRouter().router);
app.use("/api/registration", new RegistrationRouter().router);
app.use("/api/admin", new AdminRouter().router);
app.use("/api/configs", new ConfigRouter().router);
app.use("/api/amazon", new AmazonRouter().router);
app.use("/api/departments", new DepartmentRouter().router);
app.use("/api/statuses", new StatusRouter().router);
app.use("/api/positions", new PositionRouter().router);
app.use("/api/dagrees", new DagreeRouter().router);
app.use("/api/countries", new CountryRouter().router);
app.use("/api/payrolls", new PayrollRouter().router);
app.use("/api/user_roles", new RoleRouter().router);
app.use("/api/currencies", new CurrenceyRouter().router);
app.use("/api/h2o", new H2oRouter().router);
app.use("/api/finger_actions", new FingerActionRouter().router);
app.use("/api/testing", new TestingRouter().router);


app.use("/api/swagger", new APIDocsRouter().getRouter());
app.use("/docs", express.static(path.join(__dirname, './assets/swagger')));




app.post('/api/upload_file', upload.single('file'), function (req: any, res, next) {
  new AmazonController().upload(req.file, path.extname(req.file.originalname)).then(result => {
    res.json(result)
  }, err => {
    res.json('error= ' + err)
  })
})





app.post('/api/upload', upload.single('file'), function (req: any, res, next) {
  if (path.extname(req.file.originalname) == '.csv') {
    new FileController().readLocalCsv(req.file, req.body).then(result => {
      res.json(result)
    }, err => {
      res.json('error= ' + err)
    })
  }
  else if (path.extname(req.file.originalname) == '.xlsx') {
    req.is('urlencoded')
    new FileController().readLocalXls(req.file, req.body).then(result => {
      res.json(result)
    }, err => {
      res.json('error= ' + err)
    })
  }
})






const server: http.Server = app.listen(process.env.PORT || 4200);
export { server };
