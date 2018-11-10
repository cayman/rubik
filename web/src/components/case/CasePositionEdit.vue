<template>
  <div class="">
    <case-image :setup="fieldSetup" :view="projection.view"/>
    <div class="form__field">
      <label class="form__label">
        set:
      </label>
      <span class="form__input--wide">
        <input type="text" v-model="fieldSetup"/>
      </span>
    </div>
    <solutions-edit :solutions="solutions"/>
    <button type="button" @click="save">Сохранить</button>
    <button type="button" @click="close">Отмена</button>
  </div>
</template>

<script>
  import CaseImage from '../common/CaseImage';
  import SolutionsEdit from '../common/SolutionsEdit';

  export default {
    components: { SolutionsEdit, CaseImage },
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
        algorithm: ''
      }
    },
    computed:{
      position () {
        return this.$store.state.position.model;
      },
      fieldSetup: {
        get () {
          return this.position.setup;
        },
        set (setup) {
          this.$store.commit('updatePosition', {setup});
        }
      },
      solutions () {
        return this.position.solutions;
      },
    },
    methods: {
      close () {
        this.$store.commit('setPositionEditing', false);
        this.$store.commit('unsetPosition');
      },
      save () {
        this.$store.dispatch('savePosition', this.position)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    &__field{
      width: 200px;
      label {
        width: 60px;
      }
      &__label {
        font-weight: bold;
      }
    }
    &__input {
    }
  }

</style>
