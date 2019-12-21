import Component from "./component.js";
import store from "./store/index.js";
import link from "./link.js";

import api from "./api.js";
import { validToken } from "./api.js"


export default class SignUpComponent extends Component {
  constructor(app, settings) {
    const signUp = document.getElementById('signUp').content.cloneNode(true);

    app.appendChild(signUp);
    super(
      store, 
      app
    );
    
    app.querySelector('#signUpBtn').addEventListener('click', (event) => {
      const validForm = app.querySelector('#createAccountForm').checkValidity();

      if (validForm) {
        api.register()
          .then(res => api.authCheck(res))
          .then(res =>  res ? link(settings.redirect) : console.log('You need valid email and password!')) 
      }
      
    });

    document.querySelector('#signInLink').addEventListener('click', () => {  
      window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'login'}}));
    });
  }

  render() {
    console.log('SignUp render');
  }
}