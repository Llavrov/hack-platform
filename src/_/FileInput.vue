<template>
  <div class="xInRoot">
    <label :for="id" v-t="label" v-if="!!label" />
    <input
      class="form-control formInput"
      :id="id"
      :value="val"
      @focus="onFocus"
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
  ],
  data() {
    return {
      error: null,
      doOpen: true,
    };
  },
  computed: {
    val: {
      get() {
        return this.modelValue
          ? this.modelValue.originalFileName || this.modelValue
          : "";
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
      if (!this.disabled) {
        this.$el.querySelector("input").blur();
        const finput = document.createElement("input");
        finput.type = "file";
        finput.style.display = "none";
        finput.addEventListener("input", () => {
          this.doOpen = false;
          setTimeout(() => (this.doOpen = true), 300);
          if (finput.files?.length) {
            this.$emit("setFile", finput.files[0]);
          }
          document.body.removeChild(finput);
        });
        document.body.appendChild(finput);
        finput.click();
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
.xInRoot {
  width: 100%;
  input.form-control,
  textarea.form-control {
    padding: 16px 20px 17px 20px;
    border: 1px solid transparent;
  }
}
</style>
