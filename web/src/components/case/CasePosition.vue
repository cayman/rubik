<template>
  <div class="case-position">
    <div class="case-position__setup">set: {{ setup }}</div>
    <a class="action" @click="editPosition" title="Редактировать">
      <i class="fa fa fa-pencil" aria-hidden="true"/>
    </a>
    <case-image :setup="setup" :algorithm="algorithm" :src="projection.src" :arrows="position.arrows" @clear="clearAlgoritm"/>
    <case-solutions @change="setAlgorithm" :solutions="solutions"/>
  </div>
</template>

<script>
  import CaseSolutions from '../common/Solutions';
  import CaseImage from '../common/CaseImage';

  export default {
    components: {CaseSolutions, CaseImage},
    name: 'case-position',
    props: {
      position: {
        type: Object,
        required: true
      },
      projection: {
        type: Object,
        required: true
      },
      rotation: {
        type: String,
        required: false
      }
    },
    data(){
      return {
        algorithm: ''
      }
    },
    computed:{
      setup(){
        return  this.position.setup;
      },
      solutions () {
        return this.position.solutions || [];
      }
    },
    methods:{
      setAlgorithm (algorithm){
        this.algorithm = algorithm;
      },
      clearAlgoritm (){
        this.algorithm = '';
      },
      editPosition (){
        this.$store.dispatch('editPosition', this.position);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var";
  .case-position {
    &__setup {
      padding: 2px 0;
      font-size: $font-size-small;
      border-bottom: $line-lite;
    }
  }

</style>
