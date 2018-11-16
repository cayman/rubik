<template>
  <td :style="{width}">
    <template v-if="position">
      <case-position-edit v-if="editing && model.id === position.id" :projection="projection"/>
      <case-position v-else :position="position" :projection="projection" :rotation="rotation"/>
    </template>
    <template v-else-if="creating">
      <case-position-edit :projection="projection" :rotation="rotation"/>
    </template>
    <template v-else>
      <a class="action" @click="addPosition">
        <i class="fa fa fa-pencil" aria-hidden="true" title="Создать"/>
      </a>
    </template>
  </td>
</template>

<script>
  import CasePosition from './CasePosition';
  import CasePositionEdit from './CasePositionEdit';

  export default {
    components: { CasePosition, CasePositionEdit },
    name: 'case-table-cell',
    props: {
      position: {
        type: Object,
        required: false
      },
      projection: {
        type: Object,
        required: true
      },
      rotation: {
        type: String,
        required: false
      },
      caseModel: {
        type: Object,
        required: false
      },
      baseSetup: {
        type: String,
        required: false
      }
    },
    computed: {
      columns () {
        return this.projection.rotations.length + 1;
      },
      width () {
        return (100 / this.columns).toFixed(0) + '%';
      },
      model () {
        return this.$store.state.position.model;
      },
      editing () {
        return this.$store.state.position.editing;
      },
      creating () {
        return this.editing &&
          this.model.caseCode === this.caseModel.code &&
          this.model.projectionCode === this.projection.code &&
          this.model.rotation === this.rotation;
      }
    },
    methods: {
      addPosition () {
        this.$store.dispatch('newPosition', {
          caseModel: this.caseModel,
          projection: this.projection,
          rotation: this.rotation,
          setup: this.baseSetup,
          arrows: this.caseModel.arrows
        })
      }
    }
  }
</script>

<style scoped>
  td {
    padding: 2px 2px 2px 2px;
    vertical-align: top;
  }
</style>
