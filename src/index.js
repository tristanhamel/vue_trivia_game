import Vue from 'vue';
import Vuex from 'vuex';
import app from './components/app';

import './styles/bootstrap.scss';
import './styles/vars.scss';

Vue.use(Vuex);

const vm = new Vue({
  el: '#app',
  components: {
    app
  }
});
