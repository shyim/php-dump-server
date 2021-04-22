<script>
    import { assembleUrl } from '../util';
    export let message;

    function resumeExecution() {
        message.resumed = true;
        fetch(assembleUrl('/unlock'), {
            headers: {
                'pd-id': message.uuid,
            },
        });
    }
</script>

{#if message.resumed === undefined}
    <button class="btn" on:click="{resumeExecution}">Resume ⏵</button>
{/if}
