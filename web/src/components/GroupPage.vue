<template>
  <main>
    <template v-for="part in parts">
      <group-cases-table :key="part.code" :group="group" :part="part" :group-last-case="lastCase">
      </group-cases-table>
    </template>
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
      parts () {
        return this.group.parts
      },
      cases () {
        return this.$store.state.cases.list;
      },
      lastCase() {
        return this.cases.reduce((last, caseModel) =>
          caseModel.number > last.number ? caseModel : last, {number: 0, partCode: 1});
      },
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
          this.$store.dispatch('fetchCases', group.code);
          this.$store.dispatch('fetchPositions', {groupCode: group.code});
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
