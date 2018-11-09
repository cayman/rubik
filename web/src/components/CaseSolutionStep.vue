<template>
  <span>
    <strong v-if="selected"> {{ stepCleared }} </strong>
    <span v-else> {{ step }} </span>
  </span>
</template>

<script>
  export default {
    name: 'case-solution-step',
    props: {
      step: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        required: true
      }
    },
    data (){
      return {
        clearing: /[*]{1}/i,
      }
    },
    computed:{
      stepCleared (){
        return this.step.replace(this.clearing,'');
      },
    }
  };
</script>

<style scoped>
  .note {
    font-style: italic;
  }
</style>
