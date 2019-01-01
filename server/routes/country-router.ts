import { Router, Request, Response } from "express";
import { CountryController } from '../controllers/country-controller';
export class CountryRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
    }

    private getAll(req: Request, res: Response) {
        new CountryController().getAll().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private create(req: Request, res: Response) {
        new CountryController().create(req.body).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

}