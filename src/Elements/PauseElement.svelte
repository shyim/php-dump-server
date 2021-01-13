<script>
    export let uuid;

    function resumeExecution() {
        fetch('http://localhost:9009/unlock', {
            headers: {
              'pd-id': uuid
            }
        });
    }
</script>

<button on:click|once={resumeExecution}>Resume {uuid}</button>
