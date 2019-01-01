import { Router, Request, Response } from "express";
import { subscriptions } from "../models/subscriptions";
import { ReportController } from '../controllers/report-controller';

export class ReportRouter {

    router: Router;

    constructor() {

        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.get("/:from_date/:to_date/:employee/:department", this.exportAllData)
        this.router.post("/", this.create)
        this.router.get("/:id", this.getById)
        this.router.put("/", this.update)
        this.router.delete("/:id", this.delete)



    }


    private getAll(req: Request, res: Response) {
        new ReportController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new ReportController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new ReportController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        new ReportController().update(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new ReportController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private exportAllData(req: Request, res: Response) {
        new ReportController().exportAllData(req.params.from_date, req.params.to_date, req.params.employee, req.params.department).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
}