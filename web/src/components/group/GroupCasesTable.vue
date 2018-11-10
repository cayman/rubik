<template>
  <table class="group-cases-table" border="1">
    <caption v-if="title"><strong>{{ title }}</strong>
      <slot></slot>
    </caption>
    <template v-for="(blocks, name, index) in casesBlocks" >
      <tbody :key="index">
        <group-cases-row :blocks="blocks" :name="name"/>
      </tbody>
    </template>
    <group-cases-new v-if="editing"/>
  </table>
</template>

<script>
  import GroupCasesRow from './GroupCasesRow';
  import GroupCasesNew from './GroupCasesNew';

  export default {
    components: {GroupCasesRow, GroupCasesNew},
    name: 'group-cases-table',
    props: {
      title: {
        type: String,
        required: false
      },
      cases: {
        type: Array,
        required: true
      }
    },
    computed: {
      editing () {
        return this.$store.state.case.editing;
      },
      positions () {
        return this.$store.state.positions.list;
      },
      projections () {
        return this.$store.state.projections.list
      },

      casesBlocks () {
        return this.cases.filter(model => model.id).reduce((map, model) => {
          const projection = this.projections.find(projection => projection.code === model.projectionCode);
          const position = this.positions.find(position => position.code === model.code);
          map[model.name] = (map[model.name] || []).concat({ caseModel: model, position, projection });
          return map;
        }, {});
      }
    }
  }
</script>

<style lang="scss">
  .group-cases-table {
    width: 800px;
    font-family: "Times New Roman", Times, serif;
    border-collapse: collapse;
    border: 1px solid black;

    caption {
      font-size: 12pt;
    }

    th, td {
      font-size: 9.5pt;
      border-collapse: collapse;
      border: 1px solid black;
    }
  }
</style>
