<template>
  <div>
    <a class="action" @click="cancel" title="Закрыть">
      <i class="fa fa fa-close" aria-hidden="true"/>
    </a>
    <input type="text" v-model="fieldCode"/>
    <div class="form__field">
      <label class="form__label">
         set:
      </label>
      <span class="form__input--wide">
          <input type="text" v-model="fieldSetup"/>
      </span>
    </div>
    <img class="image" :src="image">

    <template v-for="(solution, index) in solutions" >
      <div>
        <div class="form__field">
          <label class="form__label">
            Алгоритм:
          </label>
          <span class="form__input--wide">
            <input type="text" v-model="solution.alg"/>
          </span>
        </div>
        <div class="form__field">
          <label class="form__label">
            Название:
          </label>
          <span class="form__input--wide">
             <input v-model="solution.note">
          </span>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    components: {},
    name: 'case-position-edit',
    props: {
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
        url: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=100&stage=f2l&cc=black&bg=white&dist=6',
        algorithm: ''
      }
    },
    computed:{
      position () {
        return this.$store.state.position.model;
      },
      fieldCode: {
        get () {
          return this.position.code;
        },
        set (code) {
          this.setField('code', code);
        }
      },
      fieldSetup: {
        get () {
          return this.position.setup;
        },
        set (name) {
          this.setField('setup', name);
        }
      },
      solutions () {
          return this.position.solutions;
      },
      image(){
        return this.url + '&r=' + this.projection.view  +'&alg='+this.fieldSetup + this.algorithm;
      }
    },
    methods: {
      cancel () {
        this.$store.commit('setPosition', {
          code: null,
          caseCode: null,
          projectionCode: null,
          rotation: null,
          setup: null,
          solutions: []
        })
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
