<template>
  <div class="status-bar">
    <button @click="OnRestart"
            class="button">
      <span class="fa-arrows-cw-outline"></span>
      <span>Restart</span>
    </button>
    <div class="stats">
      <div>questions: {{questionCount}}</div>
      <div>score: {{score}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      questionCount: Number,
      score: Number
    },
    methods: {
      OnRestart() {
        this.$emit('onRestart');
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/vars.scss';

  .status-bar {
    background: $background-color;
    border-bottom: 1px solid $shadow-color;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.5rem;
  }

  .stats {
    font-style: italic;
    font-weight: bold;
  }
</style>