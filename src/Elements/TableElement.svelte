<script>
    export let content;
</script>

<table>
    {#if content['header']}
        {#each content['header'] as header}
            <th>{header}</th>
        {/each}
    {/if}

    {#each content['rows'] as row}
        <tr>
            {#each row as column}
                <td>{column}</td>
            {/each}
        </tr>
    {/each}
</table>
