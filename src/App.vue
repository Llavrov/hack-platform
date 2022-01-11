<template>
  <div :class="`root-${lightness} ${size}`">
    <router-view v-if="render"></router-view>
    <div
      id="toastRoot"
      style="position: fixed; top: 70px; right: 10px; z-index: 9999"
    ></div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  data() {
    return {
      size: this.getSize(),
      user: null,
      token_: null,
      refreshToken_: null,
      team: null,
      render: false,
      settings: {},
      show: {},
      width: window.innerWidth,
      height: window.innerHeight,
      theme_: localStorage.getItem("theme"),
    };
  },
  computed: {
    lightness: {
      get() {
        if (
          this.theme_ === "dark" ||
          (!this.theme_ &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          return "dark";
        }
        return "light";
      },
      set(mew) {
        localStorage.setItem("theme", mew);
        this.theme_ = mew;
      },
    },
    token: {
      get() {
        if (!this.token_) {
          this.token_ = localStorage.getItem("t") || ""; // eslint-disable-line
        }
        return this.token_;
      },
      set(mew) {
        localStorage.setItem("t", mew);
        this.token_ = mew;
      },
    },
    refreshToken: {
      get() {
        if (!this.refreshToken_) {
          this.refreshToken_ = localStorage.getItem("r") || ""; // eslint-disable-line
        }
        return this.refreshToken_;
      },
      set(mew) {
        localStorage.setItem("r", mew);
        this.refreshToken_ = mew;
      },
    },
    isAdmin() {
      return this.user?.role === "ADMIN";
    },
    username() {
      const name = `${this.user?.profile?.firstName || ""} ${
        this.user?.profile?.surname || ""
      }`;
      if (name.length <= 1) {
        return "Не заполнено";
      }
      return name;
    },
  },
  methods: {
    spawnToast(text) {
      const p = document.createElement("p");
      p.innerText = text;
      text = p.innerHTML;
      const toast = document.createElement("div");
      toast.classList.add("toast");
      toast.classList.add("align-items-center");
      toast.id = this.mkId();
      toast.style["margin-bottom"] = "10px";
      toast.innerHTML = `
      <div class="d-flex" style="background:var(--bgclr);border:1px solid rgba(var(--clrr),.3)">
        <div class="toast-body">${text}</div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>`;
      const toastRoot = document.getElementById("toastRoot");
      toastRoot.appendChild(toast);
      const bsToast = new this.$bs.Toast(toast);
      bsToast.show();
      setTimeout(() => {
        bsToast.dispose();
        toastRoot.removeChild(toast);
      }, 10000);
    },
    getSize() {
      if (window.innerWidth <= 576) {
        return "sm";
      }
      if (window.innerWidth <= 916) {
        return "md";
      }
      return "lg";
    },
    async updateTeam() {
      return this.http
        .get("/teams/myTeam")
        .then((res) => {
          this.team = res;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async updateUser() {
      const oldTeam = this.user?.teamId;
      this.user = await this.fetchUser();
      if (!this.user) {
        this.logOut();
      }
      if (this.user?.teamId !== oldTeam) {
        return this.updateTeam();
      }
    },
    async fetchUser() {
      const { token, refreshToken } = this;
      if (token?.length) {
        try {
          const res = await this.http.get(`/users/${jwt_decode(token).sub}`);
          return res;
        } catch (e) {
          this.token = "";
          return await this.fetchUser();
        }
      }
      if (refreshToken?.length) {
        try {
          return await this.logIn("REFRESH_TOKEN", { refreshToken });
        } catch (e) {
          this.refreshToken = "";
          return await this.fetchUser();
        }
      }
      return null;
    },
    async logIn(type, body) {
      const res = await this.http.post("/auth/login", {
        email: body.email || localStorage.getItem("e"),
        grantType: type,
        ...body,
      });
      this.refreshToken = res.refreshToken || this.refreshToken;
      this.token = res.accessToken || this.token;
      localStorage.setItem("e", res.user.email);
      return {
        ...res.user,
        password: null,
      };
    },
    async updateSettings() {
      [this.settings] = await this.http.get("/settings");
      this.tasks = await this.http.get("/tracks");
      this.show = this.settings.show || {};
    },
    async logOut() {
      this.token = null;
      this.refreshToken = null;
      await this.$router.push("/logIn");
      this.user = null;
    },
    checkRoute(route = this.$route) {
      if (route.path.startsWith("/verification")) {
        this.$router.replace("/todo");
      }
      if (
        !this.user &&
        !(
          route.name === "/logIn" ||
          route.name === "/register" ||
          route.name === "/recover" ||
          route.name === "/tou" ||
          route.name === "/privacy"
        )
      ) {
        this.$router.push("/logIn");
      } else if (this.user && (route.path.length || 0) < 2) {
        this.$router.replace("/todo");
      }
    },
    showModal(id) {
      new this.$bs.Modal(document.getElementById(id)).show();
    },
  },
  watch: {
    $route(mew) {
      if (this.render) {
        this.checkRoute(mew);
      }
    },
    user() {
      this.updateTeam();
    },
  },
  mounted() {
    window.root = this;
    window.addEventListener("resize", () => {
      this.size = this.getSize();
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
    (async () => {
      this.http.auth.get = () => {
        if (!this.token?.length || this.token === "null") {
          return {};
        }
        return {
          Authorization: `Bearer ${this.token}`,
        };
      };
      try {
        await this.updateUser();
        await this.updateSettings();
        await this.checkRoute();
      } catch (e) {
        console.error(e);
      }
      this.render = true;
    })();
  },
};
</script>

<style></style>
