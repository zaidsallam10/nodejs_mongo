var crypto = require("crypto");
import { VacationController } from '../controllers/vacation-controller'
import { RoleController } from '../controllers/role-controller'
import { CurrenceyController } from '../controllers/currencey-controller'
import { CountryController } from '../controllers/country-controller'
import { StatusController } from '../controllers/status-controller'
import { DagreeController } from '../controllers/dagree-controller'

export class H2oController {


    getAll() {
        return new VacationController().getVacationReasons().then(vac_reasons => {
            return new RoleController().getAll().then(roles => {
                return new CurrenceyController().getAll().then(currencies => {
                    return new CountryController().getAll().then(countries => {
                        return new StatusController().getAll().then(statuses => {
                            return new DagreeController().getAll().then(degrees => {
                                let data = {
                                    roles: roles,
                                    currencies: currencies,
                                    countries: countries,
                                    statuses: statuses,
                                    degrees: degrees
                                }
                                return data
                            })
                        })
                    })
                })
            })
        }).catch(err => {
            return { error: err }
        })
    }


}