import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Profile from './views/Profile'
import Home from './views/Home'

import { domain, clientId } from "../auth-config.json";
import { Auth0Plugin } from "./auth";
import { authGuard } from './auth/authGuard'

const routes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile, beforeEnter: authGuard}
]
let router = new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueRouter)
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
