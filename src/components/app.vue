<template>
  <div>
    <statusBar></statusBar>
    <start-menu :difficulty="difficulty"
                @onSetDifficulty="setDifficulty"
                @onStart="nextStage"
                v-if="stage === 'start'">
    </start-menu>
    <quizz-container :question="getCurrentQuestion"
                     v-if="getCurrentQuestion && stage === 'play'"
                     @onAnswer="onAnswer">
    </quizz-container>
    <board :score="score"></board>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

  import * as mutations from '../store/mutations-types';

  import statusBar from './status-bar/statusBar.vue';
  import startMenu from './start-menu/start-menu.vue';
  import quizzContainer from './quizz/quizz-container.vue';
  import board from './board/board.vue';

  export default {
    computed: {
      ...mapState({
        score: state => state.game.score,
        difficulty: state => state.game.difficulty,
        stage: state => state.game.stage
      }),
      ...mapGetters([
        'getCurrentQuestion'
      ]),

    },
    methods: {
      ...mapActions(['boot', 'onAnswer', 'nextStage']),
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
      board
    }
  }
</script>
