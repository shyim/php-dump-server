<style type="text/css">
    .message {
        display: flex;
        flex-flow: row wrap;
        padding: 30px 20px;
        margin: 0 20px;
        border-bottom: 1px solid #393939;
    }

    .information {
        width: 10%;
    }

    .content {
        width: 90%;
    }

    .origin {
        padding-left: 10%;
        margin-top: 15px;
        font-family: monospace;
    }

    .element {
        margin-bottom: 10px;
    }

    .tags span {
        display: inline-block;
        padding: 2px 10px;
        margin: 10px 15px 0 0;
        background: rgba(255,255,255,.1);
        border-radius: 3px;
        line-height: 1.2
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
