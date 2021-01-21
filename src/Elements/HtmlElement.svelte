<script>
    import { afterUpdate } from 'svelte';
    export let payload;
    let container;

    const executeJS = function (element) {
        Array.from(element.querySelectorAll('script')).forEach((oldScript) => {
            const newScript = document.createElement('script');

            Array.from(oldScript.attributes).forEach((attr) =>
                newScript.setAttribute(attr.name, attr.value)
            );
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    };

    afterUpdate(() => {
        executeJS(container);
    });
</script>

<div class="html-code" bind:this="{container}">
    {@html payload.content}
</div>
