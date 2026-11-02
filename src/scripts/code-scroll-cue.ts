/** Shows the "scrolls →" cue on code blocks wider than their box (design-system section 8). */
const update = () =>
  document.querySelectorAll<HTMLElement>('[data-codeblock]').forEach((block) => {
    const pre = block.querySelector('pre');
    const cue = block.querySelector<HTMLElement>('[data-scroll-cue]');
    if (!pre || !cue) return;
    cue.classList.toggle('hidden', pre.scrollWidth <= pre.clientWidth);
  });

update();
window.addEventListener('resize', update);
