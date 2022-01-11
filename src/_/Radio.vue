<template>
  <div class="xRadioRoot fr">
    <div v-t="label" />
    <template v-for="it of realOptions" :key="it.id">
      <div class="f1" />
      <div>
        <input
          class="form-check-input"
          type="radio"
          :id="`${id}Opt${it.id}`"
          :checked="
            modelValue === it.id || (modelValue == null && it.id == null)
          "
          @click="updateVal(it.id)"
        />
        <label
          class="form-check-label"
          :for="`${id}Opt${it.id}`"
          v-text="it.label"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "FormCheck",
  props: ["id", "modelValue", "label", "options"],
  methods: {
    updateVal(mew) {
      this.$emit("update:modelValue", mew);
    },
  },
  computed: {
    realOptions() {
      return this.options.map((it) => {
        if (it?.label) {
          return it;
        }
        if (it?.id) {
          return {
            id: it.id,
            label: it.id,
          };
        }
        if (it) {
          return {
            id: it,
            label: it,
          };
        }
        return {
          id: null,
          label: "",
        };
      });
    },
  },
};
</script>

<style>
.xRadioRoot label {
  opacity: 1 !important;
  color: var(--clr) !important;
  margin-left: 8px;
}
</style>
