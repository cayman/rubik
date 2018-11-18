<template>
    <tr>
      <td :style="{width: '120px'}">{{ pattern.alg }}</td>
      <td :style="{width: '120px'}">{{ pattern.name }}</td>
      <td colspan="3">{{ pattern.desc }}
      <td :style="{width: '150px'}">{{ pattern.fingers }}
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
</style>
