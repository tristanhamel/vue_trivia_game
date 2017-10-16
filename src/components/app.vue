<template>
  <div>
    <statusBar></statusBar>
    <quizz-container :question="getCurrentQuestion"
                     v-if="getCurrentQuestion">
    </quizz-container>
    <board :score="score"></board>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  import statusBar from './status-bar/statusBar.vue';
  import quizzContainer from './quizz/quizz-container.vue';
  import board from './board/board.vue';

  export default {
    computed: {
      ...mapState({
        score: state => state.game.score
      }),
      ...mapGetters([
        'getCurrentQuestion'
      ])
    },
    methods: {
      ...mapActions(['boot'])
    },
    created: function() {
      this.boot();
    },
    components: {
      statusBar,
      quizzContainer,
      board
    }
  }
</script>
