import { Router, Request, Response } from "express";
import { CurrenceyController } from '../controllers/currencey-controller';
export class CurrenceyRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.get("/:id", this.getById)
        this.router.post("/", this.create)
    }

    private getAll(req: Request, res: Response) {
        new CurrenceyController().getAll().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private getById(req: Request, res: Response) {
        new CurrenceyController().getById(req.params.id).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private create(req: Request, res: Response) {
        new CurrenceyController().create(req.body).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }
}