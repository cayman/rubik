<template>
  <tr>
    <template v-for="(block, index) in blocks">
      <td :key="'head'+index" :style="{width: width + '%', minWidth: '90px'}">
        <group-case-head :case-model="block.caseModel"/>
      </td>
      <td :key="'image'+index" :style="{width: '125px'}">
        <case-image v-if="block.projection" :setup="block.caseModel.setup" :algorithm="algorithm"
                    :view="block.projection.view" @clear="clearAlgoritm(index)"/>
      </td>
      <td :key="'solutions'+index" :style="{width: width * 2 + '%'}">
        <!--{{ block.caseModel }}-->
        <group-case-edit v-if="editing && model.id === block.caseModel.id"/>
        <case-solutions v-else-if="block.position" :solutions="block.position.solutions" @change="setAlgorithm" />
      </td>
    </template>
  </tr>
</template>

<script>
  import CaseSolutions from '../common/Solutions';
  import CaseImage from '../common/CaseImage';
  import GroupCaseHead from './GroupCaseHead';
  import GroupCaseEdit from './GroupCaseEdit';

  export default {
    components: {CaseSolutions, CaseImage, GroupCaseHead, GroupCaseEdit},
    name: 'group-cases-table-row',
    props: {
      blocks: {
        type: Array,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        algorithm: null
      }
    },
    computed: {
      model () {
        return this.$store.state.case.model;
      },
      editing () {
        return this.$store.state.case.editing;
      },
      width() {
        return (100 / this.blocks.length / 4).toFixed(0);
      }
    },
    methods:{
      setAlgorithm (algorithm){
        return this.algorithm = algorithm;
      },
      clearAlgoritm (index){
        this.algorithm = '';
      },
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
