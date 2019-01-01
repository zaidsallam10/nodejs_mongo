import { roles } from "../models/roles";

export class RoleController {

    getAll(): Promise<{}> {
        return new Promise((resolve, reject) => {
            roles.find({})
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }



    create(role): Promise<{}> {
        return new Promise((resolve, reject) => {
            roles.create(role)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }
}