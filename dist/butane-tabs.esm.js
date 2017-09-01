const keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

class ButaneTabs {
  constructor(selector) {
    this.tabContainer = document.querySelector(selector);
    this.tabList = this.tabContainer.querySelector('[data-butane-tablist]');
    this.tabs = this.tabContainer.querySelectorAll('[data-butane-tab]');
    this.tabPanels = this.tabContainer.querySelectorAll('[data-butane-tabpanel]');
    this.firstTab = this.tabs[0];
    this.lastTab = this.tabs[this.tabs.length - 1];
    this.activeTab = this.tabList.querySelector('.is-active') || this.firstTab;

    if (!this.tabList) {
      throw new Error('No tablist found')
    }

    if (!this.tabs) {
      throw new Error('No tabs found')
    }

    if (!this.tabPanels) {
      throw new Error('No tab panels found')
    }

    this.getPanel = this.getPanel.bind(this);
    this.setActivePanel = this.setActivePanel.bind(this);
    this.bindKeyPress = this.bindKeyPress.bind(this);

    this.init();
  }

  init () {
    this.tabList.setAttribute('role', 'tablist');

    this.tabs.forEach(tab => {
      const isActiveTab = tab === this.activeTab;
      this.activeTab.classList.add('is-active');
      tab.tabIndex = isActiveTab ? 0 : -1;
      tab.setAttribute('aria-selected', isActiveTab ? 'true' : 'false');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', tab.getAttribute('data-butane-tab'));
    });

    this.tabPanels.forEach(tabPanel => {
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.setAttribute('aria-labelledby', tabPanel.id);

      if (tabPanel !== this.activeTab) {
        tabPanel.setAttribute('aria-hidden', true);
      }
    });

    this.setActivePanel(this.activeTab);

    this.tabContainer.addEventListener('keydown', this.bindKeyPress);
  }

  getPanel (x) {
    const panelId = x.getAttribute('aria-controls');
    return this.tabContainer.querySelector(`#${panelId}`)
  }

  setActivePanel (x) {
    const y = this.getPanel(x);

    this.tabPanels.forEach(tabPanel => {
      if (tabPanel !== y) {
        tabPanel.setAttribute('aria-hidden', true);
      }
    });

    y.setAttribute('aria-hidden', false);
  }

  bindKeyPress (e) {
    const which = e.which;
    const target = e.target;
    const firstTabActive = target === this.firstTab;
    const lastTabActive = target === this.lastTab;
    const nextTab = target.nextElementSibling;
    const previousTab = target.previousElementSibling;

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
        break
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
        break
    }
  }
}

export default ButaneTabs;
