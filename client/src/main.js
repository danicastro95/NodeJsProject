import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSocketIO from 'vue-socket.io';
import Notifications from 'vue-notification';

Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.use(new VueSocketIO({
  /* connection: 'localhost:3000' */
  connection: window.location.hostname
}));

const moment = require('moment')
require('moment/locale/es');

Vue.config.productionTip = false
Vue.use(require('vue-moment'), {
  moment
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');