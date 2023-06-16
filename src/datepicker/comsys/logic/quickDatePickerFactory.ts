import type {QuickDatePicker} from "./quickDatePicker";
import {
    QuickCurrentMonthPicker,
    QuickCurrentWeekPicker,
    QuickCurrentYearPicker,
    QuickLastMonthPicker,
    QuickLastWeekPicker
} from "./quickDatePicker";


export class QuickDatePickerFactory {
    mapping: object = {
        currentWeek: new QuickCurrentWeekPicker(),
        lastWeek: new QuickLastWeekPicker(),
        currentMonth: new QuickCurrentMonthPicker(),
        lastMonth: new QuickLastMonthPicker(),
        currentYear: new QuickCurrentYearPicker(),
    }

    getQuickDatePickers(quickDatePickerAliases: string[]): QuickDatePicker[] {
        let response = []
        quickDatePickerAliases.forEach(
            quickDatePickerAlias => response.push(this.getQuickDatePicker(quickDatePickerAlias))
        )
        return response
    }

    getQuickDatePicker(quickDatePickerAlias: string): QuickDatePicker {
        try {
            return this.mapping[quickDatePickerAlias]
        } catch {
            throw `Значение quickDatePicker=${quickDatePickerAlias} нет в списке доступных`
        }
    }
}
