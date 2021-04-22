<style type="text/css">
    table {
        width: 100%;
        border: unset;
        border-collapse: collapse;
    }
    thead {
        background: #222;
    }
    th {
        text-align: left;
    }
    th, td {
        padding: 10px 15px;
    }
    tr:nth-child(odd) {
        background: rgba(255,255,255,.03);
    }
</style>

<script>
    export let content;
</script>

<table>
    {#if content['headers']}
        <thead>
            {#each content['headers'] as header}
                <th>{header}</th>
            {/each}
        </thead>
    {/if}

    {#each content['rows'] as row}
        <tr>
            {#each row as column}
                <td>{column}</td>
            {/each}
        </tr>
    {/each}
</table>
