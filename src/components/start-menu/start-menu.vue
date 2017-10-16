<template>
  <div>
    <form>
      <span v-for="o in options">
        <input type="radio"
               v-model="localDif"
               :value="o"
               :id="o"
               @click="onSetDifficulty(o)">
        <label :for="o">{{o}}</label>
      </span>
    </form>
    <div>
      <button @click="onStart">Start game</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('start-menu', {
    data() { return {
      options: ['easy', 'medium', 'hard'],
      localDif: this.difficulty
    }},
    props: {
      difficulty: String
    },
    methods: {
      onSetDifficulty(difficulty) {
        this.$emit('onSetDifficulty', {difficulty})
      },
      onStart() {
        this.$emit('onStart')
      }
    }
  });
</script>

<style lang="scss">
</style>