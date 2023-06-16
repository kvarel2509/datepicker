<script lang="ts">
    import Item from "./Item.svelte"
    import Header from "./Header.svelte"
    import {DateNode} from "../../../calendar/calendar"
    import {ComSysDatePicker} from "../logic/datePickers"

    export let datePicker: ComSysDatePicker


    function getItemTitle(dateNode: DateNode) {
        return dateNode.dateInterval.start.format('MMM')
    }

    function getHeaderTitle(dateNode: DateNode) {
        return `${dateNode.dateInterval.start.format('YYYY')} г`
    }
</script>

<Header
    on:moveCursorUp
    on:moveCursorRight
    on:moveCursorLeft
>
    {getHeaderTitle(datePicker.cursorNode)}
</Header>

<div class="months">
    {#each datePicker.cursorNode.getChildren().all() as month}
        <div class="item body">
            <Item
                dateNode={month}
                isSelected={datePicker.isSelected(month)}
                isBetweenSelected={datePicker.isBetweenSelected(month)}
                isForbidden={datePicker.isForbidden(month)}
                title={getItemTitle(month)}
                on:moveCursorDown
            />
        </div>
    {/each}
</div>

<style>
    .months
    {
        flex-grow: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        background: white;
        transition: 0.3s;
    }
</style>
