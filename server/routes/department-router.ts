import { Router, Request, Response } from "express";
import { DepartmentController } from '../controllers/department-controller';

export class DepartmentRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
        this.router.post("/bulk", this.createBulk)
        this.router.get("/:id", this.getById)
        this.router.put("/:id", this.update)
        this.router.delete("/:id", this.delete)
    }


    private getAll(req: Request, res: Response) {
        new DepartmentController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new DepartmentController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private createBulk(req: Request, res: Response) {
        new DepartmentController().createBulk(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getById(req: Request, res: Response) {
        new DepartmentController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        new DepartmentController().update(req.body,req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new DepartmentController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


}