<template>
  <Xselect
    v-if="t === 'select'"
    :class="`${required ? 'required' : ''} ${showErr ? 'showError' : ''}`"
    :id="id"
    :label="realLabel"
    :options="options"
    v-model="val"
    :addOpts="addOpts"
    :max="max"
  />
  <Xradio
    v-else-if="t === 'radio'"
    :class="`${required ? 'required' : ''} ${showErr ? 'showError' : ''}`"
    :id="id"
    :label="realLabel"
    :options="options"
    v-model="val"
  />
  <XfileInput
    v-else-if="id === 'resume'"
    :class="`${required ? 'required' : ''} ${showErr ? 'showError' : ''}`"
    :id="id"
    :modelValue="resume"
    :placeholder="'Выберите файл...'"
    @setFile="setResume"
    :label="realLabel"
    :disabled="disabled"
  />
  <div
    class="xDateRoot"
    v-else-if="t === 'date'"
    :class="`${required ? 'required' : ''} ${showErr ? 'showError' : ''}`"
  >
    <label :for="id" v-t="realLabel" />
    <input type="date" :id="id" v-model="valDate" :disabled="disabled" />
  </div>
  <Xinput
    v-else
    :id="id"
    :class="`${required ? 'required' : ''} ${showErr ? 'showError' : ''}`"
    :label="realLabel"
    :placeholder="placeholder"
    :area="t === 'text'"
    :date="t === 'date'"
    :min="min"
    :max="max"
    v-model="val"
    :disabled="disabled"
  />
</template>

<script>
import Moment from "moment";
// import { fileToBase64 } from "../utils";
export default {
  name: "Field",
  props: [
    "t",
    "id",
    "placeholder",
    "label",
    "disabled",
    "addOpts",
    "min",
    "max",
    "required",
  ],
  computed: {
    realLabel() {
      return this.label || `me.${this.id}`;
    },
    model() {
      return this.$parent.$parent.model;
    },
    resume() {
      return this.$parent.$parent.resume;
    },
    options() {
      return this.$parent.$parent.options[this.id];
    },
    showErr() {
      return (
        this.$parent.$parent.showErrors[this.$parent.num] &&
        this.required &&
        !(this.val && String(this.val).length)
      );
    },
    val: {
      get() {
        if (this.id === "phone") {
          return this.transforms.phone(this.model[this.id]);
        }
        return this.model[this.id];
      },
      set(mew) {
        if (this.id === "phone") {
          mew = mew || "";
          mew = mew.replace(/\D/g, "");
          if (
            this.transforms.phone(this.model[this.id]) ===
            this.transforms.phone(mew)
          ) {
            document.getElementById(this.id).value = this.val;
            return;
          }
        }
        this.model[this.id] = mew; // eslint-disable-line
      },
    },
    valDate: {
      get() {
        const val = this.model[this.id];
        return this.transforms.dateFromServer(val, true, (m) =>
          m.format("YYYY-MM-DD")
        );
      },
      set(mew) {
        this.model[this.id] = this.transforms.dateToServer(
          Moment(mew, "YYYY-MM-DD").toDate().getTime(),
          true
        ); // eslint-disable-line
      },
    },
  },
  methods: {
    async setResume(file) {
      const res = await this.http.postForm("/users/upload-resume", {
        file,
      });
      this.model.resume = res; // eslint-disable-line
      this.$parent.$parent.resume = res; // eslint-disable-line
    },
  },
};
</script>

<style></style>
