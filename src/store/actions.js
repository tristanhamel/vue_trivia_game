import * as mutations from './mutations-types';
import { questionLoader } from '../services/question-loader';

const difficulties = {
  easy: 1,
  medium: 2,
  hard: 3
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAnswersArray(q) {
  return shuffle([
    {correct: true, text: q.correct_answer},
    ...q.incorrect_answers.map(a => ({correct: false, text: a}))
  ]);
}

function questionsParser(questions) {
  return questions.map(q => ({
    ...q,
    difficulty: difficulties[q.difficulty],
    answers: getAnswersArray(q)
  }));
}

export const boot = function({commit}) {
  // turn loading flag on
  commit(mutations.QUESTIONS_LOADING);

  // get questions from external api, parse and save the results
  questionLoader()
    .then(res => {
      commit(mutations.QUESTIONS_LOADED);
      commit(mutations.QUESTIONS_ADD, {newQuestions: questionsParser(res.data.results)});
    });
};

export const reset = function() {};

export const onAnswer = function() {};
