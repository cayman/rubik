<template>
  <div class="case-solutions-edit">
    <div v-for="(solution, index) in solutions" :key="index" >
      <a class="action" @click="addSolution(index + 1)" title="Добавить">
        <i class="fa fa-plus" aria-hidden="true"/>
      </a>
      <a class="action" v-if="index > 0" @click="removeSolution(index)" title="Удалить">
        <i class="fa fa-minus" aria-hidden="true"/>
      </a>
      <solution-edit :key="index" :index="index" :solution="solution" @change="updateSolution"/>
    </div>
  </div>
</template>

<script>
  import SolutionEdit from './SolutionEdit';

  export default {
    components: {SolutionEdit},
    name: 'solutions-edit',
    props: {
      solutions: {
        type: Array,
        required: true
      }
    },
    methods: {
      addSolution (index) {
        const value = {alg: null, note: null};
        this.$store.commit('addSolution', {index, value});
      },
      removeSolution (index) {
        this.$store.commit('removeSolution', {index});
      },
      updateSolution ({index, value}) {
        this.$store.commit('updateSolution', {index, value });
      }
    }
  }
</script>

<style scoped>
  .case-solutions-edit {

  }
</style>
