import * as mutations from './mutations-types';
import { questionLoader } from '../services/question-loader';

export const boot = function({commit}) {
  // turn loading flag on
  commit(mutations.QUESTIONS_LOADING);

  // get questions from external api and save the results
  questionLoader()
    .then(res => {
      console.log(res);
      commit(mutations.QUESTIONS_LOADED);
    });
};

export const reset = function() {};

export const onAnswer = function() {};
