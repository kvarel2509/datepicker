<script lang="ts">
	import ComSysDatePicker from "./datepicker/comsys/ComSysDatePicker.svelte"
</script>

<main>
	<ComSysDatePicker
		on:stateChanged={(ev) => console.log(ev.detail)}
	></ComSysDatePicker>
</main>
