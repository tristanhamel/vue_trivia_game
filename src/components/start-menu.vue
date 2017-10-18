<template>
  <div class="start-menu">
    <h1 class="title">
      New Game
    </h1>

    <div class="start-menu-section">
      <h2 class="section-title">
        Difficulty
      </h2>
      <form class="start-menu-form">
        <span v-for="o in difficultyOptions"
              :class="['form-item', localDif === o ? 'active-option' : '']">
          <span class="form-item-icon">*</span>
          <input type="radio"
                 v-model="localDif"
                 :value="o"
                 :id="o"
                 @click="onSetDifficulty(o)">
          <label :for="o">{{o}}</label>
        </span>
      </form>
    </div>

    <div class="start-menu-section">
      <h2 class="section-title">
        Length
      </h2>
      <form class="start-menu-form">
        <span v-for="o in lengthOptions"
              :class="['form-item', localLength === o.n ? 'active-option' : '']">
          <span class="form-item-icon">*</span>
          <input type="radio"
                 v-model="localLength"
                 :value="o.n"
                 :id="o.text"
                 @click="onSetLength(o.n)">
          <label :for="o.text">{{o.text}}</label>
        </span>
      </form>
    </div>

    <div class="start-menu-section">
      <button @click="onStart"
              class="button">
        Start game
      </button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('start-menu', {
    data() { return {
      difficultyOptions: ['easy', 'medium', 'hard'],
      lengthOptions: [{n: 10, text: 'quicky'}, {n: 20, text: 'regular'}, {n: 30, text: 'epic'}],
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
    }
  });
</script>

<style lang="scss">
  @import '../styles/vars.scss';
  @import '../styles/mixins.scss';

  .start-menu {
    background-color: $background-color;
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
  }

  .start-menu-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .section-title {
    text-align: center;
    width: 100%;
  }

  .start-menu-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .start-menu-section:last-of-type {
    margin-top: 2rem;

    .button {
      font-size: 2rem;
    }
  }

  .form-item {
    padding: 0.2rem;

    @include hoverText;
  }

  .form-item-icon {
    visibility: hidden;
  }

  .active-option {
    color: $font-color-active;

    .form-item-icon {
      visibility: visible;
    }
  }
</style>