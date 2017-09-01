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

```html
<div class="c-tabs" data-butane-tabs>
  <ul class="c-tabs__list" data-butane-tablist>
    <li class="c-tabs__list-item" data-butane-tab="tab-1"><span>Tab 1</span></li>
    <li class="c-tabs__list-item" data-butane-tab="tab-2"><span>Tab 2</span></li>
    <li class="c-tabs__list-item" data-butane-tab="tab-3"><span>Tab 3</span></li>
    <li class="c-tabs__list-item" data-butane-tab="tab-4"><span>Tab 4</span></li>
  </ul>

  <section class="c-tabs__panel" id="tab-1" data-butane-tabpanel><h2>Tab 1 Content</h2></section>
  <section class="c-tabs__panel" id="tab-2" data-butane-tabpanel><h2>Tab 2 Content</h2></section>
  <section class="c-tabs__panel" id="tab-3" data-butane-tabpanel><h2>Tab 3 Content</h2></section>
  <section class="c-tabs__panel" id="tab-4" data-butane-tabpanel><h2>Tab 4 Content</h2></section>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
