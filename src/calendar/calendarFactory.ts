import {Calendar, DateInterval, Era} from "./calendar"
import {dayjs} from "./dayjs";


export class CalendarFactory {
    getCalendar(type: string = 'base'): Calendar {
        switch (type) {
            case 'base':
                let startDate = dayjs().add(1, 'year').subtract(120, 'year').startOf('year')
                let endDate = startDate.add(239, 'year').endOf('year')
                let dateInterval = new DateInterval(startDate, endDate)
                let dateNode = new Era(dateInterval)
                return new Calendar(dateNode)
            default:
                throw 'Calendar type is not found'
        }
    }
}
