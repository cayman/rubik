<template>
  <tr v-if="!model.id">
    <td :style="{width: '100px'}">
      <group-case-head :case-model="model"/>
    </td>
    <td :style="{width: '130px'}">
      <case-image v-if="projection" :setup="model.setup" :view="projection.view"/>
    </td>
    <td>
      <group-case-edit v-if="model.id === null"/>
    </td>
  </tr>
</template>

<script>
  import CaseImage from '../common/CaseImage';
  import GroupCaseHead from './GroupCaseHead';
  import GroupCaseEdit from './GroupCaseEdit';

  export default {
    components: {CaseImage, GroupCaseHead, GroupCaseEdit},
    name: 'group-cases-new',
    data(){
      return {
        algorithms: []
      }
    },
    computed: {
      model () {
        return this.$store.state.case.model;
      },
      width() {
        return (100 / this.blocks.length / 4).toFixed(0);
      },
      projections () {
        return this.$store.state.projections.list
      },
      projection () {
        return this.projections.find(projection => projection.code === this.model.projectionCode);
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
