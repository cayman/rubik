<template>
    <tr>
      <td :style="{width: '150px'}">
        <input type="text" v-model="fieldAlg" style="width:140px"/>
      </td>
      <td :style="{width: '150px'}">
        <input type="text" v-model="fieldName" style="width:140px"/>
      </td>
      <td :style="{width: '250px'}">
        <input type="text" v-model="fieldDesc" style="width:240px"/>
      </td>
      <td>
        <select v-model="fieldGroup" style="width: 70px">
          <option v-for="group in groups" :key="group" :value="group" :label="group">
          </option>
        </select>
      </td>
      <td>
        <button type="button" @click="save">Сохранить</button>
        <button type="button" @click="close">Отмена</button>
      </td>
    </tr>
</template>

<script>

  export default {
    name: 'pattern-row',
    props: {
    },
    computed: {
      pattern () {
        return this.$store.state.pattern.model;
      },
      groups () {
        return this.$store.state.patterns.list
          .reduce((groups, pattern) => groups.includes(pattern.group) ? groups : groups.concat(pattern.group), []);
      },
      fieldAlg: {
        get () {
          return this.pattern.alg;
        },
        set (alg) {
          this.updatePattern({alg});
        }
      },
      fieldName: {
        get () {
          return this.pattern.name;
        },
        set (name) {
          this.updatePattern({name});
        }
      },
      fieldDesc: {
        get () {
          return this.pattern.desc;
        },
        set (desc) {
          this.updatePattern({desc});
        }
      },
      fieldGroup: {
        get () {
          return this.pattern.group;
        },
        set (group) {
          this.updatePattern({group});
        }
      },
    },
    methods: {
      updatePattern (model) {
        this.$store.commit('updatePattern', model);
      },
      close () {
        this.$store.commit('setPatternEditing', false);
        this.$store.commit('unsetPattern');
      },
      save () {
        this.$store.dispatch('savePattern', this.pattern);
      }
    }
  }
</script>

<style lang="scss">
    th, td {
      font-size: 9.5pt;
      border-collapse: collapse;
      border: 1px solid black;
    }
</style>
