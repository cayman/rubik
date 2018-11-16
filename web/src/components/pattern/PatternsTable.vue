<template>
  <table class="patterns-table" border="1">
    <caption><span>{{ group }}</span>
      <a class="action" @click="addPattern" title="Добавить">
        <i class="fa fa fa-plus" aria-hidden="true"/>
      </a>
    </caption>
    <template v-for="(pattern, index) in sortedPatterns" >
      <tbody :key="index">
        <pattern-edit-row v-if="editing && model.id === pattern.id"/>
        <pattern-row v-else :pattern="pattern"/>
      </tbody>
    </template>
    <tfoot>
      <pattern-edit-row v-if="editing && !model.id && model.group === group"/>
    </tfoot>
  </table>
</template>

<script>
  import PatternRow from './PatternRow';
  import PatternEditRow from './PatternEditRow';
  import {sortAlg} from '../../util';
  export default {
    name: 'patterns-table',
    components: { PatternRow, PatternEditRow },
    props: {
      group: {
        type: String,
        required: true
      },
      patterns: {
        type: Array,
        required: true
      }
    },
    computed: {
      sortedPatterns () {
        return this.patterns.slice().sort((a, b) => sortAlg(a.alg, b.alg, -1));
      },
      model () {
        return this.$store.state.pattern.model;
      },
      editing () {
        return this.$store.state.pattern.editing;
      }
    },
    methods: {
      addPattern () {
        this.$store.dispatch('newPattern', {
          group: this.group
        });
      }
    }
  }
</script>

<style lang="scss">
  .patterns-table {
    width: 800px;
    font-family: "Times New Roman", Times, serif;
    border-collapse: collapse;
    border: 1px solid black;

    caption {
      text-align: center;
      font-size: 10pt;
      font-weight: 600;
      margin-top: 5px;
    }

    th, td {
      font-size: 9.5pt;
      border-collapse: collapse;
      border: 1px solid black;
    }
  }
</style>
