import { Router, Request, Response } from "express";
import { companies } from "../models/companies";
import { CompanyController } from '../controllers/company-controller';
import { ConfigController } from '../controllers/config-controller';
import { AdminController } from '../controllers/admin-controller';
export class ConfigRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.get("/:id", this.getById)
    }

    private getAll(req: Request, res: Response) {
        new ConfigController().getAll().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private getById(req: Request, res: Response) {
        new ConfigController().getById(req.params.id).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }
}