import { nowToISOString, updateElementContent } from './lib/tools.js';
const htmx = window.htmx;
if (htmx !== undefined) {
    htmx.defineExtension('current-time', {
        onEvent: (name, evt) => {
            const el = evt.target;
            if (name === 'htmx:afterSwap' || name === 'htmx:afterProcessNode') {
                if (el && el.dataset) {
                    updateElementContent(el.dataset.target, nowToISOString());
                }
            }
        },
    });
}
