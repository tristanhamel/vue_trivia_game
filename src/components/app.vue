<template>
  <div>Hello there!</div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {return {}},
    components: {},
    methods: {
      ...mapActions(['boot'])
    },
    created: function() {
//      this.boot();
    }
  }
</script>
