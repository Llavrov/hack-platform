<template>
  <unicon v-if="s === true" name="check-circle" fill="#00ff00" />
  <unicon v-else-if="s === false" name="times-circle" fill="#ff0000" />
  <unicon v-else name="question-circle" fill="#808080" />
</template>

<script>
export default {
  name: "TFQ",
  props: ["s"],
};
</script>

<style lang="scss">
</style>
