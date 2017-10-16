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

export const onAnswer = function({commit, state, dispatch}, correct) {
  commit(mutations.QUESTIONS_ON_ANSWER, correct);

  // get more questions if we are running out
  if(state.questions.index < state.questions.items.length - 2) {
    dispatch('boot');
  }

  // move on to next stage if the game is won
  if(state.game.score >= state.game.max) {
    dispatch('nextStage');
  }
};

export const nextStage = function({commit, state}) {
  if(state.game.stage === 'start') {
    commit(mutations.GAME_SET_STAGE, {stage: 'play'});
  } else if (state.game.stage === 'play') {
    commit(mutations.GAME_SET_STAGE, {stage: 'end'});
  } else {
    commit(mutations.GAME_RESET);
    commit(mutations.QUESTIONS_RESET);
  }
};