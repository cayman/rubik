<template>
  <tr class="case-table-head">
    <td :style="{width}">
      <span class="case-table-head__label">
        {{ prefix }} &nbsp; ({{ projection.name }})
      </span>
    </td>
    <template v-for="(rotation, index) in projection.rotations">
      <td :key="index" :style="{width}">
        <span> {{ prefix }} </span>
        <span class="case-table-head__label">
          {{ projection.turn }} {{rotation}}
        </span>
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

<style lang="scss" scoped>
  @import "../../assets/var";
  .case-table-head {
    td {
      padding: 3px 5px 1px 5px;
      font-weight: $font-weight-regular;
      font-size: $font-size-middle;
    }
    &__label {
      font-weight: $font-weight-bold;
    }
  }
</style>
