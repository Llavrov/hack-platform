<template>
  <div
    class="modal fade"
    tabindex="-1"
    style="margin-top: auto; margin-bottom: auto"
  >
    <div class="modal-dialog">
      <div class="modal-content" style="padding: 25px 25px 60px 25px">
        <div class="modal-header" style="border-bottom: none">
          <h5 class="modal-title" v-if="!!title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["title", "footer"],
};
</script>

<style></style>
