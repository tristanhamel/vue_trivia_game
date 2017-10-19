<template>
  <div class="start-menu-container">
    <div class="start-menu">
      <h1 class="title">
        New Game
      </h1>

      <div class="start-menu-section">
        <h2 class="section-title">
          Difficulty
        </h2>
        <form class="start-menu-form">
          <div v-for="o in difficultyOptions"
               class="form-item">
            <div :class="['form-item-label-container', localDif === o.text ? 'active-option' : '']" >
              <span class="form-item-icon"><span class="fa-ok-outline"></span></span>
              <input type="radio"
                     v-model="localDif"
                     :value="o.text"
                     :id="o.text"
                     @click="onSetDifficulty(o.text)">
              <label :for="o.text"
                     class="form-item-label">
                {{o.text}}
              </label>
            </div>
          </div>
        </form>
        <div class="form-item-desc">
          {{difDesc}}
        </div>
      </div>

      <div class="start-menu-section">
        <h2 class="section-title">
          Length
        </h2>
        <form class="start-menu-form">
          <div v-for="o in lengthOptions"
                :class="['form-item', localLength === o.n ? 'active-option' : '']">
            <div class="form-item-label-container">
              <span class="form-item-icon"><span class="fa-ok-outline"></span></span>
              <input type="radio"
                     v-model="localLength"
                     :value="o.n"
                     :id="o.text"
                     @click="onSetLength(o.n)">
              <label :for="o.text"
                     class="form-item-label">
                {{o.text}}
              </label>
            </div>
          </div>
        </form>
      </div>

      <div class="start-menu-section">
        <button @click="onStart"
                class="button">
          Start game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('start-menu', {
    data() { return {
      difficultyOptions: [
        {text: 'easy', desc: 'Give yourself some slack! A wrong answer won\'t have consequences.'},
        {text: 'medium', desc: 'You can pass questions you are unsure about but you will be punished for wrong answers.'},
        {text: 'hard', desc: 'No error margin here!'}
      ],
      lengthOptions: [
        {n: 10, text: 'quicky'},
        {n: 20, text: 'regular'},
        {n: 30, text: 'epic'}
      ],
      localDif: this.difficulty,
      localLength: this.length
    }},
    props: {
      difficulty: String,
      length: Number
    },
    methods: {
      onSetDifficulty(difficulty) {
        this.$emit('onSetDifficulty', {difficulty})
      },
      onSetLength(length) {
        this.$emit('onSetLength', {length})
      },
      onStart() {
        this.$emit('onStart')
      }
    },
    computed: {
      difDesc() {
        return this.difficultyOptions.find(d => d.text === this.localDif).desc;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../styles/vars.scss';
  @import '../styles/mixins.scss';

  .start-menu-container {
    align-items: center;
    background-color: $background-color;
    display: flex;
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
  }

  .start-menu {
    border: 1px solid $background-color-lighter;
    border-radius: 5px;
    margin: 0 auto;
    max-width: calc(100vw - 3rem);
    padding: 1rem;
    width: 30rem;

  }

  .start-menu-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0 0 0;
  }

  .section-title {
    margin: 1rem 0 0 0;
    text-align: center;
    width: 100%;
  }

  .start-menu-form {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .start-menu-section:last-of-type {
    margin: 2rem 0 1rem 0;

    .button {
      font-size: 2rem;
    }
  }

  .form-item {
    padding: 0.2rem;
  }

  .form-item-icon {
    visibility: hidden;
  }

  .form-item-label-container {
    text-align: center;
    margin: 0.5rem 0 0.5rem -2rem;
  }

  .form-item-label {
    display: inline-block;
    font-size: larger;
    text-transform: capitalize;

    @include hoverText;
  }

  .form-item-desc {
    font-size: small;
    min-height: 2rem;
    text-align: center;
  }

  .active-option {
    color: $font-color-active;

    .form-item-icon {
      visibility: visible;
    }
  }
</style>