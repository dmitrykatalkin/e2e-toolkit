## `q` helper and custom selectors
We provide some syntax sugar for selectors with `q` helper.
This helper allows you to use shortcuts for `data-test-*` attributes
and provides a set of pseudo-selectors that abstracts some common-used but nasty selectors.

### `q` Helper
`q` helper has just one goal:
it recieves a pretty css-query with syntax sugar and returns a native css-query.
`q` helper is a [tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
which means it takes a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
as an argument and being called using special syntax:
```ts
q`here is our pretty selector`
```

### `data-test-id` attribute shortcut `%`
The very basic shortcut is a `data-test-id` attribute shortcut:
```ts
q`%foo` === '[data-test-id="foo"]'
```

### `data-test-*` attributes shortcut `%()`

You can also use other `data-test-*` attributes to reach elements with the next construction:
```ts
q`%(foo=bar,baz=qux)` === '[data-test-foo=bar][data-test-baz=qux]'
```
A good example of using such attributes is the `data-test-status` attribute of grids.
When you need to be sure if a grid has been populated by data you can do this (`%%` syntax explained below):
```ts
q`%%ag-grid=orders%(status=loaded)`
```

### Pseudo Selectors `%%`
In case you need to interact with **third-party components** that **cannot be tagged by `[data-test-id]`** you can use pseudo-selectors to reach elements.

Example:
```ts
const { q, r } = e2eHelpersFactory({
  pseudoSelectorMap: {
    'ag-grid': '.ag-grid',
    'ag-grid-filters-column': '[ref="eHeaderViewport"] .ag-header-row-floating-filter .ag-header-cell',
  }
});

cy.$get(q`%%ag-grid=orders %%ag-grid-filters-column:nth-child(1) input`).type(123)
```

