import Vue from 'vue';

import app from './components/app';
import store from './store/store';

import './styles/bootstrap.scss';
import './styles/vars.scss';


const vm = new Vue({
  store,
  el: '#app',
  components: {
    app
  }
});
