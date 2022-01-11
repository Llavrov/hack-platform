<template>
  <div class="linRoot">
    <Xcenter class="imgRoot" :v="$root.lightness !== 'dark'">
      <div class="img"></div>
    </Xcenter>
    <Xcenter class="formRoot">
      <div class="formBlock">
        <!-- <div v-html="ms" /> -->
        <h1 class="minipageHeader" v-t="'lin.head'"></h1>
        <div class="linSocial">
          <div class="f1" />
          <div class="social google" />
          <div class="social facebook" />
          <div class="social github" />
          <div class="f1" />
        </div>
        <XorLined />
        <div
          v-if="incorrect"
          class="root-dark"
          style="margin-bottom: 25px; text-align: center; background: inherit"
        >
          <button
            class="btn2"
            v-text="`Не удалось войти с заданными данными!`"
            @click="incorrect = false"
          />
        </div>
        <form @submit.prevent="logIn">
          <div>
            <label for="email" v-t="'lin.email'" />
            <input
              class="form-control"
              id="email"
              placeholder="example@gmail.com"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" style="width: 100%">
              <span v-t="'lin.password'" />
              <router-link
                tabindex="-1"
                to="/recover"
                v-t="'lin.passwordForget'"
                style="float: right"
              />
            </label>
            <input
              class="form-control"
              id="password"
              type="password"
              v-model="password"
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
            "
            class="btn btn-lg btn-primary"
          >
            <span v-t="'lin.enter'" />
          </button>
          <div class="linToLogIn" style="text-align: center">
            <span v-t="'lin.havenotq'" />&nbsp;
            <router-link to="/register" v-t="'lin.toReg'" class="lbtn" />
          </div>
        </form>
      </div>
    </Xcenter>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      email: localStorage.getItem("e"),
      password: null,
      incorrect: false,
    };
  },
  methods: {
    async logIn() {
      try {
        this.$root.user = await this.$root.logIn("PASSWORD", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/todo");
      } catch (e) {
        this.incorrect = true;
      }
    },
  },
};
</script>

<style lang="scss">
.linRoot {
  display: flex;
  height: 100vh;
  flex-direction: row;
  .minipageHeader {
    margin-bottom: 41px;
  }
  .imgRoot {
    background: url("./assets/login-bg-light.png") no-repeat center center;
    background-size: Max(100vw, 200vh) Max(50vw, 100vh);
    flex-grow: 5;
    .img {
      width: 384px;
      height: 384px;
      background: url("./assets/logo-light.png") no-repeat center center;
      background-size: contain;
    }
  }
  .formBlock {
    width: 350px;
  }
  .formRoot {
    min-width: Min(100vw, 460px);
    flex-grow: 1;
    background: var(--bgclr);
  }
  .linSocial {
    display: flex;
    flex-direction: row;
    margin-bottom: 29px;
    .social {
      height: 50px;
      width: 50px;
      background-size: contain;
      &.google {
        background-image: url("./assets/google-light.svg");
      }
      &.facebook {
        background-image: url("./assets/facebook-light.svg");
      }
      &.github {
        background-image: url("./assets/github-light.svg");
      }
      &:not(.google) {
        margin-left: 15px;
      }
    }
  }
  .linOrLined {
    overflow: hidden;
    text-align: center;
    color: #8798ad;
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
  .formBlock > form > div {
    margin-bottom: 26px;
  }
  [for="flexCheckDefault"] {
    > span {
      color: var(--clr);
    }
    transform: translateY(2px);
    opacity: 1;
  }
  .linToLogIn {
    font-size: 16px;
  }
}
.root-dark .linRoot {
  .imgRoot {
    background: url("./assets/login-bg-dark.png") no-repeat center center;
    background-size: Max(100vw, 200vh) Max(50vw, 100vh);
    .img {
      background: url("./assets/logo-dark.png") no-repeat center center;
      background-size: contain;
    }
  }
  .social {
    &.google {
      background-image: url("./assets/google-dark.svg");
    }
    &.facebook {
      background-image: url("./assets/facebook-dark.svg");
    }
    &.github {
      background-image: url("./assets/github-dark.svg");
    }
  }
}
.lg .linRoot {
  flex-direction: row-reverse;
}
.md .linRoot {
  .imgRoot {
    .img {
      width: 210px;
      height: 210px;
    }
  }
}
.sm .linRoot {
  flex-direction: column;
  .imgRoot {
    max-height: 165px;
    flex-grow: 1;
    .img {
      width: 100px;
      height: 100px;
    }
  }
  .formRoot {
    flex-grow: 4;
  }
  .linHead {
    margin-bottom: 20px;
  }
  .linSocial {
    margin-bottom: 20px;
  }
  .formBlock > form > div {
    margin-bottom: 19px;
  }
  [for="flexCheckDefault"] {
    font-size: 12px;
  }
  .linToLogIn {
    font-size: 14px;
  }
}
</style>
