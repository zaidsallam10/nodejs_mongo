import { Router, Request, Response } from "express";
import { TestingController } from '../controllers/testing-controller';

export class TestingRouter {

    router: Router;


    constructor() {

        this.router = Router();
        this.router.get("/test_callback", this.testCallback)
        this.router.get("/test_promise", this.test_promise)
        this.router.get("/test_aysnc", this.test_aysnc)
        
    }


    private testCallback(req: Request, res: Response) {
        new TestingController().getByCallback()
        return res.status(200).send({ message: "succeess" });

    }

    private test_promise(req: Request, res: Response) {
        new TestingController().getByPromise()
        return res.status(200).send({ message: "succeess" });

    }
    private test_aysnc(req: Request, res: Response) {
        new TestingController().getByAsync()
        return res.status(200).send({ message: "succeess" });
    }


}