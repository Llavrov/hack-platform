<template>
  <div class="xOrLined">
    <span>&nbsp;&nbsp;&nbsp;{{ $t(`g.or`) }}&nbsp;&nbsp;&nbsp;</span>
  </div>
</template>

<script>
export default {
  name: "OrLined",
};
</script>

<style lang="scss">
.xOrLined {
  overflow: hidden;
  text-align: center;
  color: var(--clr);
  opacity: 0.2;
  font-size: 16px;
  margin-bottom: 35px;
  ::after,
  ::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    width: 50%;
    height: 1px;
    background: #8798ad;
    border: solid #8798ad;
    border-width: 0 10px;
  }
  ::after {
    margin-right: -50%;
  }
  ::before {
    margin-left: -50%;
  }
}
</style>
