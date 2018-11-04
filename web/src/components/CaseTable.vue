<template>
  <table class="case-table">
    <caption><strong>{{ caseModel.group }} {{ caseModel.case }}</strong> {{ caseModel.name }}</caption>
    <template v-for="(group, index) in groups" >
      <tbody :key="index">
        <case-group-head :projection="group.projection"></case-group-head>
        <case-group :positions="group.positions" :projection="group.projection"></case-group>
      </tbody>
    </template>
  </table>
</template>

<script>
  import CaseGroupHead from './CaseGroupHead';
  import CaseGroup from './CaseGroup';

  export default {
    components: {CaseGroupHead, CaseGroup},
    name: 'case-table',
    couputed: {
      projections () {
        return this.$store.state.projections.list;
      },
      caseModel () {
        return this.$store.state.case.model;
      },
      positions () {
        return this.$store.state.positions.list;
      },
      groups () {
        return this.positions.reduce((groups, position) => {
          const code = position.projectionCode;
          if (groups[code]) {
            groups[code].positions.concat(position);
          } else {
            const projection = this.projections.find(projection => projection.code === code);
            groups[code] = { projection, positions: [position]}
          }
          return groups;
        },{})
      }
    },

  }
</script>

<style scoped>
  table{
    width: 800px;
  }
  caption {
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
  }
  table, th, td {
    font-family: "Times New Roman", Times, serif;
    font-size: 9.5pt;
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>