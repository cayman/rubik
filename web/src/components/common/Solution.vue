<template>
  <div class="case-solution">
    <span class="case-solution__key" v-if="key">{{ key }}:</span>
    <template v-for="(step, index) in steps">
      <span class="case-solution__step" :key="index +'step'" @click="setStep(index)">
        <span v-if="index > 0">&nbsp;</span>
        <solution-step :step="step" :selected="selected" />
      </span>
    </template>
    <div v-if="solution.note" class="case-solution__notes" >
      <template v-for="(note, index) in notes" >
        <solution-link v-if="note.includes(groupCode)" class="case-solution__link"
                       :code="note" :key="index+'link'"/>
        <span v-else class="case-solution__note" :key="index+'note'">{{ note }}</span>
      </template>
    </div>
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
  @import "../../assets/var";
  .case-solution {
    padding: 0;
    &__key {
      color: $text-color-label;
      padding-right: 3px;
    }
    &__step {
      &:not(:last-child) {
        /*padding-right: 3px;*/
      }
    }
    &__notes {
      padding-top: 1px;
    }
    &__note, &__link {
      &:not(:last-child) {
        padding-right: 5px;
      }
      font-size: $font-size-smaller;
      font-family: $font-family-condensed;
      font-weight: $font-weight-lite;
      // font-style: italic;
      color: $text-color-note;
      white-space: nowrap;
    }
    &__link {
      color: $text-color-link
    }
  }
</style>
