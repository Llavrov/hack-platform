<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <Xmodal id="participantDetailsModal">
      <div
        v-if="filteredElements[showElement]"
        style="min-width: min(400px, 90vw)"
      >
        <div style="text-align: center">
          <h1
            class="minipageHeader"
            v-text="filteredElements[showElement].name"
            style="margin-bottom: 25px"
          />
          <div class="teamBadges">
            <div
              v-for="item of filteredElements[showElement].badge"
              v-text="translateRole(item)"
              :key="item"
              class="bdg"
            />
          </div>
          <p
            v-text="filteredElements[showElement].descr"
            style="color: #8798ad; margin-bottom: 24px"
          />
          <p
            v-if="filteredElements[showElement].myContact?.length"
            v-t="`team.details.toContact`"
            style="font-weight: bold; margin-bottom: 12px; color: #8798ad"
          />
        </div>
        <div
          class="badged n1"
          v-if="filteredElements[showElement].myContact?.length"
          @click="toClipboard2('userContactCp')"
        >
          <div>
            <Xinput
              id="userContactCp"
              :modelValue="filteredElements[showElement].myContact"
            />
          </div>
          <div class="copyBadge">
            <div class="central">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Xmodal>
    <div class="horizPad" style="min-height: calc(100vh - 110px)">
      <div />
      <div class="teamRoot pageContentRoot">
        <h1 class="pageHeader" v-t="`team.head`" />
        <XXsubnav
          :t="navType"
          :modelValue="tab"
          @update:modelValue="setTab"
          style="max-width: min(770px, 90vw)"
        />
        <div :class="`teamContentRoot tab${tab}`">
          <template v-if="tab === 1">
            <h1 class="minipageHeader" v-t="`team.${tab}.head`" />
            <p class="explText" v-t="`team.${tab}.text`" />
            <Xinput id="joinCode" label="team.joinCode" v-model="joinCode" />
            <div class="fr">
              <div class="f1" />
              <button
                class="btn btn-primary btnLg"
                style="width: 230px; margin-left: auto; margin-right: auto"
                v-t="`team.${tab}.action`"
                @click="joinByCode"
              />
              <div class="f1" />
            </div>
          </template>
          <template v-else-if="tab === 2">
            <h1 class="minipageHeader" v-t="`team.${tab}.head`" />
            <p class="explText" v-t="`team.${tab}.text`" />
            <Xinput
              id="teamName"
              label="team.teamName"
              v-model="teamName"
              placeholder="Титры"
            />
            <!-- <Xinput
              id="teamDescription"
              label="team.teamDescription"
              v-model="teamDescription"
              area="t"
            /> -->
            <div class="fr">
              <div class="f1" />
              <button
                class="btn btn-primary btnLg"
                style="width: 230px; margin-left: auto; margin-right: auto"
                v-t="`team.${tab}.action`"
                @click="mkTeam"
              />
              <div class="f1" />
            </div>
          </template>
          <template v-else-if="tab === 3">
            <h1 class="minipageHeader">
              <span v-t="`team.${tab}.head`" />&nbsp;
              <span style="color: var(--clrprim)">{{ teamName }}</span>
            </h1>
            <p class="explText n1" v-t="`team.${tab}.text`" />
            <div class="badged n1" @click="toClipboard2('teamCodeCp')">
              <div>
                <Xinput id="teamCodeCp" :modelValue="$root.team?.teamCode" />
              </div>
              <div class="copyBadge">
                <div class="central">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <XorLined />
            <div class="badged n2" @click="toClipboard2('teamCodeLinkCp')">
              <div>
                <Xinput id="teamCodeLinkCp" :modelValue="joinLink" />
              </div>
              <div class="copyBadge">
                <div class="central">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p class="explText n2" v-t="`team.${tab}.text2`" />
            <!-- <div
              style="height: 30px; background-color: var(--main-bgclr)"
            ></div> -->
            <div
              style="
                width: 100%;
                margin-top: 30px;
                border-top: 1px solid #8798ad40;
              "
            >
              <p
                class="explText n3"
                style="margin-bottom: 20px; padding-top: 30px"
              >
                Для поиска участников в свою команду заполните:
              </p>
            </div>
            <Xselect
              id="rolesSelect"
              label="team.rolesSelect"
              :options="options.rolesSelect"
              :max="3"
              :modelValue="rolesSelect"
              @update:modelValue="updateTeamRoles"
            />
            <div style="height: 25px"></div>
            <Xinput
              id="myDescr"
              label="Опиши команду"
              v-model="teamDescription"
              placeholder="Описание команды"
              area="t"
              rows="6"
            />
            <div style="height: 25px"></div>
            <Xinput
              id="myDescr"
              label="Контакт"
              v-model="teamContact"
              placeholder="Сюда будут обращаться потенциальные члены"
            />
            <div style="height: 25px"></div>
            <button class="btn btn-primary">Сохранить</button>
          </template>
          <template v-else-if="tab === 4">
            <h1 class="minipageHeader" v-t="`team.${tab}.head`" />
            <p class="explText" v-t="`team.${tab}.text`" />
            <Xselect
              id="myRole"
              label="team.myRole"
              :max="3"
              v-model="myRole"
              :options="options.rolesSelect"
            />
            <Xinput
              id="myContact"
              label="Твои контакты для связи с участниками"
              v-model="myContact"
            />
            <Xinput
              id="myDescr"
              label="team.myDescr"
              v-model="myDescr"
              :placeholder="$t('team.myDescrPh')"
              area="t"
              rows="6"
            />
            <div class="fr">
              <div class="f1" />
              <button
                class="btn btn-primary btnLg"
                style="width: 230px; margin-left: auto; margin-right: auto"
                v-t="`team.${tab}.action`"
                @click.prevent="savePersonal"
              />
              <div class="f1" />
            </div>
          </template>
          <template v-else>
            <h1 class="minipageHeader" v-t="`team.56.head`" />
            <p class="explText">
              <span v-t="`team.56.text11`" />&nbsp;
              <span
                v-t="{ path: `team.56.text12`, args: { invitesLeft } }"
                style="font-weight: bold"
              />&nbsp;
              <span v-t="`team.56.text13`" />
              <br />
              <br />
              <span v-t="`team.56.text21`" />
              <span v-t="`team.56.action`" style="font-weight: bold" />
              <span v-t="`team.56.text23`" />
            </p>
            <div class="teamFindSubnav">
              <XXsubnav :t="3" :modelValue="tab" @update:modelValue="setTab" />
              <div />
              <div>
                <Xselect
                  style="transform: translate(-4px)"
                  id="searchRoles"
                  v-model="searchRoles"
                  placeholder="Роли"
                  :options="options.rolesSelect"
                  :max="3"
                  @update:modelValue="fetchItems()"
                />
              </div>
              <div>
                <div class="badged n1">
                  <div>
                    <Xinput
                      id="teamFind"
                      :placeholder="$t('team.teamFindPl')"
                      v-model="teamFind"
                      @input="fetchItems()"
                    />
                  </div>
                  <div class="copyBadge">
                    <div class="central">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.9999 20.9999L16.6499 16.6499"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="teamFindResults">
              <div
                v-for="(it, i) of filteredElements"
                class="teamFindResult"
                :key="it.id"
                @click="showParticipant(i)"
              >
                <h4 v-text="it.name" />
                <div class="teamBadges">
                  <div
                    v-for="item of it.badge"
                    v-text="translateRole(item)"
                    :key="item"
                    class="bdg"
                  />
                </div>
                <p
                  class="explText"
                  v-text="it.descr"
                  style="text-align: left"
                />
              </div>
              <div
                class="fc"
                :style="hasMore ? '' : 'display:none'"
                id="loadMoreContainer"
              >
                <div class="f1" />
                <div class="fr">
                  <div class="f1" />
                  <button
                    class="btn btn-primary"
                    @click.prevent="fetchMore"
                    v-text="`Загрузить еще`"
                  />
                  <div class="f1" />
                </div>
                <div class="f1" />
              </div>
            </div>
            <div class="fr">
              <div class="f1" />
              <button
                class="btn btn-primary btnLg"
                style="min-width: 230px; margin-left: auto; margin-right: auto"
                v-t="`team.56.action`"
                @click.prevent="$router.push('/todo')"
              />
              <div class="f1" />
            </div>
            <div class="teamFindSelfInfo" v-if="!$root.user.teamId">
              <br />
              <br />
              <br />
              <Xselect
                id="myRole"
                label="team.myRole"
                :max="3"
                v-model="myRole"
                :options="options.rolesSelect"
              />
              <Xinput
                id="myContact"
                label="Твои контакты для связи с участниками"
                v-model="myContact"
              />
              <Xinput
                id="myDescr"
                label="team.myDescr"
                v-model="myDescr"
                :placeholder="$t('team.myDescrPh')"
                area="t"
                rows="6"
              />
              <br />
              <br />
              <div class="fr">
                <div class="f1" />
                <button
                  class="btn btn-primary btnLg"
                  style="width: 230px; margin-left: auto; margin-right: auto"
                  v-text="`Сохранить`"
                  @click.prevent="savePersonal"
                />
                <div class="f1" />
              </div>
            </div>
          </template>
        </div>
        <div v-if="tab === 3" class="leaveTeam">
          <h2 class="minipageHeader" v-t="`team.3.leave.head`" />
          <p
            v-if="
              ($root.team?.members || []).length < $root.settings.minTeamSize
            "
            style="color: #ff000080"
          >
            В команде недостаточно участников для квалификации
          </p>
          <p
            class="explText"
            v-for="it of this.teamMembers"
            :key="it.id"
            @click="rmFromTeam(it.id)"
          >
            {{ it.name }}
          </p>
          <div class="fr">
            <div class="f1" />
            <button
              class="btn btn-danger btnLg"
              v-t="`team.3.leave.action`"
              @click="rmFromTeam($root.user.id)"
            />
            <div class="f1" />
          </div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter style="position: relative; bottom: 0" />
  </div>
