<script>
    import { messageStore } from './messageStore.js';
    import { github } from "svelte-highlight/styles";

    import Message from './Message.svelte';
</script>

<svelte:head>
    {@html github}
</svelte:head>

<main>
    {#each $messageStore.reverse() as message}
        <Message message={message} />
    {/each}
</main>
