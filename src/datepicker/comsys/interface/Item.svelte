<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import {DateNode} from "../../../calendar/calendar"

    export let dateNode: DateNode
    export let title: string
    export let isSelected: boolean
    export let isBetweenSelected: boolean
    export let isForbidden: boolean
    export let isExtraDateNode: boolean = false


    function handleClick() {
        if (!isForbidden) {
            dispatch('moveCursorDown', dateNode)
        }
    }

    const dispatch = createEventDispatcher()
</script>

<div
    class="item"
    on:click={handleClick}
    class:selected={isSelected}
    class:between-selected={isBetweenSelected}
    class:forbidden={isForbidden}
    class:extra-item={isExtraDateNode}
>
    {title}
</div>

<style>
    .item
    {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
    }
    .item.selected
    {
        background: #2c97de;
    }
    .item.between-selected
    {
        background: #96dcff;
    }
    .item.extra-item
    {
        opacity: 30%;
    }
    .item.forbidden
    {
        cursor: default;
        color: #9f9f9f;
    }
    .item:hover:not(.forbidden)
    {
        background: #d1d1d1;
    }
    .item.forbidden:active
    {
        animation: shake 0.4s 1 linear;
    }
    @keyframes shake
    {
        0% {
            transform: translate(7px);
        }
        20% {
            transform: translate(-7px);
        }
        40% {
            transform: translate(3px);
        }
        60% {
            transform: translate(-3px);
        }
        80% {
            transform: translate(1px);
        }
        100% {
            transform: translate(0px);
        }
    }
</style>
