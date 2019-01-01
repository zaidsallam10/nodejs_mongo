import { Router, Request, Response } from "express";
import { licenses } from "../models/licenses";
import { PayrollController } from '../controllers/payroll-controller';

export class PayrollRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.post("/employees/:employee/relay", this.relayPayrolls) // ترحيل كل بيانات الموظف لشهر معين
    }


    private relayPayrolls(req: Request, res: Response) {
        // by_employee
        // from_date
        // to_date

        new PayrollController().realyPayroll(req.params.employee, req.body).then((result) => {
            return res.send(result);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

}