<template>
  <div>
    <ul>
      <li>good answers: {{correct}}</li>
      <li>bad answers: {{incorrect}}</li>
      <li>skipped questions: {{passed}}</li>
    </ul>
    <button @click="restart">Restart</button>
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

<style lang="scss"></style>