<template>
  <div class="case-solution">
    <span class="case-solution__key" v-if="key">{{ key }}:</span>
    <template v-for="(step, index) in steps">
      <span class="case-solution__step" :key="index +'step'" @click="setStep(index)">
        <solution-step :step="step" :selected="selected" />
      </span>
    </template>
    <br v-if="solution.note"/>
    <template v-for="(note, index) in notes" >
      <solution-link v-if="note.includes(groupCode)" class="case-solution__link"
                     :code="note" :key="index+'link'"/>
      <span v-else class="case-solution__note" :key="index+'note'">{{ note }}</span>
    </template>
  </div>
</template>

<script>
  import SolutionStep from './SolutionStep';
  import SolutionLink from './SolutionLink';

  export default {
    components: {SolutionStep, SolutionLink},
    name: 'solution',
    props:{
      solution: {
        type: Object,
        required: true
      }
    },
    computed: {
      groupCode() {
        return this.$store.state.group.model.code || this.$store.state.case.model.groupCode;
      },
      alg (){
        return this.solution.alg || '';
      },
      key (){
        return this.solution.key;
      },
      steps (){
        return this.alg.split(' ');
      },
      notes (){
        return !this.solution.note ?  []
          : this.solution.note.split(' ').map(n => n.trim()).filter(n => n.length > 0);
      },
      selected (){
        return !!this.solution.selected;
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
    &__key {
      color: slategray;
      font-weight: 600;
    }
    &__step {

    }
    &__note {
      font-style: italic;
      color: slategray;
      padding-left: 2px;
      white-space: nowrap;
      font-size: 11px;
    }
    &__link {
      font-style: italic;
      padding-left: 2px;
      white-space: nowrap;
      font-size: 10px;
    }
  }
</style>
