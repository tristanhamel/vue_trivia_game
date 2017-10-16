import * as mutations from '../mutations-types';

export const game = {
  state: {
    score: 0,
    max: 33,
    difficulty: 'easy',
    stage: 'start'
  },
  mutations: {
    [mutations.GAME_INCREASE_SCORE](state, {n}) {
      state.score = (state.score + n) > state.max ? state.max : state.score + n;
    },
    [mutations.GAME_DECREASE_SCORE](state, {n}) {
      state.score = (state.score -n) < 0 ? 0 : state.score - n;
    },
    [mutations.GAME_RESET](state) {
      state.score = 0;
      state.stage = 'start';
    },
    [mutations.GAME_SET_DIFFICULTY](state, {difficulty}) {
      state.difficulty = difficulty;
    },
    [mutations.GAME_SET_STAGE](state, {stage}) {
      state.stage = stage;
    }
  },
  actions: {

  }
};
