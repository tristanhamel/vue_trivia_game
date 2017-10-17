<template>
  <div>
    <statusBar v-if="stage === 'play'"
               :questionCount="questionCount"
               :score="score">
    </statusBar>
    <start-menu :difficulty="difficulty"
                @onSetDifficulty="setDifficulty"
                @onStart="nextStage"
                v-if="stage === 'start'">
    </start-menu>
    <quizz-container :question="getCurrentQuestion"
                     v-if="getCurrentQuestion && stage === 'play'"
                     @onAnswer="onAnswer">
    </quizz-container>
    <end-view :correct="getRightQuestionsCount"
              :incorrect="getWrongQuestionsCount"
              :passed="getPassedQuestionsCount"
              @onRestart="reset">
    </end-view>
    <board :score="score"></board>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

  import * as mutations from '../store/mutations-types';

  import statusBar from './statusBar.vue';
  import startMenu from './start-menu.vue';
  import quizzContainer from './quizz-container.vue';
  import board from './board.vue';
  import endView from './end-view.vue';

  export default {
    computed: {
      ...mapState({
        score: state => state.game.score,
        difficulty: state => state.game.difficulty,
        stage: state => state.game.stage,
        questionCount: state => state.questions.index + 1
      }),
      ...mapGetters([
        'getCurrentQuestion',
        'getRightQuestionsCount',
        'getWrongQuestionsCount',
        'getPassedQuestionsCount'
      ]),

    },
    methods: {
      ...mapActions(['boot', 'onAnswer', 'nextStage', 'reset']),
      ...mapMutations({
        setDifficulty: mutations.GAME_SET_DIFFICULTY
      })
    },
    created: function() {
      this.boot();
    },
    components: {
      statusBar,
      startMenu,
      quizzContainer,
      board,
      endView
    }
  }
</script>
