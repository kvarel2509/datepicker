import type {DateNode} from "../../../calendar/calendar"
import {
    getEndQuarterMonthNode,
    getEndWeekDayDateNode,
    getStartQuarterMonthNode,
    getStartWeekDayDateNode
} from "../../../calendar/utils"


export abstract class Grouping {
    title: string
    name: string
    depth: number

    abstract getStartDateNode(dateNode: DateNode): DateNode
    abstract getEndDateNode(dateNode: DateNode): DateNode
}


export class DayGrouping extends Grouping {
    title = 'День'
    name = 'day'
    depth = 4

    getEndDateNode(dateNode: DateNode): DateNode {
        return dateNode
    }

    getStartDateNode(dateNode: DateNode): DateNode {
        return dateNode
    }
}


export class WeekGrouping extends Grouping {
    title = 'Неделя'
    name = 'week'
    depth = 4

    getEndDateNode(dateNode: DateNode): DateNode {
        return getEndWeekDayDateNode(dateNode)
    }

    getStartDateNode(dateNode: DateNode): DateNode {
        return getStartWeekDayDateNode(dateNode);
    }
}


export class MonthGrouping extends Grouping {
    title = 'Месяц'
    name = 'month'
    depth = 3

    getEndDateNode(dateNode: DateNode): DateNode {
        return dateNode
    }

    getStartDateNode(dateNode: DateNode): DateNode {
        return dateNode
    }
}


export class QuarterGrouping extends Grouping {
    title = 'Квартал'
    name = 'quarter'
    depth = 3

    getEndDateNode(dateNode: DateNode): DateNode {
        return getEndQuarterMonthNode(dateNode)
    }

    getStartDateNode(dateNode: DateNode): DateNode {
        return getStartQuarterMonthNode(dateNode)
    }
}


export class YearGrouping extends Grouping {
    title = 'Год'
    name = 'year'
    depth = 2

    getEndDateNode(dateNode: DateNode): DateNode {
        return dateNode;
    }

    getStartDateNode(dateNode: DateNode): DateNode {
        return dateNode;
    }
}
