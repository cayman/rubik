<template>
  <div class="case-solution">
    <template v-for="(step, index) in steps">
      <span class="case-solution__step" :key="index" @click="setStep(index)">
        <case-solution-step :step="step" :selected="selected" ></case-solution-step>
      </span>
    </template>
    <br v-if="solution.note && steps.length>10"/>
    <span class="case-solution__note" v-if="solution.note" >{{ solution.note }}</span>
  </div>
</template>

<script>
  import CaseSolutionStep from './CaseSolutionStep';

  export default {
    components: {CaseSolutionStep},
    name: 'case-solution',
    props:{
      solution: {
        type: Object,
        required: true
      }
    },
    computed: {
      alg (){
        return this.solution.alg;
      },
      steps (){
        return this.alg.split(' ');
      },
      selected (){
        return this.alg.indexOf('*') >= 0;
      },
    },
    methods: {
      setStep (num){
        const algorithm = this.steps.reduce((steps,step,index) => index > num ? steps: steps.concat(step), []);
        console.log('set', this.setupSteps, 'steps', algorithm);
        this.$emit('steps', algorithm );
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
