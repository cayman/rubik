<template>
  <tr>
    <case-table-cell :projection="projection" :rotation="null" :position="basePosition"
                     :case-model="caseModel" :base-setup="baseSetup"/>
    <template v-for="{rotation, position} in rotatedPositions">
      <case-table-cell :key="rotation" :rotation="rotation" :base-setup="baseSetup"
                       :projection="projection" :position="position" :case-model="caseModel"/>
    </template>
  </tr>
</template>

<script>
  import CaseTableCell from './CaseTableCell';

  export default {
    components: { CaseTableCell },
    name: 'case-table-row',
    props: {
      caseModel: {
        type: Object,
        required: true
      },
      projection: {
        type: Object,
        required: true
      },
      positions: {
        type: Array,
        required: true
      }
    },
    computed: {
      basePosition() {
        return this.positions.find(position => !position.rotation);
      },
      baseSetup() {
        return this.basePosition ? this.basePosition.setup : this.caseModel.setup;
      },
      rotatedPositions() {
        return !this.projection.rotations ? [] : this.projection.rotations
          .map(rotation => ({
            rotation,
            position: this.positions.find(position => position.rotation === rotation)
          }));
      }
    }

  }
</script>

<style scoped>
</style>
