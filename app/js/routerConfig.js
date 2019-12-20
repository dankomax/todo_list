import ListComponent from "./ListComponent.js";
import LoginComponent from "./LoginComponent.js";
import store from "./store/index.js";


export default {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginComponent,
    settings: {
      redirect: 'list'
      //handelLogIn: () => store.dispatch('login'),
    }
  },
  'list': {
    data: { route: 'list' },
    url: 'list',
    component: ListComponent,
    settings: {}
  }
}