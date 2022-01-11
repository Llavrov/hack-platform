<template>
  <div :class="first" style="width: 100%; height: 100%">
    <div class="f1" />
    <div v-if="second" :class="second">
      <div class="f1" />
      <div>
        <slot></slot>
      </div>
      <div class="f1" />
    </div>
    <slot v-else></slot>
    <div class="f1" />
  </div>
</template>

<script>
export default {
  name: "Center",
  props: ["h", "v"],
  computed: {
    first() {
      return this.h !== false ? "fr" : "fc";
    },
    second() {
      return this.h !== false && this.v !== false ? "fc" : null;
    },
  },
};
</script>

<style></style>
