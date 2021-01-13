import { writable } from 'svelte/store';

export const messageStore = writable([]);

let eventSource;

if (isProduction) {
    eventSource = new EventSource('/events');
} else {
    eventSource = new EventSource('http://localhost:9009/events');
}

eventSource.onmessage = function (message) {
    messageStore.update(m => {
        m.push(JSON.parse(message.data));
        return m;
    })
}