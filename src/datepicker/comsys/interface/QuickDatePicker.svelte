<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import {QuickDatePicker} from "../logic/quickDatePicker"
    import {Grouping} from "../logic/grouping"

    export let quickDatePickers: QuickDatePicker[]
    export let activeGrouping: Grouping


    function handleClick(quickDatePicker: QuickDatePicker) {
        if (quickDatePicker.isAllowed(activeGrouping)) {
            dispatch('quickDatePicker', quickDatePicker)
        }
    }

    const dispatch = createEventDispatcher()
</script>

<div class="container">
    <div class="title">Быстрые фильтры</div>
    <div class="quick-date-pickers">
        {#each quickDatePickers as quickDatePicker}
            <div
                class="quick-date-picker"
                class:allowed={quickDatePicker.isAllowed(activeGrouping)}
                on:click={() => handleClick(quickDatePicker)}
            >
                {quickDatePicker.title}
            </div>
        {/each}
    </div>
</div>


<style>
    .container
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        user-select: none;
        gap: 5px;
    }
    .title
    {
        cursor: default;
    }
    .quick-date-pickers
    {
        display: flex;
        flex-direction: row;
        margin: 0 5px;
    }
    .quick-date-picker
    {
        background: #f2f2f2;
        color: #bdbdbd;
        border: 1px solid #b0b0b0;
        cursor: not-allowed;
        padding: 5px;
        transition: 0.3s;
        text-align: center;
    }
    .quick-date-picker.allowed
    {
        color: #2c97de;
        cursor: pointer;
    }
    .quick-date-picker.allowed:hover
    {
        background: #e0e0e0;
    }
    .quick-date-picker.allowed:active
    {
        background: #bbbbbb;
    }
    @media (max-width: 610px) {
        .container
        {
            flex-direction: column;
        }
    }
    @media (max-width: 400px) {
        .quick-date-pickers
        {
            flex-direction: column;
            width: 100%;
        }
        .quick-date-picker
        {
            margin: 0 5px;
        }
    }
</style>
