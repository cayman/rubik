<template>
  <div v-for="group in cases">
    <div v-for="(hap,index) in group.cases">
      <case-table v-bind:hap="hap" v-bind:group="group.name" v-bind:key="index"></case-table>
      <div class="more"></div>
    </div>
  </div>
</template>

<script>
  import CaseTable from './CaseTable';

  export default {
    components: {CaseTable},
    name: 'app'
  }
</script>

<style scoped>
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
</style>