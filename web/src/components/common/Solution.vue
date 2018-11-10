<template>
  <div class="case-solution">
    <template v-for="(step, index) in steps">
      <span class="case-solution__step" :key="index" @click="setStep(index)">
        <solution-step :step="step" :selected="selected" />
      </span>
    </template>
    <br v-if="solution.note && steps.length>10"/>
    <span class="case-solution__note" v-if="solution.note" >{{ solution.note }}</span>
  </div>
</template>

<script>
  import SolutionStep from './SolutionStep';

  export default {
    components: {SolutionStep},
    name: 'solution',
    props:{
      solution: {
        type: Object,
        required: true
      }
    },
    computed: {
      alg (){
        return this.solution.alg || '';
      },
      steps (){
        return this.alg.split(' ');
      },
      selected (){
        return !!this.solution.key;
      },
    },
    methods: {
      setStep (num){
        const algorithm = this.steps.reduce((steps,step,index) => index > num ? steps: steps.concat(step), []);
        console.log('change', algorithm);
        this.$emit('change', algorithm );
      }
    }
  }
</script>

<style lang="scss" scoped>
  .case-solution {
    &__step {

    }
    &__note {
      font-style: italic;
    }
  }
</style>
