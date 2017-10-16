<template>
  <div>
    <multiple-card :question="question"
                   @onAnswer="onAnswer"
                   v-if="question.type === 'multiple'">
    </multiple-card>
    <boolean-card :question="question"
                   @onAnswer="onAnswer"
                   v-if="question.type === 'boolean'">
    </boolean-card>
  </div>
</template>

<script>
  import Vue from 'vue';

  import multipleCard from './multiple-card.vue';
  import booleanCard from './boolean-card.vue';

  export default Vue.component('quizz-container', {
    props: {
      question: Object
    },
    methods: {
      onAnswer(correct) {
        this.$emit('onAnswer', correct);
      },
    },
    components: {
      multipleCard,
      booleanCard
    },
    beforeUpdate() {
      console.log(this.question);
    }
  })
</script>

<style lang="scss"></style>