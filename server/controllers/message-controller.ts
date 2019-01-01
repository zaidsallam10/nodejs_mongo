import { licenses } from "../models/licenses";

export class MessageController {

    getActionFingerPrintMessage(action: number) {
        switch (action) {
            case 2: return "غياب"
            case 3: return " وقت اضافي مبكر"
            case 4: return " وقت اضافي متأخر"
            case 5: return " خروج مبكر"
            case 6: return "تأخير ساعة واحدة";
            case 7: return "تأخير ساعتين";
            default: return "nothing";
        }
    }


}