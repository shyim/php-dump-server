import { writable } from 'svelte/store';
import { assembleUrl } from './util';

export const messageStore = writable({});

let eventSource = new EventSource(assembleUrl('/events'));

eventSource.onmessage = function (message) {
    messageStore.update(m => {
        const data = JSON.parse(message.data);
        if (data['payloads'].length === 1 && data['payloads'][0]['type'] === 'clear') {
            m = {};
        } else {
            m[data['uuid']] = data;
        }

        return m;
    })
}
