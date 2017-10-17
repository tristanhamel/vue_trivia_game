import * as mutations from '../mutations-types';

export const questions = {
  state: {
    isQuestionsLoading: false,
    items: [],
    index: 0,
    rightQuestions: [],
    wrongQuestions: [],
    passedQuestions: []
  },
  mutations: {
    [mutations.QUESTIONS_INCREMENT_INDEX](state) {
      state.index++;
    },
    [mutations.QUESTIONS_ADD](state, {newQuestions}) {
      state.items = [...state.items, ...newQuestions];
    },
    [mutations.QUESTIONS_LOADING](state) {
      state.isQuestionsLoading = true;
    },
    [mutations.QUESTIONS_LOADED](state) {
      state.isQuestionsLoading = false;
    },
    [mutations.QUESTIONS_ON_ANSWER](state, {correct}) {
      console.log(correct);
      correct === 'pass' ? state.passedQuestions.push(state.index) :
        correct ? state.rightQuestions.push(state.index) :
          state.wrongQuestions.push(state.index);

      state.index++;
    },
    [mutations.QUESTIONS_RESET](state) {
      state = {
        isQuestionsLoading: false,
        items: [],
        index: 0,
        rightQuestions: [],
        wrongQuestions: [],
        passedQuestions: []
      };
    }
  },
  actions: {},
  getters: {
    getCurrentQuestion: state => state.items[state.index],
    getRightQuestions: state => state.items.filter((item, i) => state.rightQuestions.includes(i)),
    getWrongQuestions: state => state.items.filter((item, i) => state.wrongQuestions.includes(i)),
    getPassedQuestions: state => state.items.filter((item, i) => state.passedQuestions.includes(i)),
    getRightQuestionsCount: state => state.rightQuestions.length,
    getWrongQuestionsCount: state => state.wrongQuestions.length,
    getPassedQuestionsCount: state => state.passedQuestions.length
  }
};
