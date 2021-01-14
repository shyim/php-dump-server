<script>
    import { assembleUrl } from '../util';
    export let uuid;

    function resumeExecution() {
        fetch(assembleUrl('/unlock'), {
            headers: {
              'pd-id': uuid
            }
        });
    }
</script>

<button on:click|once={resumeExecution}>Resume {uuid}</button>
