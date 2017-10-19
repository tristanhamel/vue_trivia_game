<template>
  <div class="board">
    <div class="viewbox-container">
      <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" class="view-box">
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

        <g v-for="(tile, i) in tiles"
           :class="{correct: i > score}">
          <path :class="['tile-bg', tile.className, i > score ? 'not-correct' : '']"
                :d="tile.d">
          </path>
          <path :d="tile.d"
                class="tile">
          </path>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import boardGenerator from '../services/board-generator';
  import * as settings from '../settings';

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
      const board = boardGenerator(this.length);
      this.viewBox = board.viewBox.join(' ');

      addTile(0, this.tiles);

      // add tiles one by one for smooth transition effect
      function addTile(i, ar) {
        ar.push(board.tiles[i]);
        if(i < board.tiles.length -1) {
          setTimeout(() => addTile(i + 1, ar), settings.TILES_STAGGER_DELAY);
        }
      }
    },
    computed: {
      classObject(tile, i) {
        return {
          'tile': true,
          [tile.className]: true,
          'not-correct': i > this.score
        };
      },
    }
  });

</script>

<style lang="scss">
  @import '../styles/vars.scss';

  .board {
    height: calc(100vh - 50px);
    overflow: hidden;
  }

  .viewbox-container {
    height: 100%;
  }

  .view-box {
    display: block;
    height: 100%;
    margin: 0 auto;
    width: 100%;
  }

  .tile {
    animation: highlight 1s;
    fill: url(#tiles-bg);
  }

  .tile-bg {
    animation: highlight 1s;
    transition: all 0.3s;
  }

  .fill0 {
    fill: $color1;
  }
  .fill1 {
    fill: $color2;
  }
  .fill2 {
    fill: $color3;
  }
  .fill3 {
    fill: $color4;
  }
  .fill4 {
    fill: $color5;
  }

  .not-correct {
    fill: gray;
  }

  .correct {
  }

  @keyframes highlight {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>