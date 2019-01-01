import { payrolls } from "../models/payrolls";
import { raises } from "../models/raises";
import { rewards } from "../models/rewards";
import { employees } from "../models/employees";
const formatNum = require('format-num')

export class NumericalController {

    formatTwoFractions(num: number): any {
        return formatNum(num, { minFraction: 2, maxFraction: 2 })
    }

}