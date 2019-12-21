import Component from "./component.js";
import store from "./store/index.js";
import link from "./link.js";
// import login from "./api/login.js";
// import authCheck from "./api/authCheck.js";
import api from "./api.js";
import { validToken } from "./api.js"


export default class LoginComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById('login').content.cloneNode(true);
    // const app = document.getElementById('app');
    app.appendChild(template);
    super(
      store, 
      app
    );


    app.querySelector('#signIn').addEventListener('click', () => {
      api.login()
        .then(res => api.authCheck(res))
        .then(res =>  res ? link(settings.redirect) : alert('You need valid email and password!'))   
      
      //window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'list'}}));
    });

    app.querySelector('#signUpLink').addEventListener('click', () => {
      link(settings.signup);

      // window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'signUp'}}));
    });
  }

  render() {
    console.log('login render');
  }
}