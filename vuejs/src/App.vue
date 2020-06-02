<template>
  <div id="app">
    <action v-bind:message="messageAction"></action>
    <grid v-bind:photos="photos"></grid>
  </div>
</template>

<script>
  import action from './components/action.vue'
  import grid from './components/grid.vue'

  export default {
    name: 'App',
    components: { action, grid },
    data: function () {
      return {
        photos: [
          {
            id: 0,
            url: "https://external-preview.redd.it/x3W_tPGBToPGjhcrWquMJiDxXFwsTX3yCeAqomZkjxY.png?auto=webp&s=c2fcff59adb0d468306e4fb6367fa387a455186e"
          },
          {
            id: 1,
            url: "https://i.pinimg.com/originals/8c/96/93/8c969356e667e3aa0d145145e082e7ef.jpg"
          },
          {
            id: 2,
            url: "https://i.redd.it/oxk0suba02f41.png"
          },
          {
            id: 3,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQM8cYlwuPEc9cLToaGgK98Tf2RXyeLz4CzFFeGp_uZ67nsofS8&usqp=CAU"
          },
          {
            id: 4,
            url: "https://qph.fs.quoracdn.net/main-qimg-f3b7cc28577e5cca6adff5533531e457"
          },
          {
            id: 5,
            url: "https://media.makeameme.org/created/backend-ninja-developer.jpg"
          },
          {
            id: 6,
            url: "https://img.devrant.com/devrant/rant/r_1459399_qE2zU.jpg"
          },
          {
            id: 7,
            url: "https://pbs.twimg.com/media/D5gssGpWwAY2QFn.jpg"
          }
        ],
        messageAction: "It's working !"
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial;
  }
</style>
