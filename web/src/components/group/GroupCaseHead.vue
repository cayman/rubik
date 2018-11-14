<template>
  <div class="group-case-head">
    <div class="group-case-head__code">
      <a class="action" @click="editCase" title="Редактировать">
        <i class="fa fa fa-pencil" aria-hidden="true"/>
      </a>
      <router-link v-if="caseModel.id" :to="{name:'case', params: { id: caseModel.id }}">
        <span>{{ caseModel.code }}</span>
      </router-link>
      <span v-else>{{ caseModel.code }}</span>
    </div>
    <div class="group-case-head__name">
      {{ caseModel.name }}
    </div>
    <div class="group-case-head__desc">
      {{ caseModel.desc }}
    </div>
    <div class="group-case-head__setup">
      set:
      <template v-for="(step, index) in setupSteps">
        <wbr :key="index +'wbr'" v-if="step.startsWith('(')" />
        <span :key="index">{{ step }}&nbsp;</span>
      </template>
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
    computed: {
      setupSteps () {
        return this.caseModel.setup ? this.caseModel.setup.split(' ') : [];
      }
    },
    methods:{
      editCase (){
        this.$store.dispatch('editCase', this.caseModel);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .group-case-head {
    &__code {

    }
    &__name {
      font-weight: 600;
    }
    &__desc {
      font-weight: 500;
      font-stretch: condensed;
    }
    &__setup {
      padding-top: 5px;
      font-size: 10px;
    }
  }
</style>
