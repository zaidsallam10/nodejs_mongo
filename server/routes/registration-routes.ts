import { Router, Request, Response } from "express";
import { RegistrationController } from '../controllers/registration-controller';

export class RegistrationRouter {

    router: Router;

    constructor() {
        this.router = Router();
        // this.router.get("/", this.getAll)
        this.router.post("/login/employee", this.loginEmployee)
        this.router.post("/verify", this.verify);
        this.router.post("/signup/company", this.createCompany);

        // this.router.get("/:id", this.getById)
        // this.router.put("/", this.update)
        // this.router.delete("/:id", this.delete)
    }

    private loginEmployee(req: Request, res: Response) {
        new RegistrationController().login(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private verify(req: Request, res: Response) {
        new RegistrationController().verify(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private createCompany(req: Request, res: Response) {
        new RegistrationController().createCompany(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    

}