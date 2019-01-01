import { Router, Request, Response } from "express";
import { companies } from "../models/companies";
import { CompanyController } from '../controllers/company-controller';
import { DagreeController } from '../controllers/dagree-controller';
import { AdminController } from '../controllers/admin-controller';
export class DagreeRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
    }

    private getAll(req: Request, res: Response) {
        new DagreeController().getAll().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private create(req: Request, res: Response) {
        new DagreeController().create(req.body).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

}