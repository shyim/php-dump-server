import { writable } from 'svelte/store';
import { assembleUrl } from './util';

export const messageStore = writable({});
export const tagStore = writable(new Set());
export const activeTagStore = writable(new Set());

let eventSource = new EventSource(assembleUrl('/events'));

eventSource.onmessage = function (message) {
    const data = JSON.parse(message.data);
    let clear = false;

    messageStore.update((m) => {
        if (data['payloads'].length === 1 && data['payloads'][0]['type'] === 'clear') {
            m = {};
            clear = true;
        } else {
            m[data['uuid']] = data;
        }

        return m;
    });

    if ((data['tags'] && data['tags'].length) || clear) {
        tagStore.update((t) => {
            if (clear) {
                t = new Set();
            } else {
                data['tags'].forEach((tag) => {
                    t.add(tag);
                });
            }

            return t;
        });
    }
};
