<template>
  <main>
    <group-cases-table :title="group.name" :cases="cases">
      <a class="action" @click="addCase" title="Добавить">
        <i class="fa fa fa-plus" aria-hidden="true"/>
      </a>
    </group-cases-table>
    <div class="more"></div>
  </main>
</template>

<script>
  import GroupCasesTable from './group/GroupCasesTable';

  export default {
    components: {GroupCasesTable},
    computed: {
      group() {
        return this.$store.state.group.model;
      },
      cases() {
        return this.$store.state.cases.list;
      },
      lastCase() {
        return this.cases.reduce((last, caseModel) =>
          caseModel.number > last.number ? caseModel : last, {number: 0});
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
        this.$store.dispatch('fetchGroup', id).then(group => {
          this.$store.dispatch('fetchCases', group.code);
          this.$store.dispatch('fetchPositions', {groupCode: group.code});
        });
      },
      addCase () {
        this.$store.dispatch('newCase', {group: this.group, lastCase: this.lastCase});
      }
    }
  }
</script>

<style lang="scss">

</style>
