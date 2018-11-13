import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import App from './components/App.vue'
import store from './store';
import router from './router';

Vue.filter('wrap', function (value) {
  if (!value) return ''
  return value.replace('(','')
})


new Vue({
  render: h => h(App),
  store,
  router,
  data: {}
}).$mount('#app');
