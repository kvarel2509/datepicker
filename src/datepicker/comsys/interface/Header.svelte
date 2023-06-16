<script lang="ts">
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<div class="header">
    <div
        class="button"
        on:click={() => dispatch('moveCursorLeft')}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
    </div>
    <div class="title button" on:click={() => dispatch('moveCursorUp')}>
        <slot/>
    </div>
    <div
        class="button"
        on:click={() => dispatch('moveCursorRight')}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </div>
</div>

<style>
    .header
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 30px;
        user-select: none;
    }
    .title
    {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        font-size: 1.1em;
    }
    .button
    {
        cursor: pointer;
        padding: 10px;
        transition: 0.3s;
        font-weight: bold;
    }
    .button:hover
    {
        background: #f5f5f5;
    }
</style>
