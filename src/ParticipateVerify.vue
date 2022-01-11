<template>
  <div style="width: 100vw; min-height: 100vh">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="participateVerifyRoot pageContentRoot">
        <div style="width: 100%; text-align: center">
          <h1 class="pageHeader" v-t="`participateVerify.head`" />
        </div>
        <div class="mainContent">
          <h1 class="minipageHeader" v-t="`participateVerify.sub`" />
          <div class="social fr">
            <div class="f1" />
            <div class="facebook" />
            <div class="instagram" />
            <div class="twitter" />
            <div class="pinterest" />
            <div class="in" />
            <div class="f1" />
          </div>
          <Xinput
            id="addInfo"
            label="participateVerify.addInfo"
            :placeholder="$t(`participateVerify.addInfoPh`)"
            area="t"
            v-model="addInfo"
          />
          <div style="text-align: center" class="action">
            <button
              class="btn btn-primary btnLg"
              style="width: 300px"
              v-t="`participateVerify.action`"
              @click="verify"
            />
          </div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
export default {
  name: "ParticipateVerify",
  data() {
    return {
      addInfo: "",
    };
  },
  methods: {
    async verify() {
      await this.http.post(`/users/${this.$root.user.id}/confirm`, "{}", null);
      await this.$root.updateUser();
      this.$router.push("/todo");
    },
  },
};
</script>

<style lang="scss">
.participateVerifyRoot {
  max-width: 830px !important;
  h2.pageHeader {
    margin-bottom: 37px;
  }
  .mainContent {
    background: #ffffff;
    box-shadow: 0px 15px 30px rgba(7, 107, 156, 0.05);
    border-radius: 2px;
    padding: 36px 30px 30px 30px;
  }
  .minipageHeader {
    text-align: center;
    max-width: 470px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 28px;
  }
  .social {
    width: 100%;
    margin-bottom: 50px;
    > div {
      height: 30px;
      width: 30px;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
    .facebook {
      background-image: url("./assets/social-facebook.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .instagram {
      background-image: url("./assets/social-instagram.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .twitter {
      background-image: url("./assets/social-twitter.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .pinterest {
      background-image: url("./assets/social-pinterest.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .in {
      background-image: url("./assets/social-in.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .action {
    margin-top: 40px;
  }
}

.md .participateVerifyRoot {
  h2.pageHeader {
    margin-bottom: 51px;
  }
}

.sm .participateVerifyRoot {
  h2.pageHeader {
    margin-bottom: 31px;
  }
  .mainContent {
    padding-left: 18px;
    padding-right: 18px;
  }
  .social {
    margin-bottom: 30px;
  }
}
</style>
