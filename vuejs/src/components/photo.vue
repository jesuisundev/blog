<template>
  <img :src="photo.url" alt>
</template>

<script>
export default {
  name: "photo",
  props: ["photo"]
};
</script>

<style scoped>
.column img {
  vertical-align: middle;
  width: 100%;
}
</style>
