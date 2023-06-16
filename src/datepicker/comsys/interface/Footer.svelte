<script lang="ts">
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()
</script>

<div class="container">
    <div class="button" on:click={() => dispatch('returnState')}>Применить</div>
</div>

<style>
    .container
    {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: end;
        align-items: center;
    }
    .button
    {
        background: #2c97de;
        color: white;
        border-radius: 2px;
        cursor: pointer;
        padding: 5px;
        margin: 5px;
        transition: 0.3s;
    }
    .button:hover
    {
        background: #2786c5;
    }
</style>
