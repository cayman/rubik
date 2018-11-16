<template>
  <main>
    <div class="title">
      <span>{{group.code }} - {{  group.name }}</span>
      <a class="action" @click="addPart" title="Добавить">
        <i class="fa fa fa-plus" aria-hidden="true"/>
      </a>
    </div>
    <group-part-edit v-if="partEditing"/>
    <!--<button type="button" @click="exportParts">Экспортировать</button>-->
    <template v-for="part in parts">
      <group-cases-table :key="part.code" :group="group" :part="part" :group-last-case="lastCase">
      </group-cases-table>
    </template>
    <div class="more"></div>
  </main>
</template>



<script>
  import GroupCasesTable from './group/GroupCasesTable';
  import GroupPartEdit from './group/GroupPartEdit';

  export default {
    components: {GroupCasesTable, GroupPartEdit},
    computed: {
      partEditing () {
        return this.$store.state.part.editing && !this.$store.state.part.model.id;
      },
      group() {
        return this.$store.state.group.model;
      },
      parts () {
        return this.$store.state.parts.list;
      },
      cases () {
        return this.$store.state.cases.list;
      },
      lastCase() {
        return this.cases[this.cases.length] ||
          {number: 0, partCode: this.parts.length ? this.parts[this.parts.length - 1].code : null};
      }
    },
    created () {
      this.fetchData(this.$route.params);
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchData(to.params);
      next();
    },
    methods: {
      fetchData ({id}) {
        console.log('fetchData', id);
        this.$store.dispatch('fetchPatterns');
        this.$store.dispatch('fetchGroup', id).then(group => {
          this.$store.dispatch('fetchParts', group.code);
          this.$store.dispatch('fetchCases', group.code);
          this.$store.dispatch('fetchPositions', {groupCode: group.code});
        });
      },
      exportParts () {
        this.$store.dispatch('exportParts', this.group);
      },
      addPart () {
        this.$store.dispatch('newPart', {group: this.group, number: this.parts.length + 1});
      }
    }
  }
</script>

<style lang="scss">
  .title {
    font-weight: bold;
    color: lightslategray;
    padding: 0;
    margin: 0;
  }

</style>
