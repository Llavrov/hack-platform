<template>
  <div class="xSelRoot">
    <label :for="id" v-t="label" v-if="!!label" />
    <Multiselect
      :options="realOptions"
      value-prop="id"
      v-model="val"
      @update:modelValue="onValueUpdate"
      :mode="mode"
      :max="max"
      :multiple-label="makeLabel"
      :id="id"
      :placeholder="placeholder || $t('g.notChosen')"
      :searchable="true"
      @search-change="search = $event"
    />
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: [
    "id",
    "modelValue",
    "label",
    "options",
    "max",
    "addOpts",
    "placeholder",
  ],
  data() {
    return {
      search: null,
    };
  },
  computed: {
    realOptions() {
      if (!this.addOpts || !this.search?.length) {
        return this.options;
      }
      return [{ id: this.search, label: this.search }, ...this.options];
    },
    val: {
      get() {
        return this.modelValue;
      },
      set(mew) {
        this.$emit("update:modelValue", mew);
      },
    },
    mode() {
      return this.max ? "multiple" : "single";
    },
  },
  methods: {
    makeLabel(vals) {
      let label = vals.map((it) => it.label).join(", ");
      if (label.length > 60) {
        label = label.substring(0, 58) + "...";
      }
      return label;
    },
    onValueUpdate(mew) {
      if (mew?.length > 1 && mew.includes && mew.includes(null)) {
        this.val = [null];
      }
    },
  },
};
</script>

<style lang="scss">
.formInput {
  width: 100%;
  border-radius: 10px;
}
.xSelRoot {
  width: 100%;
  div.multiselect-input {
    height: 50px;
    color: var(--clr);
    font-size: 14px;
  }
  .multiselect-input > div:first-child {
    padding: 16px 20px 17px 20px;
  }
}
</style>
