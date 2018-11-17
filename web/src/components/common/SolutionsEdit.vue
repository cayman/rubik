<template>
  <div class="case-solutions-edit">
    <div class="case-solutions-edit__item" v-for="(solution, index) in solutions" :key="index" >

      <a class="action" @click="recognizeSolution(index)" title="Распознать">
        <i class="fa fa-info" aria-hidden="true"/>
      </a>
      <a class="action" @click="parenthesesSolution(index)" title="Разделитель">
        <i class="fa fa-code" aria-hidden="true"/>
      </a>
      <a class="action" @click="addSolution(index + 1)" title="Добавить">
        <i class="fa fa-plus" aria-hidden="true"/>
      </a>
      <a class="action" v-if="index > 0" @click="removeSolution(index)" title="Удалить">
        <i class="fa fa-minus" aria-hidden="true"/>
      </a>
      <a class="action" v-if="index < solutions.length - 1" @click="moveDownSolution(index)" title="Вниз">
        <i class="fa fa-arrow-down" aria-hidden="true"/>
      </a>
      <a class="action" v-if="index > 0" @click="moveUpSolution(index)" title="Вверх">
        <i class="fa fa-arrow-up" aria-hidden="true"/>
      </a>
      <solution-edit :index="index" :solution="solution" @change="updateSolution"/>
    </div>
  </div>
</template>

<script>
  import SolutionEdit from './SolutionEdit';
  import {parentheses, recognize} from "../../util";

  export default {
    components: {SolutionEdit},
    name: 'solutions-edit',
    props: {
      solutions: {
        type: Array,
        required: true
      }
    },
    computed: {
      patterns () {
        return this.$store.state.patterns.list;
      }
    },
    methods: {
      addSolution (index) {
        const value = {alg: null, note: null, selected: false, key: null};
        this.$store.commit('addSolution', {index, value});
      },
      removeSolution (index) {
        this.$store.commit('removeSolution', {index});
      },
      updateSolution ({index, value}) {
        this.$store.commit('updateSolution', {index, value });
      },
      moveUpSolution(index) {
        this.$store.commit('moveBackSolution', {index});
      },
      moveDownSolution(index) {
        this.$store.commit('moveForwardSolution', {index});
      },
      parenthesesSolution (index) {
        const alg = parentheses(this.solutions[index].alg);
        this.$store.commit('updateSolution', {index, value: {alg} });
      },
      recognizeSolution(index) {
        const note = recognize(this.solutions[index].alg, this.patterns);
        this.$store.commit('updateSolution', {index, value: {note} });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .case-solutions-edit {
    &__item {
      padding: 3px;
      margin-top: 2px;
      background-color: mintcream;
    }
  }
</style>
