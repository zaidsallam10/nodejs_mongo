import { Router, Request, Response } from "express";
import { licenses } from "../models/licenses";
import { H2oController } from '../controllers/h2o-controller';

export class H2oRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/pre_set", this.getAll)
    }


    private getAll(req: Request, res: Response) {
        new H2oController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

}