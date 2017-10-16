import Vuex from 'vuex';

import { questions } from './questions.module';
import { game } from './game.module';

const store = new Vuex.Store({
  modules: {
    questions,
    game
  }
});
