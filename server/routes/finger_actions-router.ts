import { Router, Request, Response } from "express";
import { licenses } from "../models/licenses";
import { FingerActionsController } from '../controllers/finger-actions-controller';



export class FingerActionRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
    }


    private create(req: Request, res: Response) {
        new FingerActionsController().create(req.body).then((result) => {
            res.json(result)
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getAll(req: Request, res: Response) {
        new FingerActionsController().getAll().then((result) => {
            res.json(result)
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


}