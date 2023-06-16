<script lang="ts">
    import Item from "./Item.svelte"
    import Header from "./Header.svelte"
    import {DateNode} from "../../../calendar/calendar"
    import {ComSysDatePicker} from "../logic/datePickers"

    export let datePicker: ComSysDatePicker


    function getItemTitle(dateNode: DateNode) {
        return dateNode.dateInterval.start.format('YYYY')
    }

    function getHeaderTitle(dateNode: DateNode) {
        let startDate = `${dateNode.dateInterval.start.format('YYYY')} г`
        let endDate = `${dateNode.dateInterval.end.format('YYYY')} г`
        return `${startDate} - ${endDate}`
    }
</script>

<Header
    on:moveCursorUp
    on:moveCursorRight
    on:moveCursorLeft
>
    {getHeaderTitle(datePicker.cursorNode)}
</Header>

<div class="years">
    {#each datePicker.cursorNode.getChildren().all() as year}
        <div class="item body">
            <Item
                dateNode={year}
                isSelected={datePicker.isSelected(year)}
                isBetweenSelected={datePicker.isBetweenSelected(year)}
                isForbidden={datePicker.isForbidden(year)}
                title={getItemTitle(year)}
                on:moveCursorDown
            />
        </div>
    {/each}
</div>

<style>
    .years
    {
        flex-grow: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        background: white;
        transition: 0.3s;
    }
</style>
