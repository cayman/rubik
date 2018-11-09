<template>
  <main>
    <div v-for="caseModel in cases" :key="caseModel.code">
      <case-table :case-model="caseModel"></case-table>
      <div class="more"></div>
    </div>
  </main>
</template>

<script>
  import CaseTable from './CaseTable';

  export default {
    components: {CaseTable},
    name: 'app',
    created () {
      this.$store.dispatch('fetchCases','F2L');
    },
    computed: {
      cases () {
        return this.$store.state.cases.list;
      }
    }
  }
</script>

<style lang="scss">
  @page {
    size: A4;
    margin-right: 0.5cm;
    margin-left: 0.5cm;
    margin-top: 1.5cm;
    margin-bottom: 0.5cm;

  }
  @media print {
    body {
      margin: 0;
    }
    .more {
      page-break-after: always;
    }
    table{
      width: 100%;
    }
  }

  .action {
    display: inline-block;
    background-color: transparent;
    color: #7162ac;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
    padding: 7px;
    border-radius: 2px;
    line-height: normal;
    &:hover {
       background-color: cornflowerblue;
       color: white;
    }
  }
</style>
