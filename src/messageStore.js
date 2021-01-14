import { writable } from 'svelte/store';
import { assembleUrl } from './util';

export const messageStore = writable([]);

let eventSource = new EventSource(assembleUrl('/events'));

eventSource.onmessage = function (message) {
    messageStore.update(m => {
        const data = JSON.parse(message.data);
        if (data['payloads'].length === 1 && data['payloads'][0]['type'] === 'clear') {
            m = [];
        } else {
            m.push(data);
        }

        m.sort((a, b) => a.time - b.time);

        return m;
    })
}
