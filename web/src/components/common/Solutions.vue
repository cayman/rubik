<template>
  <div>
    <template v-for="(solution, index) in solutions" >
      <hr v-if="index !== 0" :key="index + 'hr'"/>
      <solution @change="change" :key="index" :solution="solution"/>
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

<style scoped>
  .image {
    width: 130px;
    height: 130px;
  }
</style>
