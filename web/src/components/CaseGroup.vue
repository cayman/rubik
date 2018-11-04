<template>
  <tr>
    <td v-for="(position, index) in positions" :key="index">
      <case-group-position :position="position" :projection="projection"></case-group-position>
    </td>
  </tr>
</template>

<script>
  import CaseGroupPosition from './CaseGroupPosition';

  export default {
    components: {CaseGroupPosition},
    name: 'case-group',
    props: {
      positions: {
        type: Array,
        required: true
      },
      projection: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  td {
    padding: 2px 2px 2px 2px;
    vertical-align: top;
  }
</style>