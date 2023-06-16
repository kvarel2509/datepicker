import type {DateNode} from "./calendar"
import {dayjs} from "./dayjs"
import type {Day, Month} from "./calendar"


export function getLocaleWeekDay(node: DateNode): number {
    return (node.dateInterval.start.day() + 7 - dayjs.localeData().firstDayOfWeek()) % 7
}

export function getStartWeekDayDateNode(node: Day): Day {
    let minDayInWeek = 0
    while (getLocaleWeekDay(node) > minDayInWeek) {
        node = node.getPrevSibling()
    }
    return node
}

export function getEndWeekDayDateNode(node: Day): Day {
    let maxDayInWeek = 6
    while (getLocaleWeekDay(node) < maxDayInWeek) {
        node = node.getNextSibling()
    }
    return node
}

export function getStartQuarterMonthNode(node: Month): Month {
    let minMonthInQuarters = [0, 3, 6, 9]
    while (!minMonthInQuarters.includes(node.dateInterval.start.month())) {
        node = node.getPrevSibling()
    }
    return node
}

export function getEndQuarterMonthNode(node: Month): Month {
    let minMonthInQuarters = [2, 5, 8, 11]
    while (!minMonthInQuarters.includes(node.dateInterval.start.month())) {
        node = node.getNextSibling()
    }
    return node
}

export function getWeekDayMinNames() {
    let weekDayNames = dayjs.localeData().weekdaysMin()
    let firstDayOfWeek = dayjs.localeData().firstDayOfWeek()
    return weekDayNames.slice(firstDayOfWeek).concat(weekDayNames.slice(0, firstDayOfWeek))
}

export function getWeekDayShortNames() {
    let weekDayNames = dayjs.localeData().weekdaysShort()
    let firstDayOfWeek = dayjs.localeData().firstDayOfWeek()
    return weekDayNames.slice(firstDayOfWeek).concat(weekDayNames.slice(0, firstDayOfWeek))
}

export function getWeekDayFullNames() {
    let weekDayNames = dayjs.localeData().weekdays()
    let firstDayOfWeek = dayjs.localeData().firstDayOfWeek()
    return weekDayNames.slice(firstDayOfWeek).concat(weekDayNames.slice(0, firstDayOfWeek))
}
