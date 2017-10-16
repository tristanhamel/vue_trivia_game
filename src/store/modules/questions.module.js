import * as mutations from '../mutations-types';

export const questions = {
  state: {
    isQuestionsLoading: false,
    items: [],
    index: 0,
    rightAnswers: [],
    wrongAnswers: []
  },
  mutations: {
    [mutations.QUESTIONS_INCREMENT_INDEX](state) {
      state.index++;
    },
    [mutations.QUESTIONS_ADD](state, {newQuestions}) {
      state.questions = [...state.questions, ...newQuestions];
    },
    [mutations.QUESTIONS_LOADING](state) {
      state.isQuestionsLoading = true;
    },
    [mutations.QUESTIONS_LOADED](state) {
      state.isQuestionsLoading = false;
    },
    [mutations.QUESTIONS_ON_ANSWER](state, {correct}) {
      correct ? state.rightAnswers.push(state.index) : state.wrongAnswers.push(state.index);
      state.index++;
    },
    [mutations.QUESTIONS_RESET](state) {
      state = {
        isQuestionsLoading: false,
        items: [],
        index: 0,
        rightAnswers: [],
        wrongAnswers: []
      };
    }
  },
  actions: {},
  getters: {
    getCurrentQuestion: state => state.items[state.index],
    getRightAnswers: state => state.items.filter((item, i) => state.rightAnswers.includes(i)),
    getWrongAnswers: state => state.items.filter((item, i) => state.wrongAnswers.includes(i)),
  }
};
