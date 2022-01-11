<template>
  <div class="regRoot">
    <Xcenter class="imgRoot" :v="$root.lightness !== 'dark'">
      <div class="img"></div>
    </Xcenter>
    <Xcenter class="formRoot" style="overflow-y: auto">
      <Xmodal id="verifyModal">
        <div style="text-align: center">
          <h1
            class="minipageHeader"
            v-t="'recover.verify.head'"
            style="margin-bottom: 25px"
          />
          <p v-t="'recover.verify.text'" />
          <div style="font-size: 22px">{{ email }}</div>
          <button
            class="btn btn-primary btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            @click="resend"
          >
            <!-- data-bs-target="#verifyModal"
            data-bs-toggle="modal" -->
            <!-- <span v-t="'recover.verify.action'" /> -->
            Выслать еще раз
          </button>
        </div>
      </Xmodal>
      <Xmodal id="passwordRulesModal">
        <div style="text-align: center">
          <h1 class="minipageHeader" style="margin-bottom: 25px">
            Небезопасный пароль
          </h1>
          <div style="text-align: left">
            <p>Введенный пароль не соответствует требованиям безопасности:</p>
            <ul>
              <li>Пароль должен быть не короче 8 символов</li>
              <li>Пароль должен состоять из латинских символов и цифр</li>
              <li>Пароль должен содержать не менее одной цифры</li>
              <li>Пароль должен содержать не менее одной строчной буквы</li>
              <li>Пароль должен содержать не менее одной прописной буквы</li>
            </ul>
          </div>
          <button
            class="btn btn-primary btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            data-bs-target="#passwordRulesModal"
            data-bs-toggle="modal"
          >
            ОК
          </button>
        </div>
      </Xmodal>
      <Xmodal id="emailExistsModal">
        <div style="text-align: center">
          <h1 class="minipageHeader" style="margin-bottom: 25px">
            Неправильная почта
          </h1>
          <div style="text-align: left">
            <p>
              Пользователь с введенной почтой существует. Пожалуйста, введите
              другую почту.
            </p>
          </div>
          <button
            class="btn btn-primary btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            data-bs-target="#emailExistsModal"
            data-bs-toggle="modal"
          >
            ОК
          </button>
          <button
            class="btn3 btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            @click="
              $router.push(`/recover?email=${encodeURIComponent(this.email)}`)
            "
            data-bs-target="#emailExistsModal"
            data-bs-toggle="modal"
          >
            Восстановить пароль
          </button>
        </div>
      </Xmodal>
      <div class="formBlock">
        <div v-if="regNotOpenYet || regClosed">
          <h1 class="minipageHeader">Регистрация закрыта</h1>
          <div class="regToLogIn" style="text-align: center">
            <span v-t="'reg.haveq'" />&nbsp;
            <router-link to="/logIn" v-t="'reg.toLogIn'" class="lbtn" />
          </div>
        </div>
        <template v-else>
          <h1 class="minipageHeader" v-t="'reg.head'"></h1>
          <div class="regSocial">
            <div class="f1" />
            <div class="social google" />
            <div class="social facebook" />
            <div class="social github" />
            <div class="f1" />
          </div>
          <XorLined />
          <form @submit.prevent="register">
            <!-- <div class="fr">
              <Xinput
                style="flex-basis: 50%"
                id="fname"
                v-model="fname"
                label="reg.fname"
              />
              <div style="flex-basis: 12px" />
              <Xinput
                style="flex-basis: 50%"
                id="lname"
                v-model="lname"
                label="reg.lname"
              />
            </div> -->
            <Xinput id="phone" v-model="phone_" label="reg.phone" />
            <Xinput
              id="email"
              v-model="email"
              label="reg.email"
              :validate="validators.email"
            />
            <Xinput
              id="password"
              v-model="password"
              label="reg.password"
              pwd="t"
              @input="pwdDirty = true"
            />
            <div
              style="
                text-align: left;
                font-size: 0.8em;
                font-weight: 300;
                opacity: 0.6;
              "
              v-if="pwdDirty"
            >
              <div v-if="pwdShort">Пароль должен быть не короче 8 символов</div>
              <div v-if="pwdNonLatin">
                Пароль должен состоять из латинских символов и цифр
              </div>
              <div v-if="pwdNoNum">
                Пароль должен содержать не менее одной цифры
              </div>
              <div v-if="pwdNoSmall">
                Пароль должен содержать не менее одной строчной буквы
              </div>
              <div v-if="pwdNoCapital">
                Пароль должен содержать не менее одной прописной буквы
              </div>
            </div>
            <div class="form-check" style="margin-bottom: 36px">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="agree"
                id="agree"
              />
              <label
                class="form-check-label"
                for="agree"
                v-html="$root.settings.conventionString"
              >
              </label>
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
              :disabled="
                !agree ||
                !!validators.email(email) ||
                pwdShort ||
                pwdNoSmall ||
                pwdNoCapital ||
                pwdNonLatin ||
                pwdNoNum
              "
              class="btn btn-lg btn-primary"
            >
              <span v-t="'reg.create'"></span>
            </button>
            <div class="regToLogIn" style="text-align: center">
              <span v-t="'reg.haveq'" />&nbsp;
              <router-link to="/logIn" v-t="'reg.toLogIn'" class="lbtn" />
            </div>
          </form>
        </template>
      </div>
    </Xcenter>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  name: "Register",
  data() {
    return {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      password: "",
      agree: false,
      pwdDirty: false,
    };
  },
  computed: {
    phone_: {
      get() {
        return this.transforms.phone(this.phone);
      },
      set(mew) {
        mew = mew.replace(/\D/g, "");
        if (this.transforms.phone(this.phone) === this.transforms.phone(mew)) {
          document.getElementById("phone").value = this.phone_;
        } else {
          this.phone = mew;
        }
      },
    },
    pwdShort() {
      return (this.password?.length || 0) < 8;
    },
    pwdNoSmall() {
      return !/[a-z]/g.test(this.password);
    },
    pwdNoCapital() {
      return !/[A-Z]/g.test(this.password);
    },
    pwdNoNum() {
      return !/[\d]/g.test(this.password);
    },
    pwdNonLatin() {
      return !/^[\dA-Za-z]+$/g.test(this.password);
    },
    regNotOpenYet() {
      return this.transforms.dateFromServer(
        this.$root.settings.timeOpen,
        false,
        (it) => it.unix() > Moment().unix()
      );
    },
    regClosed() {
      return this.transforms.dateFromServer(
        this.$root.settings.timeClose,
        false,
        (it) => it.unix() < Moment().unix()
      );
    },
  },
  methods: {
    async register() {
      // this.checkPwd();
      // if (!this.password?.length) {
      //   return;
      // }
      localStorage.setItem("e", this.email);
      try {
        await this.http.post("/auth/register", {
          email: this.email,
          password: this.password,
          firstName: this.fname,
          surname: this.lname,
          phoneNumber: this.phone,
        });
        this.showModal("verifyModal");
      } catch ([e, body]) {
        if (
          (await body).message === "An account for this email already exists"
        ) {
          this.showModal("emailExistsModal");
        }
      }
    },
    checkPwd() {
      if (
        !(
          /[a-z]/g.test(this.password) &&
          /[A-Z]/g.test(this.password) &&
          /[\d]/g.test(this.password) &&
          (this.password?.length || 0) >= 8
        )
      ) {
        this.password = "";
        this.showModal("passwordRulesModal");
      }
    },
    showModal(id) {
      new this.$bs.Modal(document.getElementById(id)).show();
    },
    async resend() {
      await this.http.post("/auth/verify/resend", this.email);
    },
  },
};
</script>

<style lang="scss">
.regRoot {
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
  }
  .regSocial {
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
  .regOrLined {
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
  .regToLogIn {
    font-size: 16px;
  }
}
.root-dark .regRoot {
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
.md .regRoot {
  .imgRoot {
    .img {
      width: 210px;
      height: 210px;
    }
  }
}
.sm .regRoot {
  .imgRoot {
    max-height: 165px;
    flex-grow: 1;
    .img {
      width: 100px;
      height: 100px;
    }
  }
  flex-direction: column;
  .imgRoot {
    flex-grow: 1;
  }
  .formRoot {
    flex-grow: 4;
  }
  .regHead {
    margin-bottom: 20px;
  }
  .regSocial {
    margin-bottom: 20px;
  }
  .formBlock > form > div {
    margin-bottom: 19px;
  }
  [for="flexCheckDefault"] {
    font-size: 12px;
  }
  .regToLogIn {
    font-size: 14px;
  }
}
</style>
