import type {DateNode} from "../../../calendar/calendar"
import type {Grouping} from "./grouping"
import type {ComSysDatePickerOrchestrator} from "./orchestrator";


export interface Cast {
    startDateNode: DateNode,
    endDateNode: DateNode,
    grouping: Grouping
}


export class DatePickerState {
    orchestrator: ComSysDatePickerOrchestrator
    initialCast: Cast

    constructor(orchestrator: ComSysDatePickerOrchestrator) {
        this.orchestrator = orchestrator
        this.updateInitialCast()
    }

    updateInitialCast() {
        this.initialCast = this.makeCast()
    }

    makeCast(): Cast {
        return {
            startDateNode: this.orchestrator.leftDatePicker.selectedNode,
            endDateNode: this.orchestrator.rightDatePicker.selectedNode,
            grouping: this.orchestrator.activeGrouping
        }
    }

    isChange(): boolean {
        let cast = this.makeCast()
        return !(
            this.initialCast.startDateNode === cast.startDateNode &&
            this.initialCast.endDateNode === cast.endDateNode &&
            this.initialCast.grouping === cast.grouping
        )
    }

    getState() {
        let cast = this.makeCast()
        return {
            startDate: cast.startDateNode.dateInterval.start.toDate(),
            endDate: cast.endDateNode.dateInterval.end.toDate(),
            grouping: cast.grouping.name
        }
    }
}
