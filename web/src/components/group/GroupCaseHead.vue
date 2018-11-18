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
    <div class="group-case-head__label">
      {{ caseModel.name }}
    </div>
    <div class="group-case-head__desc">
      {{ caseModel.desc }}
    </div>
    <div class="group-case-head__setup">
      <template v-for="(step, index) in setupSteps">
        <wbr :key="index +'wbr'" v-if="step.startsWith('(')" />
        <span :key="index">{{ step }}&nbsp;</span>
      </template>
    </div>
    <div class="group-case-head__count">
      pos: {{ positions.length }}
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
      },
      positions() {
        return this.$store.state.positions.list.filter(p => p.caseCode === this.caseModel.code);
      },
    },
    methods:{
      editCase (){
        this.$store.dispatch('editCase', this.caseModel);
      }
    }

  }
</script>

<style lang="scss" scoped>
   @import "../../assets/var";
  .group-case-head {

    &__code {

    }
    &__label {
      font-size: $font-size-middle;
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
    }
    &__desc {
      font-weight: $font-weight-regular;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
      color: $text-color-label;
    }
    &__setup {
      padding-top: 5px;
      font-size: $font-size-small;
    }
    &__count {
      font-size: $font-size-small;
      color: #c1c1c1;
    }
  }
</style>
