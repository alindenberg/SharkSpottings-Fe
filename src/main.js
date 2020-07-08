import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Custom Auth Config
import { domain, clientId, audience } from "../auth-config.json";
import { Auth0Plugin } from "./auth";
import { authGuard } from './auth/authGuard'
// Components 
import App from './App.vue'
import Profile from './views/Profile'
import CreateSighting from './views/CreateSighting'
import ExternalApi from './views/ExternalApi'
import Home from './views/Home'

let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: "/", component: Home },
    { path: "/create-sighting", component: CreateSighting, beforeEnter: authGuard },
    { path: "/profile", component: Profile, beforeEnter: authGuard },
    { path: "/external-api", component: ExternalApi, beforeEnter: authGuard }
  ]
})
let authOptions = {
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
}

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Auth0Plugin, authOptions);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
