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
      {{ question.question }}
    </div>
    <div>
      <form>
        <span v-for="a in question.answers">
          <input v-model="answer"
                 type="radio"
                 :id="a.text"
                 @click="onAnswer(a.correct)"
                 :value="a.text">
          <label :for="a.text">
            {{ a.text }}
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

  export default Vue.component('quizz-container', {
    data: () => ({answer: ''}),
    props: {
      question: Object
    },
    methods: {
      onAnswer(correct) {
        this.$emit('onAnswer', correct);
      },
    },
    components: {},
    beforeUpdate() {
//      this.answer = '';
    }
  })
</script>

<style lang="scss"></style>