<template>
  <tr class="pTitle">
    <td>
      <strong>{{ prefix }} &nbsp; ({{ projection.name }})</strong>
    </td>
    <template v-for="(rotation, index) in projection.rotations">
      <td :key="index">
        <span> {{ prefix }} </span>
        <strong> {{ projection.turn }} {{rotation}}</strong>
      </td>
    </template>
  </tr>
</template>

<script>
  export default {
    name: 'case-group-head',
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
