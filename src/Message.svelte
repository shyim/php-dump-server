<script>
    import CodeElement from './Elements/CodeElement.svelte';
    import HtmlElement from './Elements/HtmlElement.svelte';
    import TableElement from './Elements/TableElement.svelte';

    export let message;

    console.log(message);
</script>

<div class="message">
    <span class="time">{message['time']}</span>

    <div class="tags">
        {#each message['tags'] as tag}
            <span>{tag}</span>
        {/each}
    </div>

    {#each message['payloads'] as payload}
        {#if payload['type'] === 'code'}
            <CodeElement content={payload['content']} />
        {:else if payload['type'] === 'html'}
            <HtmlElement content={payload['content']} />
        {:else if payload['type'] === 'table'}
            <TableElement content={payload['content']} />
        {/if}
    {/each}
</div>