</template>

<script>
import XXsubnav from "./Subnav";
export default {
  name: "index",
  components: { XXsubnav },
  data() {
    return {
      tab: null,
      joinCode: "",
      options: {
        taskSelect: [
          { id: null, label: this.$t("g.notChosen") },
          { id: 1, label: "1" },
        ],
        rolesSelect: [
          { id: null, label: this.$t("g.notChosen") },
          ...this.memberRoles,
        ],
        rolesNeededSelect: [
          { id: null, label: this.$t("g.notChosen") },
          { id: 1, label: "1" },
        ],
      },
      taskSelect: null,
      teamName: "",
      teamDescription: "",
      teamContact: "",
      myContact: "",
      myRole: [],
      myTask: [],
      myDescr: "",
      invitesLeft: 10,
      teamFind: "",
      searchRoles: [],
      showElement: null,
      foundElements: [],
      rolesSelect: this.$root.team?.neededRoles || [],
      teamMembers: [],
      pageSize: 10,
      hadEmptyLoad: false,
      loadInProgress: false,
      observer: null,
    };
  },
  computed: {
    filteredElements() {
      return this.foundElements;
    },
    hasMore() {
      return (
        !this.loadInProgress &&
        !this.hadEmptyLoad &&
        (this.foundElements?.length || 0) % this.pageSize === 0
      );
    },
    navType() {
      if (this.$root.user.teamId) {
        return 2;
      } else {
        return 1;
      }
    },
    joinLink() {
      this.$route;
      return `${window.location.href.replace(
        /\/teams\/.*/,
        "/joinTeam?code=" + this.$root.team?.teamCode
      )}`;
    },
  },
  methods: {
    translateRole(it) {
      const role = this.options.rolesSelect.find((item) => item.id === it);
      return role.label;
    },
    setTab(mew) {
      this.foundElements = [];
      if (mew >= 4) {
        if (!this.$root.user?.profile?.essay) {
          mew = 4;
        } else {
          if (mew !== 5) {
            mew = 6;
          }
        }
      }
      this.$router.push(`/teams/${mew}`);
    },
    async fetchMore() {
      this.fetchItems(Math.ceil(this.foundElements.length / this.pageSize));
    },
    async fetchItems(pageNumber = 0) {
      this.loadInProgress = true;
      let q = `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`;
      if (this.searchRoles?.length) {
        for (let it of this.searchRoles) {
          q += `&roles=${it}`;
        }
      }
      if (this.teamFind) {
        q += `&search=${encodeURIComponent(this.teamFind)}`;
      }
      let res = [];
      if (this.tab === 6) {
        res = (await this.http.get("/users/restricted/search" + q)).map(
          (it) => {
            const item = {
              id: it.id,
              name: `${it.firstName || ""} ${it.surname || ""}`,
              badge: it.teamRoles,
              descr: it.essay || "",
              myContact: it.contacts,
            };
            if (item.name.length === 1) {
              item.name = "Неизвестный";
            }
            if (item.descr.length === 0) {
              item.descr = "Пользователь не оставил о себе описания";
            }
            return item;
          }
        );
      } else if (this.tab === 5) {
        res = (await this.http.get("/teams/search" + q)).map((it) => {
          return {
            id: it.id,
            name: it.name || "",
            badge: [],
            descr: it.description || "",
          };
        });
      }
      if (!pageNumber) {
        this.foundElements = [];
      }
      this.hadEmptyLoad = !res?.length;
      this.foundElements = [...this.foundElements, ...res];
      this.loadInProgress = false;
    },
    tabFromRoute(route) {
      const tab = route?.params?.pathMatch ? route.params.pathMatch[0] : null;
      this.foundElements = [];
      if (tab) {
        this.tab = Number(tab);
      } else {
        this.setTab(4);
        return;
      }
      this.fetchItems();
    },
    showParticipant(i) {
      this.showElement = i;
      new this.$bs.Modal(
        document.getElementById("participantDetailsModal")
      ).show();
    },
    async mkTeam() {
      await this.http.post("/teams", {
        name: this.teamName,
        description: this.teamDescription,
        teamCode: Math.random().toString(32).substr(2),
      });
      await this.$root.updateUser();
      this.setTab(3);
    },
    async joinByCode() {
      await this.http.post(
        `/teams/${this.joinCode}/addMember/${this.$root.user.id}`
      );
      await this.$root.updateTeam();
      await this.$root.updateUser();
      await this.setTab(3);
    },
    async updateTeamRoles(mew) {
      for (let it of this.rolesSelect) {
        if (!mew.includes(it)) {
          await this.http.delete_(
            `/teams/${this.$root.team.id}/neededRoles/${it}`,
            null,
            null
          );
        }
      }
      for (let it of mew) {
        if (!this.rolesSelect.includes(it)) {
          await this.http.post(
            `/teams/${this.$root.team.id}/neededRoles/${it}`,
            null,
            null
          );
        }
      }
      return this.setNewTeamRoles(mew);
    },
    setNewTeamRoles(mew) {
      this.rolesSelect = mew;
      this.$root.updateTeam();
    },
    async rmFromTeam(userId) {
      await this.http.delete_(
        `/teams/${this.$root.team.id}/removeMember/${userId}`
      );
      await this.$root.updateUser();
      if (userId === this.$root.user.id) {
        this.setTab(5);
      }
    },
    async savePersonal() {
      await this.http.put(
        `/users/${this.$root.user.id}/teamRoles`,
        this.myRole
      );
      await this.http.put(`/users/${this.$root.user.id}/profile`, {
        essay: (this.myDescr || "") + " ",
        contacts: this.myContact,
      });
      await this.$root.updateUser();
      this.setTab(5);
    },
    async fetchTeamMembers() {
      const members = [];
      const memberIds = this.$root.team?.members || [];
      let i = 0;
      for (let it of memberIds) {
        this.http.get("/users/" + it + "/restricted").then((it) => {
          let member = {};
          member.name = `${it.firstName || ""} ${it.surname || ""}`;
          if (member.name === " ") {
            member.name = "Кто-то, кто ещё не заполнил свою анкету!";
          }
          member.id = it.id;
          if (member.id === this.$root.user.id) {
            member.name += " (вы)";
          }
          members.push(member);
          ++i;
          if (i === memberIds.length) {
            this.teamMembers = members;
          }
        });
      }
    },
  },
  watch: {
    $route(mew) {
      if (mew.path.startsWith("/teams")) {
        this.tabFromRoute(mew);
      }
    },
    "$root.team": async function () {
      this.fetchTeamMembers();
    },
  },
  mounted() {
    this.tabFromRoute(this.$route);
    this.fetchTeamMembers();
    this.observer = new IntersectionObserver(
      (entries) => {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if (entries[0].isIntersecting === true && !this.loadInProgress)
          this.fetchMore();
      },
      { threshold: [0] }
    );
    this.observer.observe(document.querySelector("#loadMoreContainer"));
  },
};
</script>

