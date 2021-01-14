<script>
    import { onMount } from 'svelte';
    export let content;
    export const id = '_' + Math.random().toString(36).substr(2, 9);

    const setInnerHTML = function(elm, html) {
        elm.innerHTML = html;

        Array.from(elm.querySelectorAll('script')).forEach(oldScript => {
            const newScript = document.createElement('script');

            Array.from(oldScript.attributes)
                .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    onMount(() => {
        setInnerHTML(document.getElementById(id), content)
    });
</script>

<div id={id}></div>
