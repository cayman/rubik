<template>
  <tr class="pTitle">
    <td :style="{width}">
      <strong>{{ prefix }} &nbsp; ({{ projection.name }})</strong>
    </td>
    <template v-for="(rotation, index) in projection.rotations">
      <td :key="index" :style="{width}">
        <span> {{ prefix }} </span>
        <strong> {{ projection.turn }} {{rotation}}</strong>
      </td>
    </template>
  </tr>
</template>

<script>
  export default {
    name: 'case-table-head',
    props: {
      caseModel: {
        type: Object,
        required: true
      },
      projection: {
        type: Object,
        required: true
      }
    },
    computed: {
      columns () {
        return this.projection.rotations.length + 1;
      },
      width () {
        return (100 / this.columns).toFixed(0) + '%';
      },
      prefix () {
        return this.projection.code;
      }
    }
  }
</script>

<style scoped>
  th{
    padding: 4px 0px 2px 0px;
    font-weight: 600;
  }
</style>
