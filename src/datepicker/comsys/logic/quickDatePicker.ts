import {dayjs} from "../../../calendar/dayjs"
import type {Grouping} from "./grouping"
import {DayGrouping, MonthGrouping, QuarterGrouping, WeekGrouping, YearGrouping} from "./grouping"


export abstract class QuickDatePicker {
    title: string
    allowedGroupings

    isAllowed(currentGrouping: Grouping): boolean {
        return this.allowedGroupings.some(allowedGroupings => currentGrouping instanceof allowedGroupings)
    }

    abstract getStartDate(): dayjs.Dayjs
    abstract getEndDate(): dayjs.Dayjs
}


export class QuickCurrentWeekPicker extends QuickDatePicker {
    title = 'Неделя'
    allowedGroupings = [DayGrouping, WeekGrouping]

    getEndDate(): dayjs.Dayjs {
        return dayjs().endOf('week')
    }

    getStartDate(): dayjs.Dayjs {
        return dayjs().startOf('week')
    }
}


export class QuickLastWeekPicker extends QuickDatePicker {
    title = 'Прошлая неделя'
    allowedGroupings = [DayGrouping, WeekGrouping]

    getEndDate(): dayjs.Dayjs {
        return dayjs().subtract(1, 'week').endOf('week')
    }

    getStartDate(): dayjs.Dayjs {
        return dayjs().subtract(1, 'week').startOf('week')
    }

}


export class QuickCurrentMonthPicker extends QuickDatePicker {
    title = 'Месяц'
    allowedGroupings = [DayGrouping, WeekGrouping, MonthGrouping]

    getEndDate(): dayjs.Dayjs {
        return dayjs().endOf('month')

    }

    getStartDate(): dayjs.Dayjs {
        return dayjs().startOf('month')
    }
}


export class QuickLastMonthPicker extends QuickDatePicker {
    title = 'Прошлый месяц'
    allowedGroupings = [DayGrouping, WeekGrouping, MonthGrouping]

    getEndDate(): dayjs.Dayjs {
        return dayjs().subtract(1, 'month').endOf('month')
    }

    getStartDate(): dayjs.Dayjs {
        return dayjs().subtract(1, 'month').startOf('month')
    }
}


export class QuickCurrentYearPicker extends QuickDatePicker {
    title = 'Год'
    allowedGroupings = [DayGrouping, WeekGrouping, MonthGrouping, QuarterGrouping, YearGrouping]

    getEndDate(): dayjs.Dayjs {
        return dayjs().endOf('year')
    }

    getStartDate(): dayjs.Dayjs {
        return dayjs().startOf('year')
    }
}
