<template>
  <div class="callToAction">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'callToAction',
    props: {
      message: String
    }
  }
</script>

<style scoped>
  .callToAction {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: red;
    background:black;
    padding: 10px;
  }
</style>
