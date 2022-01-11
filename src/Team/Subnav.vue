<template>
  <div class="xxSubnavRoot">
    <div class="f1" />
    <button
      v-if="t === 1"
      :class="`xxSubnavItem ${modelValue === 1 ? 'chosen' : ''}`"
      v-t="$root.size !== 'sm' ? `team.join` : `team.join2`"
      :style="`width:${itemWidth}`"
      @click="set(1)"
    />
    <button
      v-if="t === 1"
      :class="`xxSubnavItem ${modelValue === 2 ? 'chosen' : ''}`"
      v-t="`team.create`"
      :style="`width:${itemWidth}`"
      @click="set(2)"
    />
    <button
      v-if="t === 2"
      :class="`xxSubnavItem ${modelValue === 3 ? 'chosen' : ''}`"
      v-t="`team.myteam`"
      :style="`width:${itemWidth}`"
      @click="set(3)"
    />
    <!-- <button
      v-if="t === 2"
      :class="`xxSubnavItem ${modelValue === 4 ? 'chosen' : ''}`"
      v-text="`Моя информация`"
      :style="`width:${itemWidth}`"
      @click="set(4)"
    /> -->
    <button
      v-if="t === 1 || t === 2"
      :class="`xxSubnavItem ${modelValue >= 4 ? 'chosen' : ''}`"
      v-t="`team.find`"
      :style="`width:${itemWidth}`"
      @click="set(4)"
    />
    <button
      v-if="t === 3"
      :class="`xxSubnavItem ${modelValue === 6 ? 'chosen2' : ''}`"
      v-t="`team.6.name`"
      :style="`width:${itemWidth}`"
      @click="set(6)"
    />
    <button
      v-if="t === 3 && !$root.user.teamId"
      :class="`xxSubnavItem ${modelValue === 5 ? 'chosen2' : ''}`"
      v-t="`team.5.name`"
      :style="`width:${itemWidth}`"
      @click="set(5)"
    />
    <div class="f1" />
  </div>
</template>

<script>
export default {
  name: "Subnav",
  props: ["t", "modelValue"],
  computed: {
    itemWidth() {
      if (this.t === 3 && this.$root.size === "sm") {
        return "50%";
      }
      if (this.t === 3 && this.$root.size === "md") {
        return "150px";
      }
      if (this.t === 3) {
        return "215px";
      }
      if (this.t === 2 && this.$root.size === "md") {
        return "50%";
      }
      if (this.t === 3) {
        return "215px";
      }
      if (this.t === 1) {
        return "33%";
      }
      return "";
    },
  },
  methods: {
    set(n) {
      this.$emit("update:modelValue", n);
    },
  },
};
</script>

<style lang="scss">
.teamRoot {
  .xxSubnavRoot {
    text-align: center;
    width: 770px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
  }
  .xxSubnavItem {
    border: 1px solid #8798ad;
    color: #8798ad;
    font-size: 18px;
    text-align: center;
    border-radius: 0;
    padding: 12px 30px;
    background: transparent;
    &.chosen {
      border: 1px solid rgba(var(--clr3), 1);
      z-index: 10;
      background: rgba(var(--clr3), 1);
      color: #fff;
      font-weight: bold;
    }
    &.chosen2 {
      border: 1px solid var(--clrprim);
      z-index: 10;
      background: var(--clrprim);
      color: #fff;
      font-weight: bold;
    }
  }
}
.lg .teamRoot {
  .xxSubnavItem {
    width: 215px;
  }
}
.sm .teamRoot {
  .xxSubnavItem {
    padding: 8px 15px !important;
    font-size: 14px;
  }
}
</style>
