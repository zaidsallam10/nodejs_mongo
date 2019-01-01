import { Router, Request, Response } from "express";
import { subscriptions } from "../models/subscriptions";
import { StatusController } from '../controllers/status-controller';

export class StatusRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
    }


    private getAll(req: Request, res: Response) {
        new StatusController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new StatusController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

}