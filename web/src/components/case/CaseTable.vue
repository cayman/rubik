<template>
  <table class="case-table" border="1">
    <caption class="case-table__caption" >
      <router-link class="case-table__link"  :to="{name: 'group', params: {id: caseModel.groupCode}}">
        <span>{{ caseModel.groupCode }}</span>
        <span>-{{ caseModel.number }}</span>
      </router-link>

      <span> {{ caseModel.name }}</span>
      <span class="case-table__desc" > - {{ caseModel.desc }}</span>
    </caption>
    <template v-for="(projection, index) in projections" >
      <tbody :key="index">
        <case-table-head :projection="projection.model" :case-model="caseModel"></case-table-head>
        <case-table-row :positions="projection.positions" :projection="projection.model"
                    :case-model="caseModel"></case-table-row>
      </tbody>
    </template>
  </table>
</template>

<script>
  import CaseTableHead from './CaseTableHead';
  import CaseTableRow from './CaseTableRow';

  export default {
    components: {CaseTableHead, CaseTableRow},
    name: 'case-table',
    props: {
      caseModel: {
        type: Object,
        required: true
      }
    },
    computed: {
      positions () {
        return this.$store.state.positions.list
          .filter(position => position.caseCode === this.caseModel.code);
      },
      projectionsCodes () {
        return this.$store.state.group.model.projections;
      },
      projections () {
        return this.projectionsCodes.map(code => ({
          model: this.$store.state.projections.list.find(projection => projection.code === code),
          positions: this.positions.filter(position => position.projectionCode === code)
        }));
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var";
  .case-table {
    margin: 15px 0 0 0;
    width: 800px;
    border: 1px solid black;
    border-collapse: collapse;
    &__caption {
      padding: 0;
      margin: 0;
      font-weight: $font-weight-bold;
      font-size: $font-size-big;
    }
    &__desc {
      font-weight: $font-weight-regular;
      color: $text-color-label;
    }
  }
</style>
