<template>
  <div class="itemRoot">
    <div>
      <div class="indicator">
        <svg width="35" height="35">
          <g v-if="s">
            <circle r="17" cx="18" cy="18" fill="#59D9BA" />
            <path
              transform="translate(7,7)"
              d="M20 6L9 17L4 12"
              fill="transparent"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <g v-else>
            <circle r="10" cx="18" cy="18" stroke="#00000000" fill="#EBEEF0" />
            <circle
              r="13"
              cx="18"
              cy="18"
              stroke-width="2"
              stroke="#EBEEF0"
              fill="#00000000"
            />
            <circle
              r="13"
              cx="18"
              cy="18"
              stroke-width="2"
              stroke="url(#cirg)"
              fill="#00000000"
            />
          </g>
          <linearGradient id="cirg" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="60%" stop-color="#59D9BA" stop-opacity="0" />
            <stop offset="85%" stop-color="#59D9BA" stop-opacity="1" />
          </linearGradient>
        </svg>
      </div>
      <div>
        <slot />
      </div>
      <div class="f1" />
    </div>
    <div class="f1" />
    <div class="btns" v-if="!s">
      <slot name="1" />
      <br v-if="$root.size === 'sm'" />
      <slot name="2" />
      <br v-if="$root.size === 'sm'" />
      <slot name="3" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["s", "num"],
};
</script>

<style lang="scss">
.todoRoot .itemRoot {
  width: 100%;
  padding: 25px 30px;
  border-radius: 2px;
  margin-bottom: 20px;
  background-color: var(--bgclr);
  display: flex;
  flex-direction: row;

  .indicator {
    min-width: 35px;
    min-height: 35px;
    margin-right: 15px;
    display: grid;
    > svg {
      grid-row: 1/2;
      grid-column: 1/2;
    }
    > .tickInCircle {
      grid-row: 1/2;
      grid-column: 1/2;
      z-index: 10;
    }
  }
  > div:first-child {
    display: inline-flex;
    flex-direction: row;
    .tickInCircle {
      z-index: 10;
    }
    > div:last-child {
      margin-left: 15px;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
  h2 {
    display: inline-block;
  }
}
.md,
.sm {
  .todoRoot .itemRoot {
    flex-direction: column;
    button {
      margin-top: 15px;
    }
    .btns {
      margin-left: 50px;
    }
  }
}
</style>
