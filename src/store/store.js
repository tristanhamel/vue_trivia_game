import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';

import { questions } from './modules/questions.module';
import { game } from './modules/game.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  modules: {
    questions,
    game
  }
});

export default store;