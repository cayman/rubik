<template>
  <main>
    <template v-for="(group, name) in groups">
      <patterns-table :key="name" :group="name" :patterns="group">
      </patterns-table>
    </template>
    <div class="more"></div>
  </main>
</template>

<script>
  import PatternsTable from './pattern/PatternsTable';

  export default {
    components: {PatternsTable},
    computed: {
      patterns() {
        return this.$store.state.patterns.list;
      },
      groups () {
        return this.patterns.reduce((groups, pattern) => {
          const name = pattern.group || 'Без группы';
          groups[name] = (groups[name] || []).concat(pattern);
          return groups;
        }, {});
      }
    },
    created () {
      this.fetchData();
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchData();
      next();
    },
    methods: {
      fetchData () {
        console.log('fetchData');
        this.$store.dispatch('fetchPatterns');
      }
    }
  }
</script>

<style lang="scss">

</style>
