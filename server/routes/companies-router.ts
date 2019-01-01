import { Router, Request, Response } from "express";
import { companies } from "../models/companies";
import { CompanyController } from '../controllers/company-controller';
import { DepartmentController } from '../controllers/department-controller';
import { PositionsController } from '../controllers/position-controller';
import { ConfigController } from '../controllers/config-controller';
import { UserController } from '../controllers/user-controller';

export class CompaniesRouter {

    router: Router;


    constructor() {
        this.router = Router();

        this.router.get("/", this.getAll)
        this.router.post("/", this.create)
        this.router.get("/:id", this.getById)
        this.router.get("/:id/employees", this.getAllCompanyEmployees)
        this.router.put("/:companyId", this.update)
        this.router.delete("/:id", this.delete)

        this.router.get("/:id/subscriptions", this.getCompnaySubscriptions)
        this.router.post("/:id/subscriptions", this.addCompanySubscription)

        this.router.get("/:id/files", this.getFile)
        this.router.get("/:id/departments", this.getAllDepartmentsByCompanyId)
        this.router.get("/:id/positions", this.getAllByPositionsCompanyId)
        this.router.get("/:id/finger_print/:from_date/:to_date", this.getFileByTwoDates)
        this.router.get("/:id/employees_finger/:year/:month", this.getFingerPrintFiltered)

        /// reoutes to the configs


        this.router.post("/:id/complete_registration", this.addBasicInfo)
        this.router.post("/:id/configs", this.createCompanyConfigs)
        this.router.get("/:id/configs", this.getCompanyConfigs)
        this.router.put("/:id/configs", this.editCompanyConfigs)

        this.router.get("/:id/details", this.getCompanyDetails)
        this.router.get("/:id/users", this.getCompanyUsers)

    }


    private getAll(req: Request, res: Response) {
        new CompanyController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new CompanyController().createCompany(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new CompanyController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        new CompanyController().update(req.body, req.params.companyId).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new CompanyController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getCompnaySubscriptions(req: Request, res: Response) {
        new CompanyController().getCompnaySubscriptions(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private addCompanySubscription(req: Request, res: Response) {
        new CompanyController().addCompanySubscription(req.params.id, req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }




    private getFile(req: Request, res: Response) {
        new CompanyController().getFile(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private getFileByTwoDates(req: Request, res: Response) {
        new CompanyController().getFileByTwoDates(req.params.id, req.params.from_date, req.params.to_date).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }
    private getFingerPrintFiltered(req: Request, res: Response) {
        new CompanyController().getFingerPrintFiltered(req.params.id, req.params.year, req.params.month).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getAllDepartmentsByCompanyId(req: Request, res: Response) {
        new DepartmentController().getAllByCompanyId(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getAllCompanyEmployees(req: Request, res: Response) {
        new CompanyController().getAllCompanyEmployees(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getAllByPositionsCompanyId(req: Request, res: Response) {
        new PositionsController().getAllByCompanyId(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }



    private getCompanyConfigs(req: Request, res: Response) {
        new CompanyController().getCompanyConfigs(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private createCompanyConfigs(req: Request, res: Response) {
        req.body.company = req.params.id;
        new CompanyController().createCompanyConfig(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private editCompanyConfigs(req: Request, res: Response) {
        new ConfigController().update(req.params.id).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }


    private getCompanyDetails(req: Request, res: Response) {
        new CompanyController().getCompanyDetails(req.params.id).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private getCompanyUsers(req: Request, res: Response) {
        new UserController().getAllByCompanyId(req.params.id).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }

    private addBasicInfo(req: Request, res: Response) {
        new CompanyController().addBasicInfo(req.params.id, req.body).then(result => {
            return res.send(result);
        }, error => {
            return res.status(400).send({ message: error.toString() });
        })
    }


}