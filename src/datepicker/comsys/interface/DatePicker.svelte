<script lang="ts">
    import Month from "./Month.svelte"
    import Year from "./Year.svelte"
    import YearsGroup from "./YearsGroup.svelte"
    import {ComSysDatePicker} from "../logic/datePickers"
    import {createEventDispatcher} from "svelte"

    export let datePicker: ComSysDatePicker


    function moveCursorUp() {
        datePicker.moveCursorUp()
        update()
    }

    function moveCursorRight() {
        datePicker.moveCursorRight()
        update()
    }

    function moveCursorLeft() {
        datePicker.moveCursorLeft()
        update()
    }

    function moveCursorDown(ev) {
        datePicker.moveCursorDown(ev.detail)
        dispatch('moveCursorDown')
        update()
    }

    function update() {
        datePicker = datePicker
    }

    const dispatch = createEventDispatcher()
    $: depth = datePicker.cursorNode.getDepth()
</script>

<div class="date-picker">
    {#if depth === 3}
        <Month
            {datePicker}
            on:moveCursorDown={moveCursorDown}
            on:moveCursorUp={moveCursorUp}
            on:moveCursorRight={moveCursorRight}
            on:moveCursorLeft={moveCursorLeft}
        >
        </Month>
    {:else if depth === 2}
        <Year
            {datePicker}
            on:moveCursorDown={moveCursorDown}
            on:moveCursorUp={moveCursorUp}
            on:moveCursorRight={moveCursorRight}
            on:moveCursorLeft={moveCursorLeft}
        >
        </Year>
    {:else if depth === 1}
        <YearsGroup
            {datePicker}
            on:moveCursorDown={moveCursorDown}
            on:moveCursorRight={moveCursorRight}
            on:moveCursorLeft={moveCursorLeft}
        >
        </YearsGroup>
    {/if}
</div>

<style>
    .date-picker
    {
        display: flex;
        gap: 5px;
        flex-direction: column;
        min-width: 250px;
        min-height: 200px;
        height: 100%;
        width: 100%;
    }
</style>