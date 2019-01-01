import { Router, Request, Response } from "express";
import { companies } from "../models/companies";
import { CompanyController } from '../controllers/company-controller';
import { AmazonController } from '../controllers/amazon-controller';
export class AmazonRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.post("/create_file", this.uploadFile)
        this.router.post("/create_bucket", this.uploadFile)
        this.router.post("/", this.uploadFile)


    }
    private uploadFile(req: Request, res: Response) {
        // var file = req.files;

        console.log(req.files)
        // new AmazonController().uploadFile().then(result => {
        //     return res.send(result);
        // }, error => {
        //     return res.status(400).send({ message: error.toString() });
        // })
    }

    private create_bucket(req: Request, res: Response) {
        new AmazonController().createBucket().then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

}