<template>
  <div>
    <div>
      <div>{{ question.category }}</div>
      <div>
        <span v-for="i in question.difficulty">*</span>
        <span v-for="i in 3 - question.difficulty">-</span>
      </div>
    </div>
    <div>
      <span v-html="question.question"></span>
    </div>
    <div>
      <form>
        <span v-for="a in question.answers">
          <input v-model="answer"
                 type="radio"
                 :id="a.text"
                 @click="onAnswer(a.correct)"
                 :value="a.text">
          <label :for="a.text"
                 :class="{
                   'correct-answer': answer.length && a.correct,
                   'wrong-answer': answer.length && !a.correct && a.text === answer
                 }" >
            <span v-html="a.text"></span>
          </label>
        </span>
      </form>
      <div>
        <button @click="onAnswer('pass')">
          Pass
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as settings from '../settings';

  export default Vue.component('quizz-container', {
    data: () => ({answer: ''}),
    props: {
      question: Object
    },
    methods: {
      onAnswer(correct) {

        setTimeout(() => {
          this.$emit('onAnswer', correct);
        }, settings.ANSWER_RESOLUTION_DELAY)
      }
    },
    watch: {
      question() {
        this.answer = '';
      }
    },
    components: {}
  })
</script>

<style lang="scss">
  .correct-answer {
    color: green;
  }

  .wrong-answer {
    color: red;
  }
</style>