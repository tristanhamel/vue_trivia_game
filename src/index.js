import Vue from 'vue';

import app from './components/app';
import store from './store/store';

import './styles/global.scss';
import './assets/fontello-f97bb9b7/css/fontello.css';


const vm = new Vue({
  store,
  el: '#app',
  components: {
    app
  }
});
