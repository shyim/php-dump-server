<script>
    import { onMount } from 'svelte';
    export let payload;

    const executeJS = function() {
        document.body.querySelectorAll('.html-code').forEach(element => {
            element.classList.remove('html-code');

            Array.from(element.querySelectorAll('script')).forEach(oldScript => {
                const newScript = document.createElement('script');

                Array.from(oldScript.attributes)
                    .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        })
    }

    onMount(() => {
        executeJS();
    });
</script>

<div class="html-code">
    {@html payload.content}
</div>