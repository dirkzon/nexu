import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
// import "roboto-fontface/css/roboto/roboto-fontface.css";
// import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.filter('truncate', function (text: string, stop: number, clamp: number) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
