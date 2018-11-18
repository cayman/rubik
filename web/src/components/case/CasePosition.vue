<template>
  <div class="case-position">
    <div class="case-position__setup">
      <span>set: {{ setup }}</span><br/><span class="case-position__comment">{{ recognizedSetup }}</span>
    </div>
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
  import {recognize} from "../../util";

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
      patterns () {
        return this.$store.state.patterns.list;
      },
      recognizedSetup () {
        return recognize(this.setup, this.patterns);
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
    &__comment {
      font-weight: $font-weight-lite;
      color: $text-color-note;
    }
  }

</style>
