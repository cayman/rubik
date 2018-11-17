<template>
  <div class="case-solution-edit">
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Алгоритм:
        <a class="action" @click="parenthesesSolution" title="Разделитель">
          <i class="fa fa-code" aria-hidden="true"/>
        </a>
      </label>
      <span class="case-solution-edit__input">
        <input type="text" v-model="fieldAlg"/>
      </span>
    </div>
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Название:
        <a class="action" @click="recognizeSolution" title="Распознать">
          <i class="fa fa-info" aria-hidden="true"/>
        </a>
      </label>
      <span class="case-solution-edit__input">
        <input type="text" v-model="fieldNote"/>
      </span>
    </div>
    <div class="case-solution-edit__field">
      <label class="case-solution-edit__label">
        Выделен:
      </label>
      <span class="case-solution-edit__input">
        <input type="checkbox" v-model="fieldSelected"/>
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
  import {parentheses, recognize} from '../../util';

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
    computed: {
      patterns () {
        return this.$store.state.patterns.list;
      },
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
      fieldSelected: {
        get () {
          return this.solution.selected;
        },
        set (selected) {
          this.updateSolution({selected});
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
      },
      parenthesesSolution () {
        if (!this.fieldAlg) return;
        this.fieldAlg = parentheses(this.fieldAlg);
      },
      recognizeSolution() {
        if (!this.fieldAlg) return;
        this.fieldNote = recognize(this.fieldAlg, this.patterns);
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
