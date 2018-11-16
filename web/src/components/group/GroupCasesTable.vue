<template>
  <table class="group-cases-table" border="1">
    <caption>
      <span class="group-cases-table__number">{{part.number}}. </span>
      <span>{{ part.name }} - {{ part.desc }}</span>
      <a class="action" @click="editPart" title="Редактировать">
        <i class="fa fa fa-pencil" aria-hidden="true"/>
      </a>
      <a class="action" @click="addCase" title="Добавить">
        <i class="fa fa fa-plus" aria-hidden="true"/>
      </a>
    </caption>
    <thead v-if="partModel.id === part.id && partEditing">
      <tr><td colspan="2"><group-part-edit /></td></tr>
    </thead>
    <template v-for="(blocks, name, index) in casesBlocks" >
      <tbody :key="index">
        <group-cases-row :blocks="blocks" :name="name"/>
      </tbody>
    </template>
    <group-cases-new v-if="caseCreating"/>
  </table>
</template>

<script>
  import GroupCasesRow from './GroupCasesRow';
  import GroupCasesNew from './GroupCasesNew';
  import GroupPartEdit from './GroupPartEdit';

  export default {
    components: {GroupCasesRow, GroupCasesNew, GroupPartEdit},
    name: 'group-cases-table',
    props: {
      part: {
        type: Object,
        required: true
      },
      group: {
        type: Object,
        required: true
      },
      groupLastCase: {
        type: Object,
        required: true
      }
    },
    computed: {
      partModel () {
        return this.$store.state.part.model;
      },
      partEditing () {
        return this.$store.state.part.editing;
      },
      caseModel () {
        return this.$store.state.case.model;
      },
      caseCreating () {
        return this.$store.state.case.editing && !this.caseModel.id &&
          this.caseModel.groupCode === this.group.code && this.caseModel.partCode === this.part.code;
      },
      positions () {
        return this.$store.state.positions.list;
      },
      projections () {
        return this.$store.state.projections.list;
      },
      cases () {
        return this.$store.state.cases.list
          .filter(model => model.partCode === this.part.code /*|| model.partCode === this.part.number*/);
      },
      partLastCase() {
        return this.cases[this.cases.length - 1] || {number: 0, partCode: this.part.code};
      },
      casesBlocks () {
        return this.cases.filter(model => model.id).reduce((map, model) => {
          const projection = this.projections.find(projection => projection.code === model.projectionCode);
          const position = this.positions.find(position => position.code === model.code);
          const key = model.name.split(':')[0];
          map[key] = (map[key] || []).concat({ caseModel: model, position, projection });
          return map;
        }, {});
      }
    },
    methods: {
      addCase () {
        this.$store.dispatch('newCase', {
          group: this.group,
          part: this.part,
          lastCase: this.partLastCase.number ? this.partLastCase : this.groupLastCase
        });
      },
      editPart (){
        this.$store.dispatch('editPart', this.part);
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

    &__number {
      color: lightslategray;
    }

    th, td {
      font-size: 9.5pt;
      border-collapse: collapse;
      border: 1px solid black;
    }
  }
</style>
