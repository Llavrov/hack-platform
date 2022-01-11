<template>
  <div class="xInRoot">
    <label :for="id" v-t="label" v-if="!!label" />
    <input
      v-if="!area"
      class="form-control formInput"
      :id="id"
      v-model="val"
      @focus="onFocus"
      :placeholder="realPlaceholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :type="date ? 'date' : pwd ? 'password' : 'text'"
    />
    <textarea
      v-else
      class="form-control formInput"
      :id="id"
      v-model="val"
      @focus="onFocus"
      :rows="rows || 4"
      :placeholder="realPlaceholder"
      :disabled="disabled"
    />
    <div
      class="invalid-feedback"
      style="display: block; position: absolute"
      v-if="error"
      v-text="error"
    ></div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: [
    "id",
    "modelValue",
    "label",
    "placeholder",
    "area",
    "rows",
    "date",
    "pwd",
    "disabled",
    "validate",
    "min",
    "max",
  ],
  data() {
    return {
      error: null,
    };
  },
  computed: {
    val: {
      get() {
        return this.modelValue;
      },
      set(mew) {
        if (this.validate) {
          this.error = this.validate(mew);
        }
        this.$emit("update:modelValue", mew);
      },
    },
    realPlaceholder() {
      if (this.placeholder?.length) {
        return this.placeholder;
      }
      if (this.placeholder) {
        return this.$t(this.label);
      }
      return null;
    },
  },
  methods: {
    onFocus() {
      if (this.disabled) {
        document.getElementById(this.id).blur();
      }
    },
  },
  mounted() {
    // window
    //   .VMasker(document.getElementById(this.id))
    //   .maskPattern("+9 (999) 999-99-99");
  },
};
</script>

<style lang="scss">
.formInput {
  width: 100%;
  border-radius: 10px;
}
.xInRoot {
  width: 100%;
  input.form-control,
  textarea.form-control {
    padding: 16px 20px 17px 20px;
    border: 1px solid transparent;
  }
}
</style>
