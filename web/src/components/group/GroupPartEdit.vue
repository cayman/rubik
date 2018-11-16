<template>
  <div class="">
    <div class="form__field">
      <label class="form__label">
        Номер
      </label>
      <span class="form__input">
        <input type="number" v-model="fieldNumber" style="width:50px" :readonly="true"/>
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">
        Название (eng)
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldName" style="width:150px"/>
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">
        Название (rus)
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldDesc" style="width:150px"/>
      </span>
    </div>
    <button type="button" @click="save">Сохранить</button>
    <button type="button" @click="close">Отмена</button>
  </div>
</template>

<script>
  export default {
    name: 'group-part-edit',
    computed:{
      part () {
        return this.$store.state.part.model;
      },
      fieldNumber: {
        get () {
          return this.part.number;
        },
        set (number) {
          this.updatePart({number: parseInt(number)});
        }
      },
      fieldName: {
        get () {
          return this.part.name;
        },
        set (name) {
          this.updatePart({name});
        }
      },
      fieldDesc: {
        get () {
          return this.part.desc;
        },
        set (desc) {
          this.updatePart({desc});
        }
      }
    },
    methods: {
      updatePart (model) {
        this.$store.commit('updatePart', model);
      },
      close () {
        this.$store.commit('setPartEditing', false);
        this.$store.commit('unsetPart');
      },
      save () {
        this.$store.dispatch('savePart', this.part);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    &__field{
      &__label {
        font-weight: bold;
      }
      label {
        display: block;
        width: 100px;
      }
    }
    &__input {
      display: block;
    }
  }

</style>
