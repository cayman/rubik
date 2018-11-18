<template>
  <div>
    <div>{{ algorithm }}</div>
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
      arrows: {
        type: String,
        required: false
      },
      algorithm: {
        type: String,
        required: false
      },
      src: {
        type: String,
        required: true
      }
    },
    computed:{
      image(){
        return this.src  + '&alg=' + (this.setup || '') + (this.algorithm || '') + ( this.arrows ? '&arw=' + this.arrows : '');
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
    width: 125px;
    height: 125px;
  }
</style>
