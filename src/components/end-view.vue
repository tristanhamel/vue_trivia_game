<template>
  <div class="end-view">
    <div class="end-view-container">
      <h1 class="title">You won!</h1>
      <div class="end-menu-section">
        <ul class="stats">
          <li>good answers: {{correct}}</li>
          <li>bad answers: {{incorrect}}</li>
          <li>skipped questions: {{passed}}</li>
        </ul>
      </div>
      <div class="end-menu-section">
        <button @click="restart"
                class="button restart-button">Restart</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.component('end-vue', {
    props: {
      correct: Number,
      incorrect: Number,
      passed: Number
    },
    methods: {
      restart() {
        this.$emit('onRestart');
      }
    }
  });
</script>

<style lang="scss">
  .end-view {
    display: flex;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
  }

  .end-view-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .title {
      margin-top: 0;
    }
  }

  .end-menu-section {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .stats {
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