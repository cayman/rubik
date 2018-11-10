<template>
  <table class="case-table" border="1">
    <caption>
      <router-link :to="{name: 'group', params: {id: caseModel.groupCode}}">
        <strong>{{ caseModel.groupCode }}</strong>
      </router-link>
      <strong> {{ caseModel.number }}</strong>
      {{ caseModel.name }} - {{ caseModel.desc }}</caption>
    <template v-for="(projection, index) in projections" >
      <tbody :key="index">
        <case-table-head :projection="projection.projection" :case-model="caseModel"></case-table-head>
        <case-table-row :positions="projection.positions" :projection="projection.projection"
                    :case-model="caseModel"></case-table-row>
      </tbody>
    </template>
  </table>
</template>

<script>
  import CaseTableHead from './CaseTableHead';
  import CaseTableRow from './CaseTableRow';

  export default {
    components: {CaseTableHead, CaseTableRow},
    name: 'case-table',
    props: {
      caseModel: {
        type: Object,
        required: true
      }
    },
    computed: {
      positions () {
        return this.$store.state.positions.list
          .filter(position => position.caseCode === this.caseModel.code);
      },
      projections () {
        return this.$store.state.projections.list.map(projection => ({
          projection,
          positions: this.positions.filter(position => position.projectionCode === projection.code)
        }));
      }
    }
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
