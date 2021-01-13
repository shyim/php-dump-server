<script>
    import CodeElement from './Elements/CodeElement.svelte';
    import HtmlElement from './Elements/HtmlElement.svelte';
    import TableElement from './Elements/TableElement.svelte';

    export let message;

    console.log(message);
</script>

<div class="message">
    <div class="information">
        <span class="time">{message['time']}</span>

        <div class="tags">
            {#each message['tags'] as tag}
                <span>{tag}</span>
            {/each}
        </div>
    </div>

    <div class="content">
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

    <div class="origin">
        {message['origin']['fileName']}:{message['origin']['lineNumber']}
    </div>
</div>

<style type="text/css">
    .message {
        display: flex;
        flex-flow: row wrap;
        border: 1px solid #333;
        padding: 20px;
        margin: 20px;
    }

    .information {
        width: 10%;
    }

    .content {
        width: 90%;
    }

    .origin {
        width: 100%;
    }
</style>
