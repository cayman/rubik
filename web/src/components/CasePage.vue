<template>
  <main>
    <case-table :case-model="caseModel" v-if="caseModel.id"/>
    <div class="more"></div>
  </main>
</template>

<script>
  import CaseTable from './case/CaseTable';

  export default {
    components: {CaseTable},
    computed: {
      caseModel() {
        return this.$store.state.case.model;
      }
    },
    created () {
      this.fetchData(this.$route.params);
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchCases(to.params);
      next();
    },
    methods: {
      fetchData ({id}) {
        console.log('fetchData', id);
        this.$store.dispatch('fetchPatterns');
        this.$store.dispatch('fetchCase', id ).then(model => {
          this.$store.dispatch('fetchPositions', {caseCode: model.code});
          this.$store.dispatch('fetchGroup', model.groupCode);
          this.$store.dispatch('fetchCases', model.groupCode);
        });
      }
    }
  }
</script>

<style lang="scss">
</style>
