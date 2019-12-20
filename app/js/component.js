import store from './store/index.js';

export default class Component {
  constructor(store, anchor) {
    this.anchor = anchor;
    this._render = this.render.bind(this);
    store.events.subscribe('change', this._render);
  }

  onDestroy() {
    store.events.unsubscribe('change', this._render);
    document.getElementById('app').innerHTML = '';
  }

}