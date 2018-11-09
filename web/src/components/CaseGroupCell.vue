<template>
  <td>
    <template v-if="position">
      <case-position-edit v-if="editPosition.id === position.id" :projection="projection"/>
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
    name: 'case-group',
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
      }
    },
    computed: {
      editPosition () {
        return this.$store.state.position.model;
      },
      creating () {
        return this.editPosition.caseCode === this.caseModel.code &&
        this.editPosition.projectionCode === this.projection.code &&
        this.editPosition.rotation === this.rotation;
      }
    },
    methods: {
      addPosition () {
        const code = this.caseModel.code + (this.projection.turn ? '_' + this.projection.turn : '') +
        (this.rotation ? '_' + this.rotation : '');
        this.$store.commit('setPosition', {
          code,
          caseCode: this.caseModel.code,
          projectionCode: this.projection.code,
          rotation: this.rotation,
          setup: this.caseModel.setup,
          solutions: [{alg: null, note: null}]
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
