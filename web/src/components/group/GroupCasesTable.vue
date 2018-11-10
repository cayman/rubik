<template>
  <table class="group-cases-table" border="1">
    <caption><span>{{ part.name }}</span>
      <a class="action" @click="addCase" title="Добавить">
        <i class="fa fa fa-plus" aria-hidden="true"/>
      </a>
    </caption>
    <template v-for="(blocks, name, index) in casesBlocks" >
      <tbody :key="index">
        <group-cases-row :blocks="blocks" :name="name"/>
      </tbody>
    </template>
    <group-cases-new v-if="creating"/>
  </table>
</template>

<script>
  import GroupCasesRow from './GroupCasesRow';
  import GroupCasesNew from './GroupCasesNew';

  export default {
    components: {GroupCasesRow, GroupCasesNew},
    name: 'group-cases-table',
    props: {
      part: {
        type: Object,
        required: true
      },
      group: {
        type: Object,
        required: true
      }
    },
    computed: {
      editCase () {
        return this.$store.state.case.model;
      },
      creating () {
        return this.$store.state.case.editing && !this.editCase.id &&
          this.editCase.groupCode === this.group.code && this.editCase.partCode === this.part.code;
      },
      positions () {
        return this.$store.state.positions.list;
      },
      projections () {
        return this.$store.state.projections.list;
      },
      cases () {
        return this.$store.state.cases.list
          .filter(model => model.partCode === this.part.code);
      },
      lastCase() {
        return this.cases.reduce((last, caseModel) =>
          caseModel.number > last.number ? caseModel : last, {number: 0, partCode: this.part.code});
      },
      casesBlocks () {
        return this.cases.filter(model => model.id).reduce((map, model) => {
          const projection = this.projections.find(projection => projection.code === model.projectionCode);
          const position = this.positions.find(position => position.code === model.code);
          map[model.name] = (map[model.name] || []).concat({ caseModel: model, position, projection });
          return map;
        }, {});
      }
    },
    methods: {
      addCase () {
        this.$store.dispatch('newCase', {group: this.group, part: this.part, lastCase: this.lastCase});
      }
    }
  }
</script>

<style lang="scss">
  .group-cases-table {
    width: 800px;
    font-family: "Times New Roman", Times, serif;
    border-collapse: collapse;
    border: 1px solid black;

    caption {
      text-align: center;
      font-size: 10pt;
      font-weight: 600;
      margin-top: 5px;
    }

    th, td {
      font-size: 9.5pt;
      border-collapse: collapse;
      border: 1px solid black;
    }
  }
</style>
