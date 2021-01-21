<style type="text/css">
    .message {
        display: flex;
        flex-flow: row wrap;
        padding: 20px;
        margin: 20px;
        background: #121212;
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

    .element {
        margin-bottom: 10px;
    }
</style>

<script>
    import HtmlElement from './Elements/HtmlElement.svelte';
    import TableElement from './Elements/TableElement.svelte';
    import PauseElement from './Elements/PauseElement.svelte';
    import FormattedTimestamp from './FormattedTimestamp.svelte';

    export let message;
</script>

<div class="message">
    <div class="information">
        <FormattedTimestamp unixTimestamp="{message['time']}" />

        <div class="tags">
            {#each message['tags'] as tag}
                <span>{tag}</span>
            {/each}
        </div>
    </div>

    <div class="content">
        {#each message['payloads'] as payload}
            <div class="element">
                {#if payload['type'] === 'html'}
                    <HtmlElement payload="{payload}" />
                {:else if payload['type'] === 'table'}
                    <TableElement content="{payload['content']}" />
                {:else if payload['type'] === 'pause'}
                    <PauseElement message="{message}" />
                {/if}
            </div>
        {/each}
    </div>

    <div class="origin">
        {message['origin']['fileName']}:{message['origin']['lineNumber']}
    </div>
</div>
