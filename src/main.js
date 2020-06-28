import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Profile from './views/Profile'
import ExternalApi from './views/ExternalApi'
import Home from './views/Home'

import { domain, clientId, audience } from "../auth-config.json";
import { Auth0Plugin } from "./auth";
import { authGuard } from './auth/authGuard'

let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: "/", component: Home },
    { path: "/profile", component: Profile, beforeEnter: authGuard },
    { path: "/external-api", component: ExternalApi, beforeEnter: authGuard }
  ]
})

Vue.use(VueRouter)
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
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
