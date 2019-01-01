import { Router, Request, Response } from "express";
import { licenses } from "../models/licenses";
import { FileController } from '../controllers/file-controller';
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('avatar');

export class FilesRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.post("/", this.read)
        this.router.post("/excel", this.readExcel)
    }


    private read(req: Request, res: Response) {
        new FileController().read().then((result) => {
            res.json(result)
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private readExcel(req: Request, res: Response) {
        console.log(JSON.stringify(upload.single('avatar')))
        new FileController().readExcel(req.body).then((result) => {
            res.json(result)
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


}