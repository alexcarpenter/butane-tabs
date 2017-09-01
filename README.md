# Butane Tabs

[![butane-tabs on NPM](https://img.shields.io/npm/v/butane-tabs.svg?style=flat-square)](https://www.npmjs.com/package/butane-tabs) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> Accessible tab interface JS library.

## Install

Install butane-tabs, and add it to your `package.json` dev dependencies.

```
$ npm install butane-tabs --save-dev
```

Then `import` it into the file where you'll use it.

```es6
import ButaneTabs from 'butane-tabs'
```

## Instantiate

```js
// instantiate single tab interface
const tab = document.querySelector('[data-butane-tab]')
new ButaneTabs(tab)

// or instantiate multiple tabs
const allTabs = document.querySelectorAll('[data-butane-tabs]')
allTabs.forEach(tab => {
  new ButaneTabs(tab)
})
```

## Expected DOM structure

Below is the minimum required elements and attributes needed. An additional styling layer is also required to show/hide tab panels via the `aria-hidden` attribute. There are some basic example styles within `docs/styles.css` for reference.

```html
<div data-butane-tabs>
  <ul aria-label="Code documentation example" data-butane-tablist>
    <li data-butane-tab="tab-1">HTML</li>
    <li data-butane-tab="tab-2">CSS</li>
    <li data-butane-tab="tab-3">JS</li>
  </ul>

  <section id="tab-html" data-butane-tabpanel>HTML Content</section>
  <section id="tab-css" data-butane-tabpanel>CSS Content</section>
  <section id="tab-js" data-butane-tabpanel>JS Content</section>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
