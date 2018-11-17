<template>
    <router-link class="solution-link" :to="{name:'case', params: { id: code }}"
                 :title="caseTitle">{{ code }}</router-link>
</template>

<script>
  export default {
    name: 'solution-link',
    props:{
      code: {
        type: String,
        required: true
      }
    },
    computed: {
      caseTitle() {
        return this.$store.state.cases.list
          .filter(model => model.code === this.code).map(model => model.name + '\n' + model.desc);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .solution-link {
    cursor: pointer;
    color: blue;
    white-space: nowrap;
    a:visited {
      color: blue;
    }
  }
</style>
