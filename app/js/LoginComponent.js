import Component from "./component.js";
import store from "./store/index.js";
import link from "./link.js";

import api from "./api.js";
import { validToken } from "./api.js"


export default class LoginComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById('login').content.cloneNode(true);
    app.appendChild(template);

    super(
      store, 
      app
    );


    app.querySelector('#signIn').addEventListener('click', () => {
      const validForm = app.querySelector('#loginForm').checkValidity();

      if (validForm) {
        api.login()
          .then(res => api.authCheck(res))
          .then(res =>  res ? link(settings.redirect) : alert('You need valid email and password!'))   
      }
      
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