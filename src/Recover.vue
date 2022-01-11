<template>
  <div>
    <div class="recoverRoot">
      <div class="f1" />
      <div class="recoverView">
        <div class="f1" />
        <div class="recoverLogo"></div>
        <div class="f1" />
        <form class="recoverForm" @submit.prevent="recover">
          <div class="recoverHeader">
            <router-link
              to="/logIn"
              style="position: absolute; font-size: 19px; margin-left: 20px"
            >
              <svg
                width="11"
                height="19"
                viewBox="0 0 11 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M3.6964 9.50402L10.701 2.39585C10.8939 2.2006 11 1.93954 11 1.66119C11 1.38267 10.8939 1.12177 10.701 0.926211L10.0872 0.303691C9.89467 0.107821 9.63725 0 9.36294 0C9.08862 0 8.83151 0.107821 8.63879 0.303691L0.298675 8.76657C0.105194 8.96275 -0.000757062 9.22489 4.07839e-06 9.50355C-0.000757062 9.78345 0.105041 10.0453 0.298675 10.2416L8.63103 18.6963C8.82375 18.8922 9.08086 19 9.35533 19C9.62964 19 9.88676 18.8922 10.0796 18.6963L10.6933 18.0738C11.0926 17.6686 11.0926 17.009 10.6933 16.604L3.6964 9.50402Z"
                  fill="#061624"
                />
              </svg>
            </router-link>
            <h1 class="minipageHeader" v-t="'recover.head'" />
          </div>
          <p
            style="color: #8798ad; margin-bottom: 30px; text-align: center"
            v-t="'recover.text'"
          />
          <div style="margin-bottom: 42px">
            <label for="email" v-t="'recover.email'" />
            <input
              class="form-control"
              id="email"
              placeholder="example@gmail.com"
              v-model="email"
            />
          </div>
          <button
            style="
              width: 100%;
              font-size: 16px;
              border-radius: 10px;
              font-weight: bold;
              height: calc(1em + 30px);
              margin-bottom: 20px;
              background-color: #45dcd3;
              border: none;
            "
            class="btn btn-lg btn-primary"
          >
            <span v-t="'recover.action'" />
          </button>
        </form>
        <div style="flex-grow: 3" />
      </div>
      <div class="f1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Recover",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async recover() {
      await this.http.post("/auth/reset", {
        email: this.email,
      });
    },
  },
  mounted() {
    this.email = this.$route?.query?.email || "";
  },
};
</script>

<style lang="scss">
.recoverRoot {
  background: url("./assets/login-bg-light.png") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  .recoverView {
    display: flex;
    flex-direction: column;
    width: 430px;
    height: 100%;
  }
  .recoverLogo {
    margin-left: auto;
    margin-right: auto;
    width: 158px;
    height: 158px;
    background-image: url("./assets/logo-light.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .recoverForm {
    background: var(--bgclr);
    box-shadow: 0px 30px 60px -28px rgba(7, 107, 156, 0.15);
    border-radius: 2px;
    padding: 33px 40px 40px 40px;
    > * {
      width: 100%;
    }
  }
  .recoverHeader {
    margin-bottom: 25px;
  }
}
.md {
  .recoverRoot {
    .recoverLogo {
      width: 210px;
      height: 210px;
    }
  }
}
.sm {
  .recoverRoot {
    .recoverView {
      width: 398px;
    }
  }
}
</style>
