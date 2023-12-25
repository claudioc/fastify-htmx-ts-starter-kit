export const nowToISOString = () => new Date().toISOString();
export const updateElementContent = (target, content) => {
    if (!target) {
        return;
    }
    const targetEl = document.querySelector(target);
    if (targetEl) {
        targetEl.innerHTML = content;
    }
};
