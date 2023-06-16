import type {Calendar, DateNode} from "../../../calendar/calendar"
import type dayjs from "dayjs"
import type {Grouping} from "./grouping"


export abstract class ComSysDatePicker {
    calendar: Calendar
    cursorNode: DateNode
    selectedNode: DateNode
    siblingDatePicker: ComSysDatePicker
    grouping: Grouping

    constructor(calendar: Calendar, initialDate: dayjs.Dayjs, initialGrouping: Grouping) {
        this.calendar = calendar
        this.grouping = initialGrouping
        let dateNode = this.findDateNode(initialDate)
        this.setNodes(dateNode)
    }

    setNodes(dateNode: DateNode) {
        this.setSelectedNode(dateNode)
        this.setCursorNode(this.selectedNode.getParent())
    }

    setSiblingDatePicker(datePicker: ComSysDatePicker) {
        this.siblingDatePicker = datePicker
    }

    setCursorNode(node: DateNode) {
        this.cursorNode = node
    }

    setSelectedNode(node: DateNode) {
        this.selectedNode = this.getGroupingDateNode(node)
    }

    moveCursorUp() {
        this.setCursorNode(this.cursorNode.getParent())
    }

    moveCursorRight() {
        this.setCursorNode(this.cursorNode.getNextSibling())
    }

    moveCursorLeft() {
        this.setCursorNode(this.cursorNode.getPrevSibling())
    }

    moveCursorDown(node: DateNode) {
        if (!this.isForbidden(node)) {
            if (node.getDepth() === this.grouping.depth) {
                this.setSelectedNode(node)
            } else {
                this.setCursorNode(node)
            }
        }
    }

    setGrouping(grouping: Grouping) {
        this.grouping = grouping
        let date = this.getSelectedDate()
        let dateNode = this.findDateNode(date)
        this.setNodes(dateNode)
    }

    findDateNode(date: dayjs.Dayjs): DateNode {
        return this.calendar.findDateNode(date, this.grouping.depth)
    }

    isSelected(node: DateNode): boolean {
        return [this.selectedNode, this.siblingDatePicker.selectedNode].includes(node)
    }

    abstract isBetweenSelected(node: DateNode): boolean
    abstract isForbidden(node: DateNode): boolean
    abstract getGroupingDateNode(node: DateNode): DateNode
    abstract getSelectedDate(): dayjs.Dayjs
}


export class ComSysRightDatePicker extends ComSysDatePicker {
    getGroupingDateNode(node: DateNode): DateNode {
        return this.grouping.getEndDateNode(node)
    }

    isBetweenSelected(node: DateNode): boolean {
        return (
            node.getDepth() === this.selectedNode.getDepth() &&
            node.getDepth() === this.siblingDatePicker.selectedNode.getDepth() &&
            node.dateInterval.start.isAfter(this.siblingDatePicker.selectedNode.dateInterval.end) &&
            node.dateInterval.end.isBefore(this.selectedNode.dateInterval.start)
        )
    }

    isForbidden(node: DateNode): boolean {
        return node.dateInterval.end.isBefore(this.siblingDatePicker.selectedNode.dateInterval.start)
    }

    getSelectedDate(): dayjs.Dayjs {
        return this.selectedNode.dateInterval.end
    }
}


export class ComSysLeftDatePicker extends ComSysDatePicker {
    getGroupingDateNode(node: DateNode): DateNode {
        return this.grouping.getStartDateNode(node)
    }

    isBetweenSelected(node: DateNode): boolean {
        return (
            node.getDepth() === this.selectedNode.getDepth() &&
            node.getDepth() === this.siblingDatePicker.selectedNode.getDepth() &&
            node.dateInterval.start.isAfter(this.selectedNode.dateInterval.end) &&
            node.dateInterval.end.isBefore(this.siblingDatePicker.selectedNode.dateInterval.start)
        )
    }

    isForbidden(node: DateNode): boolean {
        return node.dateInterval.start.isAfter(this.siblingDatePicker.selectedNode.dateInterval.end)
    }

    getSelectedDate(): dayjs.Dayjs {
        return this.selectedNode.dateInterval.start
    }
}


