<script lang="ts">
    import Item from "./Item.svelte"
    import Header from "./Header.svelte"
    import {ComSysDatePicker} from "../logic/datePickers"
    import {DateNode, DateNodeIsNotFoundError} from "../../../calendar/calendar"
    import {getLocaleWeekDay, getWeekDayMinNames} from "../../../calendar/utils"

    export let datePicker: ComSysDatePicker


    function getItemTitle(dateNode: DateNode) {
        return dateNode.dateInterval.start.format('D')
    }

    function getHeaderTitle(monthNode: DateNode) {
        return  monthNode.dateInterval.start.format('MMMM YYYY').toUpperCase()
    }

    function getGridColumnStart(weekDay: number): number {
        return weekDay + 1
    }

    $: extraDaysBeforeMain = () => {
        let nodes = []
        let firstDay = datePicker.cursorNode.getChildren().get(0)
        let countExtraDays = getLocaleWeekDay(firstDay)
        while (nodes.length < countExtraDays) {
            try {
                firstDay = firstDay.getPrevSibling()
                nodes.unshift(firstDay)
            } catch (e) {
                if (e instanceof DateNodeIsNotFoundError) {
                    break
                }
            }
        }
        return nodes
    }

    $: extraDaysAfterMain = () => {
        let nodes = []
        let countDaysTarget = 42 // days in 6 weeks
        let children = datePicker.cursorNode.getChildren().all()
        let firstDay = children[0]
        let lastDay = children[children.length - 1]
        let countExtraDays = countDaysTarget - getLocaleWeekDay(firstDay) - children.length
        while (nodes.length < countExtraDays) {
            try {
                lastDay = lastDay.getNextSibling()
                nodes.push(lastDay)
            } catch (e) {
                if (e instanceof DateNodeIsNotFoundError) {
                    break
                }
            }
        }
        return nodes
    }
</script>


    <Header
        on:moveCursorUp
        on:moveCursorRight
        on:moveCursorLeft
    >
        {getHeaderTitle(datePicker.cursorNode)}
    </Header>


<div
    class="days"
>
    {#each getWeekDayMinNames() as weekDayName}
        <div class="header item">
            {weekDayName}
        </div>
    {/each}
    {#each extraDaysBeforeMain() as day}
        <div
            class="item body"
            style="grid-column-start: {getGridColumnStart(day)}"
        >
            <Item
                dateNode={day}
                isSelected={datePicker.isSelected(day)}
                isBetweenSelected={datePicker.isBetweenSelected(day)}
                isForbidden={datePicker.isForbidden(day)}
                isExtraDateNode={true}
                title={getItemTitle(day)}
                on:moveCursorDown
            />
        </div>
    {/each}
    {#each datePicker.cursorNode.getChildren().all() as day}
        <div
            class="item body"
            style="grid-column-start: {getGridColumnStart(day)}"
        >
            <Item
                dateNode={day}
                isSelected={datePicker.isSelected(day)}
                isBetweenSelected={datePicker.isBetweenSelected(day)}
                isForbidden={datePicker.isForbidden(day)}
                title={getItemTitle(day)}
                on:moveCursorDown
            />
        </div>
    {/each}
    {#each extraDaysAfterMain() as day}
        <div
            class="item body"
            style="grid-column-start: {getGridColumnStart(day)}"
        >
            <Item
                dateNode={day}
                isSelected={datePicker.isSelected(day)}
                isBetweenSelected={datePicker.isBetweenSelected(day)}
                isForbidden={datePicker.isForbidden(day)}
                isExtraDateNode={true}
                title={getItemTitle(day)}
                on:moveCursorDown
            />
        </div>
    {/each}
</div>



<style>
    .days
    {
        flex-grow: 1;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 1fr;
        background: white;
        transition: 0.3s;
    }
    .header
    {
        align-self: center;
        justify-self: center;
        font-weight: bold;
    }
</style>
