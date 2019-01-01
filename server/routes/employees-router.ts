import { Router, Request, Response } from "express";
import { employees } from "../models/employees";

import { EmployeeController } from '../controllers/employee-controller';
import { DeductionController } from '../controllers/deduction-controller';
import { RaisesController } from '../controllers/raises-controller';
import { RewardController } from '../controllers/reward-controller';
import { EmployeeLeavesController } from '../controllers/employee-leaves-controller';
import { PayrollController } from '../controllers/payroll-controller';


export class EmployeesRouter {

    router: Router;


    constructor() {
        this.router = Router();

        this.router.post("/:id/deductions", this.createDeduction)
        this.router.post("/:id/vacations", this.createVacation)
        this.router.post("/:id/raises", this.createRaises)
        this.router.post("/:id/rewards", this.createRewards)
        this.router.post("/:id/leaves", this.createLeaves)


        this.router.get("/", this.getAll)
        this.router.get("/initilize", this.getAllInitilizes)
        this.router.get("/me", this.getAllME)
        this.router.post("/", this.create)
        this.router.get("/:id", this.getById)
        this.router.put("/", this.update)
        this.router.delete("/:id", this.delete)
        this.router.get("/:id/vacations", this.getVacations)
        this.router.get("/:id/payrolls", this.getEmployeePayrolls)
        this.router.get("/:id/leaves", this.getLeaves)


        this.router.get("/:id/rewards", this.getRewards)
        this.router.get("/:id/reports", this.getReports)
        this.router.get("/:id/raises", this.getRaises)
        this.router.get("/:id/work_permits", this.getWorkPermits)
        this.router.get("/:id/deductions", this.getDudctions)
        this.router.get("/:id/finger_print", this.getFingerPrintDate)
        this.router.get("/:id/details", this.getAllDetails)
        this.router.put("/:id/reset_password", this.resetPassword)



    }


    private getAll(req: Request, res: Response) {
        new EmployeeController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getAllME(req: Request, res: Response) {
        new EmployeeController().getAllME().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new EmployeeController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new EmployeeController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        new EmployeeController().update(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new EmployeeController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private createVacation(req: Request, res: Response) {
        req.body.employee = req.params.id;
        new EmployeeController().createVacation(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getVacations(req: Request, res: Response) {
        new EmployeeController().getVacations(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }




    private getRewards(req: Request, res: Response) {
        new EmployeeController().getRewards(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getLeaves(req: Request, res: Response) {
        new EmployeeController().getLeaves(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }



    private getReports(req: Request, res: Response) {
        new EmployeeController().getReports(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }




    private getRaises(req: Request, res: Response) {
        new EmployeeController().getRaises(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getWorkPermits(req: Request, res: Response) {
        new EmployeeController().getWorkPermits(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getDudctions(req: Request, res: Response) {
        new EmployeeController().getDudctions(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private getFingerPrintDate(req: Request, res: Response) {
        new EmployeeController().getFingerPrintDate(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getAllDetails(req: Request, res: Response) {
        new EmployeeController().getAllDetails(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private createDeduction(req: Request, res: Response) {
        req.body.employee = req.params.id;
        new DeductionController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private createRaises(req: Request, res: Response) {
        req.body.employee = req.params.id;
        new RaisesController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private createRewards(req: Request, res: Response) {
        req.body.employee = req.params.id;
        new RewardController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private createLeaves(req: Request, res: Response) {
        req.body.employee = req.params.id;
        new EmployeeLeavesController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getEmployeePayrolls(req: Request, res: Response) {
        new PayrollController().getByEmployeeId(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getAllInitilizes(req: Request, res: Response) {
        new EmployeeController().getAllInitilizes().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private resetPassword(req: Request, res: Response) {
        new EmployeeController().resetPassword(req.params.id, req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

  


}