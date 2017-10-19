<template>
  <div>
    <statusBar v-if="stage !== 'start'"
               :questionCount="questionCount"
               :score="score"
               @onRestart="reset">
    </statusBar>
    <start-menu :difficulty="difficulty"
                :length="length"
                @onSetDifficulty="setDifficulty"
                @onSetLength="setLength"
                @onStart="nextStage"
                v-if="stage === 'start'">
    </start-menu>
    <quizz-container :question="getCurrentQuestion"
                     :difficulty="difficulty"
                     :length="length"
                     v-if="getCurrentQuestion && stage === 'play'"
                     @onAnswer="onAnswer">
    </quizz-container>
    <end-view :correct="getRightQuestionsCount"
              :incorrect="getWrongQuestionsCount"
              :passed="getPassedQuestionsCount"
              @onRestart="reset"
              v-if="stage === 'end'">
    </end-view>
    <board :score="score"
           :length="length"
           v-if="stage !== 'start'">
    </board>
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
        length: state => state.game.max,
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
        setDifficulty: mutations.GAME_SET_DIFFICULTY,
        setLength: mutations.GAME_SET_LENGTH
      })
    },
    created() {
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
