<template>
  <div class="solutions">
    <template v-for="(solution, index) in solutions" >
      <solution class="solutions__item" @change="change" :key="index" :solution="solution"/>
    </template>
  </div>
</template>

<script>
  import Solution from './Solution';

  export default {
    components: { Solution },
    name: 'solutions',
    props: {
      solutions: {
        type: Array,
        required: true
      }
    },
    methods:{
      change (algorithm){
        this.$emit('change',  algorithm.join(' '));
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var";
  .solutions {
      &__item {
        &:not(:first-child) {
          border-top: $line-base;
        }
        padding: 3px 0 1px 0;
      }
  }
</style>
