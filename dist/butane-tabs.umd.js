(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneTabs = factory());
}(this, (function () { 'use strict';

var keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var MightyTabs = function () {
  function MightyTabs(selector) {
    classCallCheck(this, MightyTabs);

    this.tabContainer = document.querySelector(selector);
    this.tabList = this.tabContainer.querySelector('[data-butane-tablist]');
    this.tabs = this.tabContainer.querySelectorAll('[data-butane-tab]');
    this.tabPanels = this.tabContainer.querySelectorAll('[data-butane-tabpanel]');
    this.firstTab = this.tabs[0];
    this.lastTab = this.tabs[this.tabs.length - 1];
    this.activeTab = this.tabList.querySelector('.is-active') || this.firstTab;

    console.log(this.tabs);

    if (!this.tabList) {
      throw new Error('No tablist found');
    }

    if (!this.tabs) {
      throw new Error('No tabs found');
    }

    if (!this.tabPanels) {
      throw new Error('No tab panels found');
    }

    this.getPanel = this.getPanel.bind(this);
    this.setActivePanel = this.setActivePanel.bind(this);
    this.bindKeyPress = this.bindKeyPress.bind(this);

    this.init();
  }

  createClass(MightyTabs, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.tabList.setAttribute('role', 'tablist');

      this.tabs.forEach(function (tab) {
        var isActiveTab = tab === _this.activeTab;
        _this.activeTab.classList.add('is-active');
        tab.tabIndex = isActiveTab ? 0 : -1;
        tab.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
        tab.setAttribute('aria-controls', tab.getAttribute('data-butane-tab'));
      });

      this.tabPanels.forEach(function (tabPanel) {
        tabPanel.setAttribute('role', 'tabpanel');

        if (tabPanel !== _this.activeTab) {
          tabPanel.setAttribute('aria-hidden', true);
        }
      });

      this.setActivePanel(this.activeTab);

      this.tabContainer.addEventListener('keydown', this.bindKeyPress);
    }
  }, {
    key: 'getPanel',
    value: function getPanel(x) {
      var panelId = x.getAttribute('aria-controls');
      return this.tabContainer.querySelector('#' + panelId);
    }
  }, {
    key: 'setActivePanel',
    value: function setActivePanel(x) {
      var y = this.getPanel(x);

      this.tabPanels.forEach(function (tabPanel) {
        if (tabPanel !== y) {
          tabPanel.setAttribute('aria-hidden', true);
        }
      });

      y.setAttribute('aria-hidden', false);
    }
  }, {
    key: 'bindKeyPress',
    value: function bindKeyPress(e) {
      var which = e.which;
      var target = e.target;
      var firstTabActive = target === this.firstTab;
      var lastTabActive = target === this.lastTab;
      var nextTab = target.nextElementSibling;
      var previousTab = target.previousElementSibling;

      switch (which) {
        case keyCodes.rightArrow:
          target.setAttribute('tabindex', -1);
          target.setAttribute('aria-selected', false);
          target.classList.remove('is-active');

          if (lastTabActive) {
            this.firstTab.focus();
            this.firstTab.setAttribute('tabindex', 0);
            this.firstTab.setAttribute('aria-selected', true);
            this.firstTab.classList.add('is-active');
            this.setActivePanel(this.firstTab);
          } else {
            nextTab.focus();
            nextTab.setAttribute('tabindex', 0);
            nextTab.setAttribute('aria-selected', true);
            nextTab.classList.add('is-active');
            this.setActivePanel(nextTab);
          }
          break;
        case keyCodes.leftArrow:
          target.setAttribute('tabindex', -1);
          target.setAttribute('aria-selected', false);
          target.classList.remove('is-active');

          if (firstTabActive) {
            this.lastTab.focus();
            this.lastTab.setAttribute('tabindex', 0);
            this.lastTab.setAttribute('aria-selected', true);
            this.lastTab.classList.add('is-active');
            this.setActivePanel(this.lastTab);
          } else {
            previousTab.focus();
            previousTab.setAttribute('tabindex', 0);
            previousTab.setAttribute('aria-selected', true);
            previousTab.classList.add('is-active');
            this.setActivePanel(previousTab);
          }
          break;
      }
    }
  }]);
  return MightyTabs;
}();

return ButaneTabs;

})));
