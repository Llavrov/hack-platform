<template>
  <div :innerHTML="content" style="min-height: 100vh; padding: 2vh 5vw"></div>
</template>

<script>
export default {
  computed: {
    content() {
      return this.$route.name === "/tou"
        ? this.$root.settings.tou
        : this.$root.settings.privacy;
    },
  },
};
</script>