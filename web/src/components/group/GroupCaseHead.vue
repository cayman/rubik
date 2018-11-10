<template>
  <div>
    <a class="action" @click="editCase" title="Редактировать">
      <i class="fa fa fa-pencil" aria-hidden="true"/>
    </a>
    <router-link v-if="caseModel.id" :to="{name:'case', params: { id: caseModel.id }}">
      <span>{{ caseModel.code }}</span>
    </router-link>
    <span v-else>{{ caseModel.code }}</span>
    <div>
      <strong>{{ caseModel.name }}</strong>
    </div>
    <div>
      <small>set: {{ caseModel.setup }}</small>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'group-case-head',
    props: {
      caseModel: {
        type: Object,
        required: true
      }
    },
    methods:{
      editCase (){
        this.$store.dispatch('editCase', this.caseModel);
      }
    }

  }
</script>

<style scoped>
  td {
    padding: 2px 2px 2px 2px;
    vertical-align: top;
  }
</style>
