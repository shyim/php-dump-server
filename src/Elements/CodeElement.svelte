<script>
    import { Highlight } from "svelte-highlight";

    import { sql } from 'svelte-highlight/languages'

    export let content;
</script>

<Highlight language="{sql}" code={content['value']} />
