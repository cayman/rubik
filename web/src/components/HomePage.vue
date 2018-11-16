<template>
  <main>
    <div v-for="group in groups" :key="group.code">
      <router-link :to="{name: 'group', params: {id: group.id}}"> {{ group.code }}</router-link>
    </div>

    <router-link :to="{name: 'patterns'}">Шаблоны</router-link>

    <div class="more"></div>
  </main>
</template>

<script>
  export default {
    computed: {
      groups() {
        return this.$store.state.groups.list;
      }
    },
    created () {
      this.fetchGroups(this.$route.params);
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchGroups(to.params);
      next();
    },
    methods: {
      fetchGroups() {
        this.$store.dispatch('fetchGroups');
      }
    }
  }
</script>

<style lang="scss">

</style>
