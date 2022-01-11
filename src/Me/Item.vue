<template>
  <div :class="`meItemRoot s${s}`">
    <div
      class="fr line1"
      style="cursor: pointer"
      @click="$router.push(`/me/${num}`)"
    >
      <div class="cell1">
        <svg width="35" height="35">
          <circle
            v-if="s === 0"
            r="17"
            cx="18"
            cy="18"
            stroke="#C5CEDD"
            fill="#00000000"
          />
          <circle
            v-else-if="s === 1"
            r="17"
            cx="18"
            cy="18"
            fill="var(--clrprim)"
          />
          <circle v-else-if="s === 2" r="17" cx="18" cy="18" fill="#59D9BA" />
        </svg>
        <div class="numInCircle">
          <span v-if="s !== 2">{{ num }}</span>
          <span v-else>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div class="fc">
        <div class="f1" />
        <h2 v-if="s !== 2">{{ title }}</h2>
        <div v-else style="padding: 7px 17px" class="fr">
          <h3>{{ title }}</h3>
          <div style="margin-left: 27px">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20H21"
                stroke="#8798AD"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z"
                stroke="#8798AD"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="f1" />
      </div>
    </div>
    <div class="fr line2">
      <div v-if="$root.size !== 'sm'" class="cell1">
        <div class="lineVert" v-if="num !== '4'" />
      </div>
      <div class="fc cell2">
        <slot v-if="s === 1"></slot>
      </div>
    </div>
    <div class="line3"></div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["num", "title", "s"],
};
</script>

<style lang="scss">
.meItemRoot {
  .cell1 {
    width: 35px;
    height: 35px;
    margin-right: 7px;
  }
  .numInCircle {
    position: relative;
    top: -29px;
    z-index: 10;
    text-align: center;
    font-size: 20px;
    width: inherit;
    color: #ffffff;
  }
  .line1 {
    margin-bottom: 12px;
  }
  .line2 {
    .cell1 {
      height: inherit;
    }
    .cell2 {
      padding-top: 7px;
      width: 100%;
      box-shadow: 0px 15px 30px rgba(7, 107, 156, 0.05);
      border-radius: 2px;
      min-height: 10px;
    }
  }
  .line3 {
    width: 100%;
    height: 25px;
  }
  .lineVert {
    height: 100%;
    margin-left: 17px;
    border-left: 1px solid #c5cedd;
  }
  &.s0 {
    .numInCircle {
      color: #c5cedd;
    }
    .line3 {
      height: 12px;
    }
    h2 {
      color: #c5cedd;
    }
  }
  &.s2 {
    .numInCircle {
      color: #ffffff;
    }
    .line3 {
      height: 12px;
    }
  }
}
</style>
