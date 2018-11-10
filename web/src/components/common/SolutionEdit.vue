<template>
  <div class="case-solution-edit">
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Алгоритм:
      </label>
      <span class="case-solution-edit__input">
        <input type="text" v-model="fieldAlg"/>
      </span>
    </div>
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Название:
      </label>
      <span class="case-solution-edit__input">
        <input type="text" v-model="fieldNote"/>
      </span>
    </div>
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Ключ:
      </label>
      <span class="case-solution-edit__input">
        <input type="text" v-model="fieldKey"/>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'solution-edit',
    props: {
      solution: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    computed:{
      fieldAlg: {
        get () {
          return this.solution.alg;
        },
        set (alg) {
          this.updateSolution({alg});
        }
      },
      fieldNote: {
        get () {
          return this.solution.note;
        },
        set (note) {
          this.updateSolution({note});
        }
      },
      fieldKey: {
        get () {
          return this.solution.key;
        },
        set (key) {
          this.updateSolution({key});
        }
      }
    },
    methods: {
      updateSolution (value) {
        this.$emit('change', {index: this.index, value});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .case-solution-edit {
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
