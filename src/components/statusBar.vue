<template>
  <div>
    <button @click="OnRestart">
      Restart
    </button>
    <div>
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
</style>