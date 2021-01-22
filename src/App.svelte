<style type="text/css">
    .tags span {
        display: inline-block;
        padding: 10px;
        margin-right: 15px;
    }

    .tags .active {
        background: #18171b;
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

<main>
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

    {#each displayMessages as message}
        {#if showMessage(message)}
            <Message message="{message}" />
        {/if}
    {/each}
</main>
