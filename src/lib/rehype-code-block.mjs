/**
 * Gives code blocks in plain `.md` files the same markup as `CodeBlock.astro`
 * (docs/design-system.md section 8). MDX files use that component through their
 * `pre` mapping, so they are skipped here. Keep the two in step.
 */
const element = (tagName, className, children, properties = {}) => ({
  type: 'element',
  tagName,
  properties: { className, ...properties },
  children,
});

const text = (value) => ({ type: 'text', value });

const wrap = (pre) => {
  const language = pre.properties?.dataLanguage;
  const label = language && language !== 'plaintext' ? language : 'code';
  pre.properties = {
    ...pre.properties,
    className: [
      ...(pre.properties?.className ?? []),
      'm-0',
      'overflow-x-auto',
      'p-4',
      'font-mono',
      'text-xs',
      'leading-6',
    ],
    style: 'background: transparent !important',
    tabindex: 0,
    role: 'region',
    ariaLabel: `${label} code, scrollable`,
  };
  return element(
    'div',
    ['not-prose', 'my-8', 'border', 'border-rule', 'bg-margin'],
    [
      element(
        'div',
        [
          'flex',
          'items-center',
          'justify-between',
          'border-b',
          'border-rule',
          'px-4',
          'py-2',
          'font-mono',
          'text-label',
          'tracking-label',
          'text-ink-subtle',
          'uppercase',
        ],
        [
          element('span', [], [text(label)]),
          element('span', ['hidden'], [text('scrolls →')], {
            dataScrollCue: '',
            ariaHidden: 'true',
          }),
        ]
      ),
      pre,
    ],
    { dataCodeblock: '' }
  );
};

const visit = (node) => {
  node.children = node.children?.map((child) => {
    if (child.type === 'element' && child.tagName === 'pre') return wrap(child);
    visit(child);
    return child;
  });
};

export default function rehypeCodeBlock() {
  return (tree, file) => {
    if (file.path?.endsWith('.md')) visit(tree);
  };
}
