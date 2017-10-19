<template>
  <div class="end-view"
       v-if="!delayedStart">
    <div class="end-view-container">
      <h1 class="title">You won!</h1>
      <div class="end-view-section">
        <ul class="end-view-stats">
          <li>good answers: {{correct}}</li>
          <li>bad answers: {{incorrect}}</li>
          <li>skipped questions: {{passed}}</li>
        </ul>
      </div>
      <div class="end-view-section">
        <button @click="restart"
                class="button restart-button">Restart</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as settings from '../settings';

  export default Vue.component('end-vue', {
    data: () => ({
      delayedStart: true
    }),
    props: {
      correct: Number,
      incorrect: Number,
      passed: Number,
      length: Number
    },
    methods: {
      restart() {
        this.$emit('onRestart');
      }
    },
    mounted() {
      setTimeout(() => this.delayedStart = false, settings.TILES_STAGGER_DELAY * this.length)
    }
  });
</script>

<style lang="scss">
  @import '../styles/vars.scss';
  @import '../styles/animations.scss';

  .end-view {
    display: flex;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
  }

  .end-view-container {
    background: $background-color;
    border: 1px solid $background-color-lighter;
    border-radius: 5px;
    margin: 0 auto;
    padding: 2rem;

    animation: spawnBounce 0.5s ease-out;

    .title {
      margin-top: 0;
    }
  }

  .end-view-section {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .end-view-stats {
    margin-bottom: 2rem;

    li {
      font-size: 1.5rem;
      padding: 0.2rem;
    }
  }

  .restart-button {
    font-size: 2rem;
  }
</style>