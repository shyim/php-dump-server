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
        const data = JSON.parse(message.data);
        if (data['payloads'].length === 1 && data['payloads'][0]['type'] === 'clear') {
            m = [];
        } else {
            m.push(data);
        }

        return m;
    })
}
