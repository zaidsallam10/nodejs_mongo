import { Router, Request, Response } from "express";
import { users } from "../models/users";
import { UserController } from '../controllers/user-controller';

export class UsersRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
        this.router.get("/:id", this.getById)
        this.router.put("/:id", this.update)
        this.router.delete("/:id", this.delete)
        this.router.put("/:id/reset_password", this.resetPassword)
        this.router.post("/login", this.login)

    }


    private getAll(req: Request, res: Response) {
        new UserController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new UserController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new UserController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        new UserController().update(req.body, req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new UserController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private resetPassword(req: Request, res: Response) {
        new UserController().resetPassword(req.params.id, req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private login(req: Request, res: Response) {
        new UserController().login(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
}