import * as mutations from './mutations-types';
import { questionLoader } from '../services/question-loader';
import * as settings from '../settings';

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

export const reset = function({commit, dispatch}) {
  commit(mutations.QUESTIONS_RESET);
  commit(mutations.GAME_RESET);
  dispatch('boot');
};

export const onAnswer = function({commit, state, dispatch, getters}, correct) {
  function delay(t) {
    return new Promise(resolve => {
      setTimeout(resolve, t);
    });
  }

  function countDown(n, t) {
    return delay(t)
      .then(() => {
        correct ? commit(mutations.GAME_INCREASE_SCORE, {n: 1}) : commit(mutations.GAME_DECREASE_SCORE, {n: 1});
        n--;
        return n > 0 ? countDown(n, t) : delay(settings.NEXT_QUESTION_DELAY);
      });
  }

  // update score
  if(correct === true || (correct === false && state.game.difficulty === 'hard')) {
    let points = getters.getCurrentQuestion.difficulty;
    if(correct) {
      points = Math.min(points, state.game.max - state.game.score);
    }

    commit(mutations.GAME_UPDATING);
    countDown(points, settings.STAGGERING_DELAY)
      .then(() => {
        commit(mutations.GAME_UPDATED);
        commit(mutations.QUESTIONS_ON_ANSWER, {correct});

        // move on to next stage if the game is won
        if(state.game.score >= state.game.max) {
          dispatch('nextStage');
        }
      });
  } else {
    delay(settings.NEXT_QUESTION_DELAY)
      .then(() => commit(mutations.QUESTIONS_ON_ANSWER, correct));
  }

  // get more questions if we are running out
  if(state.questions.index < state.questions.items.length - 2) {
    dispatch('boot');
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