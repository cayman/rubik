<template>
  <tr class="pTitle">
    <td>
      <strong>{{ prefix }} &nbsp; ({{ projection.name }})</strong>
    </td>
    <td>
      <span> {{ prefix }}</span> <strong>U'</strong>
    </td>
    <td>
      <span> {{ prefix }}</span> <strong>U2</strong>
    </td>
    <td>
      <span> {{ prefix }}</span> <strong>U</strong>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'case-group-head',
    props: {
      projection: {
        type: Object,
        required: true
      }
    },
    computed: {
      prefix () {
        return this.projection.code + ' ' + this.projection.turn;
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