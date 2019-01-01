import { Router, Request, Response } from "express";
import { RewardController } from '../controllers/reward-controller';

export class RewardRouter {

    router: Router;


    constructor() {
        this.router = Router();
        this.router.get("/", this.getAll)
        this.router.get("/:from_date/:to_date", this.getAllBYDate) // new
        this.router.post("/", this.create)
        this.router.get("/:id", this.getById)
        this.router.put("/:id", this.update)
        this.router.delete("/:id", this.delete)

        this.router.put("/:id/pending", this.updatePending)
        this.router.put("/:id/in_progress", this.updateProgress)
        this.router.put("/:id/rejected", this.updateCancelled)
        this.router.put("/:id/approved", this.updateCompleted)
        this.router.put("/:id/payrolled", this.updatePayrolled)

    }


    private getAll(req: Request, res: Response) {
        new RewardController().getAll().then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private create(req: Request, res: Response) {
        new RewardController().create(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private getById(req: Request, res: Response) {
        new RewardController().getById(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private update(req: Request, res: Response) {
        req.body._id = req.params.id;
        new RewardController().update(req.body).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }

    private delete(req: Request, res: Response) {
        new RewardController().delete(req.params.id).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }


    private getAllBYDate(req: Request, res: Response) {
        new RewardController().getAllBYDate(req.params.from_date, req.params.to_date).then((requests) => {
            return res.send(requests);
        }).catch((error: Error) => {
            return res.status(400).send({ message: error.toString() });
        });
    }



    ////////////////////////////////////////////////////////////////////////
// here to update statuses

private updatePending(req: Request, res: Response) {
    console.log(req.params.id)
    console.log(req.body)
    new RewardController().updateStatus(req.params.id, req.body, 1).then((requests) => {
        return res.send(requests);
    }).catch((error: Error) => {
        return res.status(400).send({ message: error.toString() });
    });
}
private updateProgress(req: Request, res: Response) {
    new RewardController().updateStatus(req.params.id, req.body, 2).then((requests) => {
        return res.send(requests);
    }).catch((error: Error) => {
        return res.status(400).send({ message: error.toString() });
    });
}

private updateCompleted(req: Request, res: Response) {
    new RewardController().updateStatus(req.params.id, req.body, 3).then((requests) => {
        return res.send(requests);
    }).catch((error: Error) => {
        return res.status(400).send({ message: error.toString() });
    });
}
private updateCancelled(req: Request, res: Response) {
    new RewardController().updateStatus(req.params.id, req.body, 4).then((requests) => {
        return res.send(requests);
    }).catch((error: Error) => {
        return res.status(400).send({ message: error.toString() });
    });
}


private updatePayrolled(req: Request, res: Response) {
    new RewardController().updateStatus(req.params.id, req.body, 5).then((requests) => {
        return res.send(requests);
    }).catch((error: Error) => {
        return res.status(400).send({ message: error.toString() });
    });
}


}