<style lang="scss">
.teamBadges {
  margin-bottom: 30px;
  .bdg {
    background: #f8f8fa;
    border-radius: 2px;
    color: #8798ad;
    font-weight: 600;
    font-size: 12px;
    display: inline-block;
    margin-right: 8px;
    padding: 10px 13px;
  }
}
.root-dark {
  .teamBadges {
    .bdg {
      background: #161616;
      border-radius: 2px;
      color: #8798ad;
      font-weight: 600;
      font-size: 12px;
      display: inline-block;
      margin-right: 8px;
      padding: 10px 13px;
    }
  }
}
.teamRoot {
  .pageHeader {
    width: 100%;
    margin-bottom: 37px;
  }
  .xxSubnavRoot {
    margin-bottom: 45px;
  }
  .teamContentRoot {
    background: var(--bgclr3);
    padding: 30px 30px 40px 30px;
    box-shadow: 0px 15px 30px rgba(7, 107, 156, 0.05);
    border-radius: 2px;
    &.tab1,
    &.tab2,
    &.tab3,
    &.tab4 {
      max-width: 630px;
      margin-left: auto;
      margin-right: auto;
    }

    .minipageHeader {
      width: 100%;
      margin-bottom: 27px;
    }
    .explText {
      max-width: 430px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      color: #8798ad;
    }
    &.tab1 {
      .explText {
        margin-bottom: 30px;
      }
      .xInRoot {
        margin-bottom: 40px;
      }
    }
    &.tab2 {
      .explText {
        margin-bottom: 25px;
      }
      #teamName {
        margin-bottom: 25px;
      }
      #teamDescription {
        margin-bottom: 40px;
      }
    }
    &.tab3 {
      .explText.n1 {
        margin-bottom: 24px;
      }
      .badged.n1 {
        margin-bottom: 27px;
      }
      .badged.n2 {
        margin-top: 20px;
        margin-bottom: 22px;
      }
      .explText.n2 {
        max-width: 100%;
        margin-bottom: 40px;
      }
    }
    &.tab4 {
      .explText {
        margin-bottom: 34px;
      }
      .xInRoot,
      .xSelRoot {
        margin-bottom: 25px;
      }
    }
    &.tab5,
    &.tab6 {
      .explText {
        max-width: 1026px;
        margin-bottom: 50px !important;
      }
    }
  }
  .teamFindSubnav {
    display: flex;
    flex-direction: row;
    > :first-child {
      width: 430px;
    }
    > :nth-child(2) {
      flex-grow: 1;
      min-width: 30px;
    }
    > :nth-child(3) {
      margin-bottom: 30px;
    }
    > :last-child {
      width: 640px;
      margin-bottom: 46px;
    }
  }
  .teamFindResults {
    display: grid;
    grid-column-gap: 47px;
    grid-row-gap: 25px;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 2px;
    margin-bottom: 30px;
    .teamFindResult {
      border: 1px solid #c5cedd;
      padding: 21px 30px;
      cursor: pointer;
      &:hover {
        border: 1px solid transparent;
        box-shadow: 0px 30px 60px rgba(7, 107, 156, 0.15);
      }
      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
  }
  .leaveTeam {
    padding: 30px;
    background: var(--bgclr2);
    max-width: 630px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    h2 {
      margin-bottom: 25px !important;
    }
    p {
      width: 100%;
      cursor: pointer;
      text-align: center;
      color: #8798ad;
      margin-bottom: 20px;
      &:nth-last-child(2) {
        margin-bottom: 40px;
      }
      &:hover {
        text-decoration: line-through;
      }
    }
    button {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
.md .teamRoot {
  .xxSubnavRoot {
    margin-bottom: 40px;
  }
  .teamContentRoot {
    &.tab5,
    &.tab6 {
      .explText {
        margin-bottom: 30px !important;
      }
    }
  }
  .teamFindSubnav {
    > :nth-child(3) {
      margin-bottom: 30px;
    }
    > :last-child {
      margin-bottom: 40px;
    }
  }
  .teamFindResults {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
}
.sm .teamRoot {
  .xxSubnavRoot {
    margin-bottom: 30px;
  }
  .teamContentRoot {
    max-width: 630px;
    padding: 30px 10px 33px 10px;
    .minipageHeader {
      width: 100%;
      margin-bottom: 25px;
    }
    &.tab1 {
      .explText {
        margin-bottom: 24px;
      }
      .xInRoot {
        margin-bottom: 30px;
      }
    }
    &.tab3 {
      .explText.n1 {
        margin-bottom: 20px;
      }
      .badged.n1 {
        margin-bottom: 15px;
      }
      .badged.n2 {
        margin-top: 15px;
        margin-bottom: 20px;
      }
      .explText.n2 {
        margin-bottom: 25px;
      }
    }
    &.tab4 {
      .explText {
        margin-bottom: 25px;
      }
    }
    &.tab5,
    &.tab6 {
      .explText {
        margin-bottom: 30px !important;
      }
    }
  }
  .teamFindSubnav {
    display: flex;
    flex-direction: column;
    > :first-child {
      width: 100%;
    }
    > :nth-child(2) {
      height: 0px;
    }
    > :nth-child(3) {
      margin-bottom: 25px;
    }
    > :last-child {
      width: 100%;
      margin-bottom: 30px;
    }
  }
  .teamFindResults {
    grid-template-columns: 1fr;
  }
}
</style>
