<template>
    <tr>
      <td :style="{width: '150px'}">{{ pattern.alg }}</td>
      <td :style="{width: '150px'}">{{ pattern.name }}</td>
      <td colspan="3">{{ pattern.desc }}
        <a class="action" @click="editPattern" title="Редактировать">
          <i class="fa fa fa-pencil" aria-hidden="true"/>
        </a>
      </td>
    </tr>
</template>

<script>

  export default {
    name: 'pattern-row',
    props: {
      pattern: {
        type: Object,
        required: true
      }
    },
    computed: {
    },
    methods: {
      editPattern (){
        this.$store.dispatch('editPattern', this.pattern);
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
