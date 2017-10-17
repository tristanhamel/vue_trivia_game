<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
    <filter id="brightness">
      <feComponentTransfer in="SourceGraphic" result="brightness-filter">
        <feFuncR type="linear" slope="0.5"></feFuncR>
        <feFuncG type="linear" slope="0.5"></feFuncG>
        <feFuncB type="linear" slope="0.5"></feFuncB>
      </feComponentTransfer>
    </filter>
    <path v-for="tile in tiles" :d="tile.d" :class="tile.className + ' not-correct'"></path>
  </svg>
</template>

<script>
  import Vue from 'vue';
  import boardGenerator from '../services/board-generator';

  export default Vue.component('board', {
    data: () => ({
      tiles: [],
      viewBox: '0 0 0 0'
    }),
    props: {
      score: Number
    },
    mounted() {
//      this.tiles = Array.from(this.$el.getElementsByClassName('tile'));
      const board = boardGenerator(20);
      this.tiles = board.tiles;
      this.viewBox = board.viewBox;
    },
    watch: {
      score(score) {
//        this.tiles
//          .forEach((t, i) => {
//            i <= score ? t.classList.remove('not-correct') : t.classList.add('not-correct');
//          });
      }

    }
  });
</script>

<style lang="scss">
  .tile {
  }

  .fill0 {
    fill: yellow;
  }
  .fill1 {
    fill: green;
  }
  .fill2 {
    fill: red;
  }
  .fill3 {
    fill: blue;
  }
  .fill4 {
    fill: darkviolet;
  }

  .not-correct {
    filter: url(#brightness);
  }
</style>