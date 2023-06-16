<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import {Grouping} from "../logic/grouping"

    export let groupings: Grouping[]
    export let activeGrouping: Grouping


    const dispatch = createEventDispatcher()
</script>

<div class="container">
    <div class="title">
        Тип группировки
    </div>
    <div class="groupings">
        {#each groupings as grouping}
            <div
                class="grouping"
                class:active={grouping === activeGrouping}
                on:click={() => dispatch('changeGrouping', grouping)}
            >
                {grouping.title}
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
    .groupings
    {
        display: flex;
        flex-direction: row;
        margin: 0 5px;
    }
    .grouping
    {
        background: #f2f2f2;
        color: #7f7f7f;
        border-radius: 5px;
        cursor: pointer;
        padding: 5px;
        margin: 5px;
        transition: 0.3s;
    }
    .grouping:hover
    {
        background: #d7d7d7;
    }
    .grouping.active
    {
        background: #2c97de;
        color: white;
    }
    .grouping.active:hover
    {
        background: #2379b2;
    }
    @media (max-width: 610px) {
        .container
        {
            flex-direction: column;
        }
    }
    @media (max-width: 400px) {
        .groupings
        {
            flex-direction: column;
            width: 100%;
        }
        .grouping
        {
            margin: 1px 5px;
        }
    }
</style>

