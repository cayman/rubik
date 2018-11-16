<template>
  <div class="">
    <case-image :setup="fieldSetup" :arrows="fieldArrows" :src="projection.src"/>
    <div class="form__field">
      <label class="form__label">
        setup:
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldSetup"/>
      </span>
      <a class="action" @click="revertSetup" title="Инверсия">
        <i class="fa fa-retweet" aria-hidden="true"/>
      </a>
    </div>
    <div class="form__field">
      <label class="form__label">
        arrows:
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldArrows"/>
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
  import {revert} from '../../util';

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
      fieldArrows: {
        get () {
          return this.position.arrows;
        },
        set (arrows) {
          this.$store.commit('updatePosition', {arrows});
        }
      },
      solutions () {
        return this.position.solutions;
      },
    },
    methods: {
      revertSetup () {
        this.fieldSetup = revert(this.fieldSetup);
      },
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
