import Component from "./component.js";
import store from "./store/index.js";
import link from "./link.js";

export default class LoginComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById('login').content.cloneNode(true);
    //const app = document.getElementById('app');
    app.appendChild(template);
    super(
      store, 
      app
    );
    app.querySelector('#signIn').addEventListener('click', () => {
      //console.log(settings.redirect)
      link(settings.redirect);
      //window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'list'}}));
    });
  }

  render() {
    console.log('login render');
  }
}