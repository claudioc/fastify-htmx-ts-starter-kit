export const nowToISOString = () => new Date().toISOString();

export const updateElementContent = (target: string, content: string) => {
  if (!target) {
    return;
  }

  const targetEl = document.querySelector(target);
  if (targetEl) {
    targetEl.innerHTML = content;
  }
};
