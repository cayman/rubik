<template>
  <div>
    <span class="step" v-for="(step, index) in steps" @click="setStep(index)">
      <case-solution-step :step="step" :selected="selected" ></case-solution-step>
    </span><br v-if="solution.note && steps.length>3"/>
    <span class="note" v-if="solution.note" >{{ solution.note }}</span>
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

<style scoped>

</style>