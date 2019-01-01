import { Router, Request, Response } from "express";
import { companies } from "../models/companies";
import { CompanyController } from '../controllers/company-controller';
import { AdminController } from '../controllers/admin-controller';
import { EmailController } from '../controllers/email-controller';
export class AdminRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/licenses", this.getAllLicenses)
        this.router.get("/subscriptions", this.getAllSubscriptions)
        this.router.get("/employees", this.getAllEmployees)
        this.router.get("/user_types", this.getAllUserTypes)
        this.router.get("/work_permits", this.getAllWorkPermits)
        this.router.post("/send_email", this.sendEmail)



        // this.router.post("/", this.create)
        // this.router.get("/:id", this.getById)
        // this.router.put("/", this.update)
        // this.router.delete("/:id", this.delete)
        // this.router.get("/:id/subscriptions", this.getCompnaySubscriptions)

    }
    private getAllLicenses(req: Request, res: Response) {
        new AdminController().getAllLicenses().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }
    private getAllSubscriptions(req: Request, res: Response) {
        new AdminController().getAllSubscriptions().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private getAllEmployees(req: Request, res: Response) {
        new AdminController().getAllEmployees().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private getAllUserTypes(req: Request, res: Response) {
        new AdminController().getAllUserTypes().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }
    private getAllWorkPermits(req: Request, res: Response) {
        new AdminController().getAllWorkPermits().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }
    private sendEmail(req: Request, res: Response) {
        new EmailController().sendEmail();
    }
    // 
}