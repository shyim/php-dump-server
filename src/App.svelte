<script>
    import { messageStore } from './messageStore.js';
    import { dracula } from "svelte-highlight/styles";

    import Message from './Message.svelte';
</script>

<svelte:head>
    {@html dracula}
</svelte:head>

<main>
    {#each $messageStore.reverse() as message}
        <Message message={message} />
    {/each}
</main>
