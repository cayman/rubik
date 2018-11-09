<template>
  <tr>
    <case-group-cell :projection="projection" :rotation="null" :position="basePosition" :case-model="caseModel"/>
    <template v-for="{rotation, position} in rotatedPositions">
      <case-group-cell :key="rotation" :rotation="rotation"
                       :projection="projection" :position="position" :case-model="caseModel"/>
    </template>
  </tr>
</template>

<script>
  import CaseGroupCell from './CaseGroupCell';

  export default {
    components: { CaseGroupCell },
    name: 'case-group',
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
  td {
    padding: 2px 2px 2px 2px;
    vertical-align: top;
  }
</style>
