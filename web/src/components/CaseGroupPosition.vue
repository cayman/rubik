<template>
  <div>
    <small>set: {{ setup }}</small><br/>
    <!--<div><b>{{ algorithm }}</b></div>		-->
    <img class="image" :src="image" @click="clearAlgoritm()">

    <template v-for="(solution, index) in solutions" >
      <hr v-if="index !== 0"/>
      <case-solution @steps="setAlgorithm" :solution="solution"></case-solution>
    </template>
  </div>
</template>

<script>
  import CaseSolution from './CaseSolution';

  export default {
    components: {CaseSolution},
    name: 'case-group-position',
    props: {
      position: {
        type: Object,
        required: true
      },
      projection: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        url: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=100&stage=f2l&cc=black&bg=white&dist=6',
        algorithm: '',
        pare1:{ from: new RegExp("([URFLDBMurfldbyxz]{1}[w]{0,1})'", 'i'), to:"$1" },
        pare2:{ from: new RegExp("([URFLDBMurfldbyxz]{1}[w]{0,1}2)", 'i'), to:"$1" },
        pare3:{ from: new RegExp("([URFLDBMurfldbyxz]{1}[w]{0,1})", 'i'), to:"$1'" },
        clearing: new RegExp("[\*]{1}", 'i'),
        clearing1: new RegExp("[\(]{1}", 'i'),
        clearing2: new RegExp("[\)]{1}", 'i')
      }
    },
    computed:{
      solutions () {
        return this.position.solutions;
      },
      setup(){
        return  this.position.setup;
      },
      image(){
        return this.url + '&r=' + this.projection.view  +'&alg='+this.setup + this.algorithm;
      }
    },
    methods:{
      setAlgorithm (algorithm){
        this.algorithm = algorithm.join(' ');
        console.log('setAlgoritm', this.algorithm);
      },
      clearAlgoritm (){
        this.algorithm = '';
      },
    }
  }
</script>

<style scoped>
  .image {
    width: 130px;
    height: 130px;
  }
</style>