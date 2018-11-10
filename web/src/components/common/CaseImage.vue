<template>
  <div>
    <div><b>{{ algorithm }}</b></div>
    <img class="image" :src="image" @click="clearAlgoritm()">
  </div>
</template>

<script>
  export default {
    name: 'case-image',
    props: {
      setup: {
        type: String,
        required: false
      },
      algorithm: {
        type: String,
        required: false
      },
      view: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        url: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=100&stage=f2l&cc=black&bg=white&dist=6'
      }
    },
    computed:{
      image(){
        return this.url + '&r=' + this.view  + '&alg=' + (this.setup || '') + (this.algorithm || '');
      }
    },
    methods:{
      clearAlgoritm (){
        this.$emit('clear');
      }
    }
  }
</script>

<style scoped>
  .image {
    width: 130px;
    height: 130px;
  }
</style>
