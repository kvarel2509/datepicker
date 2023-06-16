import type {Grouping} from "./grouping"
import {DayGrouping, MonthGrouping, QuarterGrouping, WeekGrouping, YearGrouping} from "./grouping"

export class GroupingFactory {
    mapping: object = {
        day: new DayGrouping(),
        week: new WeekGrouping(),
        month: new MonthGrouping(),
        quarter: new QuarterGrouping(),
        year: new YearGrouping()
    }

    getGroupings(groupingAliases: string[]): Grouping[] {
        let response = []
        groupingAliases.forEach(groupingAlias => response.push(this.getGrouping(groupingAlias)))
        return response
    }

    getGrouping(groupingAlias: string): Grouping {
        try {
            return this.mapping[groupingAlias]
        } catch {
            throw `Значение groupingAlias=${groupingAlias} нет в списке доступных`
        }
    }
}