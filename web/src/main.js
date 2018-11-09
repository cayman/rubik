import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import App from './components/App.vue'
import store from './store';


new Vue({
  render: h => h(App),
  store,
  data: {
  }
}).$mount('#app');
