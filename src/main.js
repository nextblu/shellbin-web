import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import feather from "vue-icon";
import vuetify from "./plugins/vuetify";
Vue.use(feather, "v-icon");

Vue.config.productionTip = false;

Vue.filter('date', function(value){
  if (!value) { return '(n/a)'; }
  value = new Date(value);
  return ((value.getDate() < 10) ? '0' : '') + value.getDate() + '/' + ((value.getMonth() < 9) ? '0' : '') + (value.getMonth() + 1) + '/' +
      value.getFullYear();
});

Vue.filter('datetime', function(value){
  if (!value) { return '(n/a)'; }
  value = new Date(value);
  return ((value.getDate() < 10) ? '0' : '') + value.getDate() + '/' + ((value.getMonth() < 9) ? '0' : '') + (value.getMonth() + 1) + '/' +
      value.getFullYear() + ' ' + value.getHours() + ':' + value.getMinutes();
});


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
