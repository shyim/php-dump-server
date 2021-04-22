<style type="text/css">
    .header {
        background: rgba(255,255,255,.1);
        position: sticky;
        top: 0;
        padding: 20px;
        display: flex;
        align-items: flex-end;
    }

    .logo {
        font-size: 40px;
        font-family: monospace;
        padding-right: 40px;
    }

    .tags span {
        display: inline-block;
        padding: 2px 10px;
        margin: 10px 15px 0 0;
        background: rgba(255,255,255,.1);
        border-radius: 3px;
        cursor: pointer;
        line-height: 1.2;
    }

    .tags .active {
        background: #18171b;
    }

    :global(.btn) {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #28a745;
        padding: .2rem .9rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: background .15s;
        background-color: #28a745;
        color: #FFF;
        cursor: pointer;
    }

    :global(.btn:hover) {
        background: #116625;
    }

    .blink {
        animation: blinker 1s step-start infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
</style>

<script>
    import { messageStore, tagStore, activeTagStore } from './stores.js';

    import Message from './Message.svelte';

    let displayMessages = [],
        tags = [],
        activeTags = [];

    function switchTagStatus(tag) {
        activeTagStore.update((t) => {
            if (t.has(tag)) {
                t.delete(tag);
            } else {
                t.add(tag);
            }

            return t;
        });
    }

    function showMessage(message) {
        if ($activeTagStore.size === 0) {
            return true;
        }

        if (!message['tags'] || message['tags'].length === 0) {
            return false;
        }

        let show = false;
        message['tags'].forEach((tag) => {
            if ($activeTagStore.has(tag)) {
                show = true;
            }
        });

        return show;
    }

    function getMessages(messages) {
        messages = messages.filter((message) => {
            return showMessage(message);
        });
        displayMessages = messages.sort((a, b) => b.time - a.time);
    }

    $: $activeTagStore && getMessages(Object.values($messageStore));
    $: tags = [...$tagStore];
</script>

<svelte:head>
    <style>
        /* could also be handled via the theme, but we leave that static for now */
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");
        /* all css that we need is a global reset sheet */
        html, body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', sans-serif;
            font-size: 16px;
        }
        * {
            margin: 0;
            padding: 0;
            color: inherit;
            text-decoration: none;
        }

        a:hover,
        a:visited,
        a:active {
            text-decoration: none;
        }
    </style>
</svelte:head>

<main>
    <div class="header">
        <div class="logo">
            [pd<span class="blink">_</span>]
        </div>
        <div class="tags">
            {#each tags as tag}
            <span
                    class="{$activeTagStore.has(tag) ? 'active' : ''}"
                    on:click="{switchTagStatus(tag)}"
            >
                {tag}
            </span>
            {/each}
        </div>
    </div>

    {#each displayMessages as message}
        {#if showMessage(message)}
            <Message message="{message}" />
        {/if}
    {/each}
</main>
