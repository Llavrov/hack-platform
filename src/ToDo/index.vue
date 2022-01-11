<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <Xmodal id="participateVerifyModal">
      <div style="text-align: center">
        <h1
          class="minipageHeader"
          v-t="'todo.verify.head'"
          style="margin-bottom: 25px"
        />
        <p v-t="'todo.verify.text'" />
        <div style="font-size: 20px">
          {{ fmtDate($root.settings.timeConfirm) }}
        </div>
        <div style="text-align: center">
          <button
            class="btn btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            @click="refuse"
          >
            <span v-t="'todo.verify.refuse'" style="color: #707070" />
          </button>
          <div
            style="height: 100%; width: 20px; display: inline-block"
            v-if="$root.size !== 'sm'"
          />
          <button
            class="btn btn-primary btnLg"
            style="margin-top: 28px; width: 230px; border-radius: 10px"
            @click="toVerify"
            data-bs-dismiss="modal"
          >
            <span v-t="'todo.verify.action'" />
          </button>
        </div>
      </div>
    </Xmodal>
    <div class="horizPad">
      <div id="mdroot" v-html="ms" />
      <div class="todoRoot pageContentRoot">
        <div v-if="$root.size !== 'sm'" class="pageTitle">
          <h1 v-text="$root.username" class="pageHeader" />
          <button
            class="btn2"
            v-text="`Почта не подтверждена`"
            v-if="!$root.user?.verified"
            @click="resendVerify"
          />
          <button
            class="btn2"
            v-t="`todo.profileUnfilled`"
            v-else-if="!$root.user?.status?.completedProfile"
            @click="$router.push('/me')"
          />
          <button
            class="btn2"
            v-text="`Вы не в команде`"
            v-else-if="!$root.team"
          />
        </div>
        <div v-else class="pageTitle">
          <div>
            <h1 v-text="$root.username" class="pageHeader" />
          </div>
          <div>
            <button class="btn2" v-t="`todo.profileUnfilled`" />
          </div>
        </div>
        <div class="deadline" v-if="$root.show.registrationDeadline">
          <span v-t="`todo.registerDeadline`" />&nbsp;<span
            style="font-weight: bold"
            v-text="fmtDate($root.settings.timeClose)"
          />
        </div>
        <div class="deadline" v-if="$root.show.showAcceptDeadlineEnabled">
          <span v-t="`todo.acceptDeadline`" />&nbsp;<span
            style="font-weight: bold"
            v-text="fmtDate($root.settings.timeConfirm)"
          />
        </div>
        <div>
          <XXitem :s="$root.user?.verified" num="1">
            <template v-slot:default>
              <h2
                v-t="`todo.1.title`"
                @click.prevent="resendVerify"
                style="cursor: pointer"
              />
            </template>
            <template v-slot:1>
              <button class="btn2" @click="resendVerify">
                <span>Выслать письмо еще раз</span>
              </button>
            </template>
          </XXitem>
          <XXitem num="2" :s="$root.user?.status?.completedProfile">
            <template v-slot:default>
              <h2
                v-t="`todo.2.title`"
                @click.prevent="$root.user?.verified && $router.push('/me')"
                :style="$root.user?.verified ? `cursor: pointer` : ``"
              />
            </template>
            <template v-slot:1>
              <button class="btn2" @click="$router.push('/me')">
                <span v-t="`todo.2.1`" /><XAngleRight
                  style="transform: translateY(-1px); margin-left: 7px"
                />
              </button>
            </template>
          </XXitem>
          <XXitem num="3" :s="$root.user.teamId">
            <template v-slot:default>
              <h2 v-t="`todo.3.title`" style="cursor: pointer" />
            </template>
            <template v-slot:1 v-if="$root.user?.status?.completedProfile">
              <button
                class="btn2"
                style="margin-right: 10px"
                @click="$router.push('/teams/1')"
              >
                <span v-t="`todo.3.1`" /><XAngleRight
                  style="transform: translateY(-1px); margin-left: 7px"
                />
              </button>
            </template>
            <template v-slot:2 v-if="$root.user?.status?.completedProfile">
              <button class="btn2" @click="$router.push('/teams/2')">
                <span v-t="`todo.3.2`" /><XAngleRight
                  style="transform: translateY(-1px); margin-left: 7px"
                />
              </button>
            </template>
          </XXitem>
          <XXitem num="4" :s="$root.user?.status?.admittedToParticipation">
            <template v-slot:default>
              <h2 v-if="$root.show?.onlineActivitiesEnabled">
                <span v-t="`todo.4.title`" />
                <router-link class="lbtn" to="/activities"
                  >&nbsp;#OnlineActivities</router-link
                >
              </h2>
              <h2 v-else>Жди приглашение</h2>
            </template>
            <template v-slot:1>
              <button
                class="btn2"
                @click="$router.push('/activities')"
                v-if="$root.show?.onlineactivities"
              >
                <span v-t="`todo.4.1`" /><XAngleRight
                  style="transform: translateY(-1px); margin-left: 7px"
                />
              </button>
            </template>
          </XXitem>
          <XXitem num="5" :s="$root.user?.status?.confirmedParticipation">
            <template v-slot:default>
              <h2 v-t="`todo.5.title`" />
            </template>
            <template
              v-slot:1
              v-if="
                $root.user?.status?.admittedToParticipation &&
                !$root.user?.status?.confirmedParticipation
              "
            >
              <button
                class="btn3"
                v-t="`todo.5.1`"
                style="font-weight: 700"
                @click="showModal"
              />
            </template>
          </XXitem>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
import XXitem from "./Item";
export default {
  name: "index",
  components: { XXitem },
  data() {
    return {};
  },
  methods: {
    showModal() {
      new this.$bs.Modal(
        document.getElementById("participateVerifyModal")
      ).show();
    },
    refuse() {
      this.http.post(`/users/${this.$root.user.id}/decline`);
    },
    toVerify() {
      this.$router.push("/participateVerify");
    },
    resendVerify() {
      this.http.post("/auth/verify/resend", this.$root.user.email);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.todoRoot {
  .pageHeader {
    margin-bottom: 0;
  }
  .pageTitle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 25px;
    > button {
      margin-left: 16px;
    }
  }
  .deadline {
    text-align: center;
    color: #8798ad;
    &:nth-child(2) {
      margin-bottom: 13px;
    }
    &:nth-child(3) {
      margin-bottom: 50px;
    }
  }
}
.sm .todoRoot {
  .pageHeader {
    margin-bottom: 10px;
  }
  .pageTitle {
    display: unset;
    flex-direction: unset;
    justify-content: unset;
    > div {
      width: 100%;
      text-align: center;
    }
  }
  .deadline {
    &:nth-child(2) {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    &:nth-child(3) {
      margin-bottom: 15px;
    }
  }
}
#participateVerifyModal > .modal-dialog {
  max-width: 600px;
  width: 600px;
}
.sm #participateVerifyModal > .modal-dialog {
  max-width: 330px;
  width: 330px;
}
</style>
