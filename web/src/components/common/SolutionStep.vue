<template>
    <span :class="{ selected }">{{ step }}</span>
</template>

<script>
  export default {
    name: 'case-solution-step',
    props: {
      step: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/var";
  .selected {
    font-weight: $font-weight-bold;
  }
</style>
