import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSocketIO from 'vue-socket.io';
/* import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview); */

Vue.use(BootstrapVue);

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:3000'
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