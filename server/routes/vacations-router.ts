import { Router, Request, Response } from "express";
import { VacationController } from '../controllers/vacation-controller';

export class VacationsRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/reasons", this.createVacationReasons)
        this.router.get("/reasons", this.getVacationReasons)
        this.router.get("/:id", this.getById)
        this.router.put("/:id", this.update)
        this.router.delete("/:id", this.delete)

        this.router.put("/:id/pending", this.updatePending)
        this.router.put("/:id/in_progress", this.updateProgress)
        this.router.put("/:id/rejected", this.updateCancelled)
        this.router.put("/:id/approved", this.updateCompleted)
        this.router.put("/:id/payrolled", this.updatePayrolled)


    }


    private createVacationReasons(req: Request, res: Response) {
        new VacationController().createVacationReasons(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private getAll(req: Request, res: Response) {
        new VacationController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private getVacationReasons(req: Request, res: Response) {
        new VacationController().getVacationReasons().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        req.body._id = req.params.id
        new VacationController().update(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private delete(req: Request, res: Response) {
        new VacationController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new VacationController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }





    //////////////////////////////////////////////////////////////////////
    // here to update statuses

    private updatePending(req: Request, res: Response) {
        new VacationController().updateStatus(req.params.id, req.body, 1).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private updateProgress(req: Request, res: Response) {
        new VacationController().updateStatus(req.params.id, req.body, 2).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private updateCompleted(req: Request, res: Response) {
        new VacationController().updateStatus(req.params.id, req.body, 3).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private updateCancelled(req: Request, res: Response) {
        new VacationController().updateStatus(req.params.id, req.body, 4).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private updatePayrolled(req: Request, res: Response) {
        new VacationController().updateStatus(req.params.id, req.body, 5).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

}