<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 10px;
  }

  @page {
    size: A4;
    margin-right: 0.5cm;
    margin-left: 0.5cm;
    margin-top: 1.5cm;
    margin-bottom: 0.5cm;
  }
  @media print {
    body {
      margin: 0;
      padding: 0;
    }
    .more {
      page-break-after: always;
    }
    table{
      width: 100%;
    }
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .action {
    float: right;
    display: inline-block;
    background-color: transparent;
    color: #8995b9;
    cursor: pointer;
    margin: 0 4px 0 0;
    padding: 2px;
    border-radius: 2px;
    line-height: normal;
    &:hover {
       background-color: cornflowerblue;
       color: white;
    }
  }
</style>
