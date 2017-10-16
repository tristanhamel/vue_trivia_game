<template>
  <div>
    <statusBar></statusBar>
    <board :score="score"></board>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  import statusBar from './status-bar/statusBar.vue';
  import board from './board/board.vue';

  export default {
    computed: {
      ...mapState({
        score: state => state.game.score
      })
    },
    methods: {
      ...mapActions(['boot'])
    },
    created: function() {
//      this.boot();
    },
    components: {
      statusBar,
      board
    }
  }
</script>
