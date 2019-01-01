import * as moment from 'moment';

export class MomentController {

    getCurrentDate() {
        return moment();
    }

    plusDaysToCurrentDate(numberOfDays) {
        return moment(new Date(), "DD-MM-YYYY").add(numberOfDays, 'days');
    }

    formatTime(date) {
        return moment(date, "HH:mm a")
    }

    formatDate(date) {
        return moment(date, "MM/DD/YYYY").format("MM/DD/YYYY")
    }

    formatDate2(date) {
        return moment(date, "YYYY-MM-DD")
    }

    formatDateTime(date) {
        return moment(date, "MM/DD/YYYY hh:mm A")
    }
    getDifferenceHours(start_date, end_date) {
        return moment.duration(end_date.diff(start_date)).asHours()
    }
    getDifferenceMinuites(start_date, end_date) {
        return moment.duration(end_date.diff(start_date)).asMinutes()
    }

    // we have to check if month and day and year the same((( OR ))) diff=0
    checkTwoDate(first_date, second_date) {
        var a = moment('2016-06-06T21:03:55');//now
        var b = moment('2016-05-06T20:03:55');
        var start = moment(moment(first_date).format("YYYY-MM-DD HH:mm:ss"));
        var end = moment(moment(second_date).format("YYYY-MM-DD HH:mm:ss"));
        console.log('start=' + first_date)
        console.log('end=' + second_date)
        console.log('diff=' + start.diff(end, 'days'))
    }


}