<template>
  <div class="">
    <div class="form__field">
      <label class="form__label">
        Номер
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldNumber" style="width:50px" size="3"/>
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
    <div class="form__field">
      <label class="form__label">
        Проекция:
      </label>
      <span class="form__input">
        <select v-model="fieldProjectionCode" style="width: 150px">
          <option v-for="projection in projections" :key="projection.code" :value="projection.code" :label="projection.name">
          </option>
        </select>
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">
        Группа:
      </label>
      <span class="form__input">
        <select v-model="fieldPartCode" style="width: 150px">
          <option v-for="part in parts" :key="part.code" :value="part.code" :label="part.name">
          </option>
        </select>
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">
        Setup:
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldSetup" style="width: 135px"/>
        <a class="action" @click="revertSetup" title="Инверсия">
          <i class="fa fa-retweet" aria-hidden="true"/>
        </a>
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">
        arrows:
      </label>
      <span class="form__input">
        <input type="text" v-model="fieldArrows"/>
      </span>
    </div>
    <button type="button" @click="save">Сохранить</button>
    <button type="button" @click="close">Отмена</button>
  </div>
</template>

<script>
  import {revert} from "../../util";

  export default {
    name: 'group-case-edit',
    computed:{
      projections () {
        return this.$store.state.projections.list;
      },
      parts () {
        return this.$store.state.parts.list;
      },
      caseModel () {
        return this.$store.state.case.model;
      },
      fieldNumber: {
        get () {
          return this.caseModel.number;
        },
        set (number) {
          this.updateCase({number});
        }
      },
      fieldName: {
        get () {
          return this.caseModel.name;
        },
        set (name) {
          this.updateCase({name});
        }
      },
      fieldDesc: {
        get () {
          return this.caseModel.desc;
        },
        set (desc) {
          this.updateCase({desc});
        }
      },
      fieldSetup: {
        get () {
          return this.caseModel.setup;
        },
        set (setup) {
          this.updateCase({setup});
        }
      },
      fieldArrows: {
        get () {
          return this.caseModel.arrows;
        },
        set (arrows) {
          this.updateCase({arrows});
        }
      },
      fieldProjectionCode: {
        get () {
          return this.caseModel.projectionCode;
        },
        set (projectionCode) {
          this.updateCase({projectionCode});
        }
      },
      fieldPartCode: {
        get () {
          return this.caseModel.partCode;
        },
        set (partCode) {
          this.updateCase({partCode});
        }
      }
      // projection () {
      //   return this.projections.find(p => p.code === this.fieldProjectionCode);
      // }
    },
    methods: {
      revertSetup () {
        this.fieldSetup = revert(this.fieldSetup);
      },
      updateCase (model) {
        this.$store.commit('updateCase', model);
      },
      close () {
        this.$store.commit('setCaseEditing', false);
        this.$store.commit('unsetCase');
      },
      save () {
        this.$store.dispatch('saveCase', this.caseModel);
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
