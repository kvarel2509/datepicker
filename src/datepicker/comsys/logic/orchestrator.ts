import type {Grouping} from "./grouping"
import type {QuickDatePicker} from "./quickDatePicker"
import type {ComSysDatePicker, ComSysLeftDatePicker, ComSysRightDatePicker} from "./datePickers"


export class ComSysDatePickerOrchestrator {
    leftDatePicker: ComSysLeftDatePicker
    rightDatePicker: ComSysRightDatePicker
    groupings: Grouping[]
    activeGrouping: Grouping
    quickDatePickers: QuickDatePicker[]

    constructor(
        leftDatePicker: ComSysDatePicker,
        rightDatePicker: ComSysDatePicker,
        groupings: Grouping[],
        activeGrouping: Grouping,
        quickDatePickers: QuickDatePicker[]
    ) {
        this.leftDatePicker = leftDatePicker
        this.rightDatePicker = rightDatePicker
        this.leftDatePicker.setSiblingDatePicker(rightDatePicker)
        this.rightDatePicker.setSiblingDatePicker(leftDatePicker)
        this.groupings = groupings
        this.activeGrouping = activeGrouping
        this.quickDatePickers = quickDatePickers
    }

    setActiveGrouping(grouping: Grouping) {
        this.activeGrouping = grouping
        this.leftDatePicker.setGrouping(grouping)
        this.rightDatePicker.setGrouping(grouping)
    }

    setQuickDate(quickDatePicker: QuickDatePicker) {
        let startDate = quickDatePicker.getStartDate()
        let leftDateNode = this.leftDatePicker.findDateNode(startDate)
        this.leftDatePicker.setNodes(leftDateNode)
        let endDate = quickDatePicker.getEndDate()
        let rightDateNode = this.rightDatePicker.findDateNode(endDate)
        this.rightDatePicker.setNodes(rightDateNode)
    }
}