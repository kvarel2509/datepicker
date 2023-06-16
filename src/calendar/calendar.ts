import type {dayjs} from "./dayjs"


export class DateNodeIsNotFoundError {}


export class DateInterval {
    start: dayjs.Dayjs
    end: dayjs.Dayjs

    constructor(start: dayjs.Dayjs, end: dayjs.Dayjs) {
        this.start = start
        this.end = end
    }

    isContains(date: dayjs.Dayjs) {
        return date.isBetween(
            this.start,
            this.end,
            null,
            '[]'
        )
    }
}


export abstract class DateNode {
    dateInterval: DateInterval
    parent: DateNode
    children: DateNodesCollection

    constructor(dateInterval: DateInterval) {
        this.dateInterval = dateInterval
    }

    getDepth(): number {
        let depth = 0
        let node: DateNode = this
        while (node.parent) {
            depth += 1
            node = node.parent
        }
        return depth
    }

    getParent(): DateNode {
        if (!this.parent) {
            throw new DateNodeIsNotFoundError()
        }
        return this.parent
    }

    setParent(parent: DateNode) {
        this.parent = parent
    }

    getChildren(): DateNodesCollection {
        if (!this.children) {
            let children = this.createChildren()
            this.setChildren(children)
        }
        return this.children
    }

    setChildren(children: DateNodesCollection) {
        this.children = children
    }

    getNextSibling(): DateNode {
        let targetDepth = this.getDepth()
        let node = this.getParent()
        let targetPosition = node.getChildren().getPosition(this) + 1

        while (node.getDepth() < targetDepth) {
            try {
                node = node.getChildren().get(targetPosition)
                targetPosition = 0
            } catch (e) {
                if (e instanceof DateNodeIsNotFoundError) {
                    let parent = node.getParent()
                    targetPosition = parent.getChildren().getPosition(node) + 1
                    node = parent
                }
            }
        }
        return node
    }

    getPrevSibling(): DateNode {
        let targetDepth = this.getDepth()
        let node = this.getParent()
        let targetPosition = node.getChildren().getPosition(this) - 1

        while (node.getDepth() < targetDepth) {
            try {
                node = node.getChildren().get(targetPosition)
                targetPosition = node.getChildren().all().length - 1
            } catch (e) {
                if (e instanceof DateNodeIsNotFoundError) {
                    let parent = node.getParent()
                    targetPosition = parent.getChildren().getPosition(node) - 1
                    node = parent
                }
            }
        }
        return node
    }

    abstract createChildren(): DateNodesCollection
}


export class DateNodesCollection {
    nodes: DateNode[]

    constructor(nodes: DateNode[]) {
        this.nodes = nodes
    }

    all() {
        return this.nodes
    }

    get(index: number): DateNode {
        if (index < 0 || index >= this.nodes.length) {
            throw new DateNodeIsNotFoundError()
        }
        return this.nodes[index]
    }

    getPosition(calendarDateNode: DateNode): number {
        let position = this.nodes.indexOf(calendarDateNode)
        if (position === -1) {
            throw new DateNodeIsNotFoundError()
        }
        return position
    }
}


export class Day extends DateNode {
    createChildren(): DateNodesCollection {
        return new DateNodesCollection([])
    }
}


export class Month extends DateNode {
    createChildren(): DateNodesCollection {
        let children = []
        let sliderDate = this.dateInterval.start

        while (sliderDate < this.dateInterval.end) {
            let dateInterval = new DateInterval(sliderDate.startOf('day'), sliderDate.endOf('day'))
            let child = new Day(dateInterval)
            child.setParent(this)
            children.push(child)
            sliderDate = sliderDate.add(1, 'day')
        }

        return new DateNodesCollection(children)
    }
}


export class Year extends DateNode {
    createChildren(): DateNodesCollection {
        let children = []
        let sliderDate = this.dateInterval.start

        while (sliderDate < this.dateInterval.end) {
            let dateInterval = new DateInterval(sliderDate.startOf('month'), sliderDate.endOf('month'))
            let child = new Month(dateInterval)
            child.setParent(this)
            children.push(child)
            sliderDate = sliderDate.add(1, 'month')
        }

        return new DateNodesCollection(children)
    }
}


export class YearsGroup extends DateNode {
    createChildren(): DateNodesCollection {
        let children = []
        let sliderDate = this.dateInterval.start

        while (sliderDate < this.dateInterval.end) {
            let dateInterval = new DateInterval(sliderDate.startOf('year'), sliderDate.endOf('year'))
            let child = new Year(dateInterval)
            child.setParent(this)
            children.push(child)
            sliderDate = sliderDate.add(1, 'year')
        }

        return new DateNodesCollection(children)
    }
}


export class Era extends DateNode {
    createChildren(): DateNodesCollection {
        let children = []
        let sliderDate = this.dateInterval.start

        while (sliderDate < this.dateInterval.end) {
            let dateInterval = new DateInterval(
                sliderDate.startOf('year'),
                sliderDate.add(11, 'year').endOf('year')
            )
            let child = new YearsGroup(dateInterval)
            child.setParent(this)
            children.push(child)
            sliderDate = sliderDate.add(12, 'year')
        }

        return new DateNodesCollection(children)
    }
}


export class Calendar {
    rootNode: DateNode

    constructor(root: DateNode) {
        this.rootNode = root
    }

    findDateNode(date: dayjs.Dayjs, depth: number): DateNode {
        let node = this.rootNode
        let target

        for (let i = 0; i < depth; i++) {
            let children = node.getChildren().all()
            target = undefined
            for (let child of children) {
                if (child.dateInterval.isContains(date)) {
                    target = child
                    break
                }
            }
            if (target === undefined) {
                throw new DateNodeIsNotFoundError()
            }
            node = target
        }
        return node
    }
}
