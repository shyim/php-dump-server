<style type="text/css">
    .time {
        font-family: monospace;
    }
</style>

<script>
    export let unixTimestamp;

    function formatTimestamp(timestamp) {
        const d = new Date();
        d.setTime(timestamp * 1000);
        return d.toLocaleTimeString();
    }
</script>

<span class="time">{formatTimestamp(unixTimestamp)}</span>
