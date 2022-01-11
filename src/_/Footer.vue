<template>
  <div class="footRoot horizPad">
    <div class="f1" />
    <div class="footContentRoot">
      <div class="copyright vc">©Copyrights 2020 All rights reserved</div>
      <div class="f1" />
      <div class="fr">
        <div class="f1" />
        <div class="item vc rusbase" />
        <div class="item vc sbercloud" />
        <div class="item vc megaphone" />
        <div class="f1" />
      </div>
    </div>
    <div class="f1" />
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footRoot {
  margin-top: 60px;
  background: transparent;
  height: 44px;
  .footContentRoot {
    display: flex;
    flex-direction: row;
  }
  .copyright {
    color: #8798ad;
  }
  .item {
    height: 18px;
    margin-right: Min(3vw, 30px);
    background-repeat: no-repeat;
    background-size: contain;
  }
  .rusbase {
    width: 65px;
    background-image: url("../assets/rusbase-light.svg");
  }
  .sbercloud {
    width: 129px;
    background-image: url("../assets/sbercloud-light.svg");
  }
  .megaphone {
    width: 102px;
    background-image: url("../assets/megaphone-light.svg");
  }
}
.root-dark .footRoot {
  .rusbase {
    background-image: url("../assets/rusbase-dark.svg");
  }
  .sbercloud {
    background-image: url("../assets/sbercloud-dark.svg");
  }
  .megaphone {
    background-image: url("../assets/megaphone-dark.svg");
  }
}
.sm .footRoot {
  .footContentRoot {
    flex-direction: column-reverse;
    text-align: center;
  }
}
</style>
