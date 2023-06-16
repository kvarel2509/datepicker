<script lang="ts">
    import DatePicker from "./DatePicker.svelte"
    import Grouping from "./Grouping.svelte"
    import QuickDatePicker from "./QuickDatePicker.svelte"
    import {ComSysDatePickerOrchestrator} from "../logic/orchestrator";

    export let orchestrator: ComSysDatePickerOrchestrator

    function changeGrouping(ev) {
        if (ev.detail !== orchestrator.activeGrouping) {
            orchestrator.setActiveGrouping(ev.detail)
            update()
        }
    }

    function quickDatePicker(ev) {
        orchestrator.setQuickDate(ev.detail)
        update()
    }

    function update() {
        orchestrator = orchestrator
    }
</script>

<div class="orchestrator">
    <div class="date-pickers">
        <div class="date-picker">
            <DatePicker
                datePicker={orchestrator.leftDatePicker}
                on:moveCursorDown={update}
            />
        </div>
        <div class="date-picker">
            <DatePicker
                datePicker={orchestrator.rightDatePicker}
                on:moveCursorDown={update}
            />
        </div>
    </div>
    {#if orchestrator.groupings.length > 0}
        <div class="grouping">
            <Grouping
                groupings={orchestrator.groupings}
                activeGrouping={orchestrator.activeGrouping}
                on:changeGrouping={changeGrouping}
            />
        </div>
    {/if}
    {#if orchestrator.quickDatePickers.length > 0}
        <div class="quick-date-picker">
            <QuickDatePicker
                quickDatePickers={orchestrator.quickDatePickers}
                activeGrouping={orchestrator.activeGrouping}
                on:quickDatePicker={quickDatePicker}
            />
        </div>
    {/if}
</div>

<style>
    .orchestrator
    {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        min-width: 280px;
        min-height: 100%;
        height: 100%;
    }
    .date-pickers
    {
        display: flex;
        flex-direction: row;
        min-width: 100%;
        width: 100%;
        flex-grow: 1;
    }
    .date-picker
    {
        margin: 5px 15px;
        flex-grow: 1;
    }
    @media (max-width: 560px) {
        .date-pickers
        {
            flex-direction: column;
        }
    }
    @media (max-width: 400px) {
        .quick-date-picker, .grouping
        {
            width: 100%;
        }
    }
</style>