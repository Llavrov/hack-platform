<template>
  <div>
    <Xmodal id="logoutModal">
      <div style="text-align: center">
        <h1
          class="minipageHeader"
          v-text="`Выход`"
          style="margin-bottom: 25px"
        />
        <p v-text="'Вы уверены, что хотите выйти?'" />
        <div style="text-align: center">
          <button
            class="btn btn-danger btnLg"
            style="
              margin-top: 28px;
              width: 150px;
              border-radius: 10px;
              margin-right: 20px;
            "
            @click="$root.logOut"
            data-bs-target="#logoutModal"
            data-bs-toggle="modal"
          >
            <span v-text="'Выйти'" />
          </button>
          <button
            class="btn btn-primary btnLg"
            style="margin-top: 28px; width: 150px; border-radius: 10px"
            data-bs-target="#logoutModal"
            data-bs-toggle="modal"
          >
            <span v-text="'Отмена'" />
          </button>
        </div>
      </div>
    </Xmodal>
    <div class="navbarRoot horizPad">
      <div />
      <div style="height: inherit">
        <div class="navbarLogo" @click="$router.push('/')">
          <div class="logoImg" />
        </div>
        <div class="fc" style="float: right; height: 100%">
          <div class="f1" v-if="$root.size !== 'sm'" />
          <div>
            <ul class="nav justify-content-center" v-if="$root.size !== 'sm'">
              <li class="nav-item">
                <router-link class="nav-link" to="/todo" v-text="'Дашборд'" />
              </li>
              <li class="nav-item" v-if="$root.user?.verified">
                <router-link class="nav-link" to="/me/1" v-t="'nav.status'" />
              </li>
              <li class="nav-item" v-if="$root.settings?.show?.news">
                <router-link class="nav-link" to="/news" v-t="'nav.news'" />
              </li>
              <li class="nav-item" v-if="$root.user?.status?.completedProfile">
                <router-link class="nav-link" to="/teams" v-t="'nav.team'" />
              </li>
              <li
                class="nav-item"
                v-if="
                  $root.user?.teamId &&
                  ($root.settings?.show?.solutionEnabled ||
                    $root.settings?.show?.checkpointEnabled)
                "
              >
                <router-link
                  class="nav-link"
                  to="/solution"
                  v-t="'nav.solution'"
                />
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="langDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ru
                </a>
                <ul
                  class="dropdown-menu langDropdownBody"
                  aria-labelledby="navbarDropdown"
                >
                  <li><a class="dropdown-item" href="#">Ru</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown" v-if="$root.isAdmin">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul
                  class="dropdown-menu adminDropdownBody"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <router-link
                      class="nav-link"
                      to="/admin/stats"
                      v-text="'Stats'"
                    />
                  </li>
                  <li>
                    <router-link
                      class="nav-link"
                      to="/admin/config"
                      v-text="'Settings'"
                    />
                  </li>
                  <li>
                    <router-link
                      class="nav-link"
                      to="/admin/usermgmt"
                      v-text="'Users'"
                    />
                  </li>
                  <li>
                    <router-link
                      class="nav-link"
                      to="/admin/teams"
                      v-text="'Teams'"
                    />
                  </li>
                  <li>
                    <router-link
                      class="nav-link"
                      to="/admin/utm"
                      v-text="'Utm'"
                    />
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="#"
                  @click.prevent="
                    $root.lightness =
                      $root.lightness === 'dark' ? 'light' : 'dark'
                  "
                >
                  <unicon
                    name="sun"
                    style="transform: translateY(-4px)"
                    fill="var(--clr)"
                    v-if="$root.lightness === 'dark'"
                  ></unicon>
                  <unicon
                    name="moon"
                    style="opacity: 0.4; transform: translateY(-4px)"
                    fill="var(--clr)"
                    v-else
                  ></unicon>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/logOut"
                  data-bs-target="#logoutModal"
                  data-bs-toggle="modal"
                  @click.prevent
                >
                  Выход
                </router-link>
              </li>
            </ul>
            <div v-else>
              <div style="width: 100%">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="float: right; margin-top: 15px; cursor: pointer"
                  data-bs-target="#menuCollapse"
                  data-bs-toggle="collapse"
                >
                  <path
                    d="M25.6663 21.0058C25.6663 21.647 25.1465 22.1668 24.5053 22.1668H15.1607C14.5195 22.1668 13.9997 21.647 13.9997 21.0058C13.9997 20.3645 14.5195 19.8447 15.1607 19.8447H24.5053C25.1465 19.8447 25.6663 20.3645 25.6663 21.0058Z"
                    fill="var(--clrprim)"
                  />
                  <path
                    d="M25.6663 14.0004C25.6663 14.6417 25.1465 15.1615 24.5053 15.1615H3.49407C2.85283 15.1615 2.33301 14.6417 2.33301 14.0004C2.33301 13.3592 2.85283 12.8394 3.49407 12.8394H24.5053C25.1465 12.8394 25.6663 13.3592 25.6663 14.0004Z"
                    fill="var(--clrprim)"
                  />
                  <path
                    d="M24.5053 8.15561C25.1465 8.15561 25.6663 7.63579 25.6663 6.99455C25.6663 6.35332 25.1465 5.8335 24.5053 5.8335H10.4941C9.85283 5.8335 9.33301 6.35332 9.33301 6.99455C9.33301 7.63579 9.85283 8.15561 10.4941 8.15561H24.5053Z"
                    fill="var(--clrprim)"
                  />
                </svg>
              </div>
              <div class="collapse" id="menuCollapse" style="float: right">
                <ul
                  class="nav justify-content-center"
                  style="
                    flex-direction: column;
                    margin-top: 15px;
                    margin-bottom: 15px;
                  "
                >
                  <li class="nav-item">
                    <router-link
                      class="nav-link"
                      to="/todo"
                      v-text="'Дашборд'"
                    />
                  </li>
                  <li class="nav-item" v-if="$root.user?.verified">
                    <router-link
                      class="nav-link"
                      to="/me/1"
                      v-t="'nav.status'"
                    />
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/news" v-t="'nav.news'" />
                  </li>
                  <li
                    class="nav-item"
                    v-if="$root.user?.status?.completedProfile"
                  >
                    <router-link
                      class="nav-link"
                      to="/teams"
                      v-t="'nav.team'"
                    />
                  </li>
                  <li
                    class="nav-item"
                    v-if="
                      $root.user?.teamRoles?.includes('LEAD') &&
                      ($root.settings?.show?.solutionEnabled ||
                        $root.settings?.show?.checkpointEnabled)
                    "
                  >
                    <router-link
                      class="nav-link"
                      to="/solution"
                      v-t="'nav.solution'"
                    />
                  </li>
                  <li class="nav-item dropdown" v-if="$root.isAdmin">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="adminDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul
                      class="dropdown-menu adminDropdownBody"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <router-link
                          class="nav-link"
                          to="/admin/stats"
                          v-text="'Stats'"
                        />
                      </li>
                      <li>
                        <router-link
                          class="nav-link"
                          to="/admin/config"
                          v-text="'Settings'"
                        />
                      </li>
                      <li>
                        <router-link
                          class="nav-link"
                          to="/admin/usermgmt"
                          v-text="'Users'"
                        />
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <router-link
                      class="nav-link"
                      to="#"
                      @click.prevent="
                        $root.lightness =
                          $root.lightness === 'dark' ? 'light' : 'dark'
                      "
                    >
                      <unicon
                        name="sun"
                        fill="var(--clr)"
                        v-if="$root.lightness === 'dark'"
                      ></unicon>
                      <unicon
                        name="moon"
                        style="opacity: 0.4"
                        fill="var(--clr)"
                        v-else
                      ></unicon>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      class="nav-link"
                      to="/logOut"
                      data-bs-target="#logoutModal"
                      data-bs-toggle="modal"
                      @click.prevent
                    >
                      Выход
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="f1" />
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss">
.navbarRoot {
  position: absolute;
  z-index: 100;
  top: 0;
  background: #ffffff;
  width: 100%;
  min-height: 70px;
  box-shadow: 15px 0px 35px rgba(47, 102, 255, 0.098);
  a.nav-link {
    color: #8798ad;
    padding: 0.5rem Min(calc(100vw / 80), 22px);
    &:hover,
    &:active,
    &:focus,
    &.router-link-active {
      color: scale-color(#8798ad, $lightness: -50%);
    }
  }
  #langDropdown::after {
    transform: translateY(2px);
  }
  .dropdown ul {
    background: var(--bgclr) !important;
    a {
      &:hover,
      &:focus,
      &:active {
        background: var(--bgclr) !important;
      }
      color: var(--clr) !important;
    }
    border: 1px solid #888888 !important;
  }
}
.navbarLogo {
  position: absolute;
  background-color: var(--bgclr2);
  cursor: pointer;
  > .logoImg {
    background-image: url("../assets/logo-light.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }
  padding: 12px;
  box-shadow: 0px 30px 60px -28px rgba(7, 107, 156, 0.15);
  width: 136px;
  height: 136px;
}
.root-dark {
  .navbarLogo > .logoImg {
    background-image: url("../assets/logo-dark.png");
  }
}
.sm {
  .navbarLogo {
    width: 108px;
    height: 108px;
    padding: 9px;
  }
  .navbarRoot {
    min-height: 60px;
  }
}
.root-dark {
  .navbarRoot {
    background: #171822;
    a.nav-link {
      color: #fff;
      opacity: 0.7;
      &:hover,
      &:active,
      &:focus {
        color: #fff;
        opacity: 1;
      }
    }
  }
}
</style>
