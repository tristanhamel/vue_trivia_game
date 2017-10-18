import * as mutations from '../mutations-types';

export const game = {
  state: {
    score: 0,
    max: 3,
    difficulty: 'easy',
    stage: 'start',
    isUpdating: false
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
      state.max = 15;
      state.stage = 'start';
    },
    [mutations.GAME_SET_DIFFICULTY](state, {difficulty}) {
      state.difficulty = difficulty;
    },
    [mutations.GAME_SET_STAGE](state, {stage}) {
      state.stage = stage;
    },
    [mutations.GAME_UPDATING](state) {
      state.isUpdating = true;
    },
    [mutations.GAME_UPDATED](state) {
      state.isUpdating = false;
    },
    [mutations.GAME_SET_LENGTH](state, {length}) {
      state.max = length;
    }
  },
  actions: {

  }
};
