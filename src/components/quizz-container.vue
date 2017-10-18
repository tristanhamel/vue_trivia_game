<template>
  <div class="quizz-container">
    <div :class="{'quizz': true, 'cast-out': castOut, 'cast-in': !castOut}">
      <div class="quizz-info">
        <div>{{ question.category }}</div>
        <div>
          <span v-for="i in question.difficulty"><span class="fa-star-filled"></span></span>
          <span v-for="i in 3 - question.difficulty"><span class="fa-star-1"></span></span>
        </div>
      </div>
      <div class="question">
        <span v-html="question.question"></span>
      </div>
      <div>
        <form class="question-form">
          <span v-for="a in question.answers"
                :class="{
                  'form-item': true,
                  'answered': answer,
                  'answer': a.text === answer,
                  'correct-answer': answer.length && a.correct,
                  'wrong-answer': answer.length && !a.correct
                }">
            <span class="form-item-icon"><span class="fa-ok-outline"></span></span>
            <input v-model="answer"
                   type="radio"
                   :id="a.text"
                   @click="onAnswer(a.correct)"
                   :value="a.text">
            <label :for="a.text">
              <span v-html="a.text"></span>
            </label>
          </span>
        </form>
        <div class="quizz-pass"
             v-if="difficulty !== 'hard'">
          <button @click="onAnswer('pass')"
                  class="button">
            <span class="fa-cancel-outline"></span>
            <span>Pass</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as settings from '../settings';

  export default Vue.component('quizz-container', {
    data: () => ({
      answer: '',
      castOut: false
    }),
    props: {
      question: Object,
      difficulty: String
    },
    methods: {
      onAnswer(correct) {

        setTimeout(() => {
          this.$emit('onAnswer', correct);
          this.castOut = true;
        }, settings.ANSWER_RESOLUTION_DELAY)
      }
    },
    watch: {
      question() {
        this.answer = '';
        this.castOut = false;
      }
    },
    components: {}
  })
</script>

<style lang="scss">
  @import '../styles/vars.scss';
  @import '../styles/mixins.scss';
  @import '../styles/animations.scss';

  .quizz-container {
    bottom: 0;
    position: absolute;
    width: 100%;
  }

  .quizz {
    background: $background-color;
    border: 1px solid $background-color-lighter;
    border-radius: 10px;
    box-shadow: $shadow-color 0 0 20px 1px;
    bottom: 0;
    margin: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    width: calc(100% - 4rem);
  }

  .quizz-info {
    border-bottom: 1px solid $background-color-lighter;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;

    .fa-star-filled {
      color: $font-color-active;
    }
  }

  .question {
    margin-bottom: 1rem;
  }

  .question-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
  }
  .form-item {
    padding: 0.2rem;
    transition: all 0.1s;

    &:not(.answered) {
      @include hoverText;
     }
  }

  .form-item-icon {
    visibility: hidden;
  }

  .answer {
    transform: scale(1.1);

    .form-item-icon {
      visibility: visible;
    }
  }

  .correct-answer {
    color: $font-color-active;
    transform: scale(1.3);
    animation: zoomBounce 0.3s ease-in;
  }

  .wrong-answer {
    color: $font-color-inactive;
  }

  .quizz-pass {
    text-align: right;
  }

  .cast-in{
    animation: spawn 0.4s;
  }

  .cast-out {
    transition: transform 0.3s;
    transform: translate(-100%, -200%) rotate3d(0,0,1, -120deg)
  }
</style>