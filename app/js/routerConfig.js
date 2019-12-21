import ListComponent from "./ListComponent.js";
import LoginComponent from "./LoginComponent.js";
import SignUpComponent from "./SignUpComponent.js";
import store from "./store/index.js";


export default {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginComponent,
    settings: {
      redirect: 'list',
      signup: 'signUp'
      //handelLogIn: () => store.dispatch('login'),
    }
  },
  'signUp': {
    data: { route: 'signUp' },
    url: 'signUp',
    component: SignUpComponent,
    settings: {
      redirect: 'list'
      //handelLogIn: () => store.dispatch('signUp'),
    }
  },
  'list': {
    data: { route: 'list' },
    url: 'list',
    component: ListComponent,
    settings: {
      redirect: 'login'
    }
  }
}