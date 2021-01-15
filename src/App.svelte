<script>
    import { messageStore } from './messageStore.js';
    import { dracula } from "svelte-highlight/styles";

    import Message from './Message.svelte';

    let messages = [];

    $: messages = Object.values($messageStore).sort((a, b) => b.time - a.time);
</script>

<svelte:head>
    {@html dracula}
</svelte:head>

<main>
    {#each messages as message}
        <Message message={message} />
    {/each}
</main>
