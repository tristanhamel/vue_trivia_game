<template>
  <div class="board">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
      <defs>
        <filter id="brightness">
          <feComponentTransfer in="SourceGraphic" result="brightness-filter">
            <feFuncR type="linear" slope="0.5"></feFuncR>
            <feFuncG type="linear" slope="0.5"></feFuncG>
            <feFuncB type="linear" slope="0.5"></feFuncB>
          </feComponentTransfer>
        </filter>

        <pattern id="tiles-bg" x="0" y="0" patternUnits="userSpaceOnUse" height="102" width="102">
          <image x="0" y="0" xlink:href="https://www.transparenttextures.com/patterns/dust.png"></image>
        </pattern>
      </defs>

      <g v-for="(tile, i) in tiles">
        <path :class="[tile.className, i > score ? 'not-correct' : '']"
              :d="tile.d">
        </path>
        <path :d="tile.d"
              class="tile">
        </path>
      </g>

    </svg>
  </div>
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
      score: Number,
      length: Number
    },
    mounted() {
//      this.tiles = Array.from(this.$el.getElementsByClassName('tile'));
      const board = boardGenerator(this.length);
      this.tiles = board.tiles;
      this.viewBox = board.viewBox;
    },
    computed: {
      classObject(tile, i) {
        return {
          'tile': true,
          [tile.className]: true,
          'not-correct': i > this.score
        };
      }
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
    fill: url(#tiles-bg);
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
    fill: gray;
    /*filter: url(#brightness);*/
  }
</style>