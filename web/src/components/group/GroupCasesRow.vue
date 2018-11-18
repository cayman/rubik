<template>
  <tr>
    <template v-for="(block, index) in blocks">
      <td :key="'head'+index" :style="{width: '90px'}">
        <group-case-head :case-model="block.caseModel"/>
      </td>
      <td :key="'image'+index" :style="{width: '125px'}">

        <template v-if="block.projection" >
          <case-image v-if="editing && model.id === block.caseModel.id" :algorithm="algorithm"
                      :setup="model.setup" :arrows="model.arrows"
                      :src="block.projection.src" @clear="clearAlgoritm(index)"/>
          <case-image v-else :algorithm="algorithm"
                      :setup="block.caseModel.setup" :arrows="block.caseModel.arrows"
                      :src="block.projection.src" @clear="clearAlgoritm(index)"/>
        </template>

      </td>
      <td :key="'solutions'+index" :style="{minWidth: width * 2 + '%'}">
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
        return (100 / this.blocks.length / 5).toFixed(0);
      }
    },
    methods:{
      setAlgorithm (algorithm){
        return this.algorithm = algorithm;
      },
      clearAlgoritm (){
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
    padding: 2px 5px;
    vertical-align: top;
  }
</style>
