<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <Xmodal id="details">
      <h3 style="width: 100px; transform: translate(0, -3.3rem)">Профиль</h3>
      <div
        v-if="dets"
        style="
          transform: translate(0, -2.3rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          min-width: 400px;
        "
      >
        <div v-for="[name, prop] of detsProps" :key="prop">
          <span style="font-weight: 700">{{ name }}:</span>
          &nbsp;
          <span v-if="prop !== 'resume'">{{ dets[prop] }}</span>
          <span v-else-if="prop === 'resume'"
            ><a
              v-if="!!dets.resume"
              :download="dets.resume.filename"
              :href="`/api/files/${dets.resume.id}`"
              >{{ dets.resume.filename }}</a
            ></span
          >
        </div>
      </div>
    </Xmodal>
    <div class="horizPad">
      <div />
      <div class="usersRoot pageContentRoot">
        <div class="card">
          <div class="card-body" style="overflow-x: scroll">
            <div class="fr">
              <div style="width: 300px">
                <h2 style="margin-bottom: 0.8rem">Поиск</h2>
                <div class="fr">
                  <Xinput
                    style="width: 100%"
                    placeholder="Поиск..."
                    v-model="search.text"
                    @update:modelValue="fetch()"
                  />
                  <div style="width: 1px; overflow: visible" class="fc">
                    <div class="f1" />
                    <unicon
                      name="search"
                      style="transform: translate(-40px)"
                      :fill="
                        $root.lightness === 'light' ? '#aaaaaa' : '#444444'
                      "
                    />
                    <div class="f1" />
                  </div>
                </div>
                <br />
                <div
                  class="fr"
                  style="cursor: pointer"
                  @click="rotateFilter('completedProfile')"
                >
                  <div style="width: 32px">
                    <div v-if="search.completedProfile == null">Все</div>
                    <div v-else-if="search.completedProfile === true">
                      <unicon
                        name="check"
                        height="1rem"
                        style="transform: scale(1.5)"
                      />
                    </div>
                    <div v-else-if="search.completedProfile === false">
                      <unicon
                        name="times"
                        height="1rem"
                        style="transform: scale(1.5)"
                      />
                    </div>
                  </div>
                  <div style="width: 2rem" />
                  <div>Анкета заполнена</div>
                </div>
                <br />
                <div
                  class="fr"
                  style="cursor: pointer"
                  @click="rotateFilter('confirmed')"
                >
                  <div style="width: 32px">
                    <div v-if="search.confirmed == null">Все</div>
                    <div v-else-if="search.confirmed === true">
                      <unicon
                        name="check"
                        height="1rem"
                        style="transform: scale(1.5)"
                      />
                    </div>
                    <div v-else-if="search.confirmed === false">
                      <unicon
                        name="times"
                        height="1rem"
                        style="transform: scale(1.5)"
                      />
                    </div>
                  </div>
                  <div style="width: 2rem" />
                  <div>Участие подтверждено</div>
                </div>
              </div>
              <div style="width: 1rem" />
              <div class="f1">
                <div class="fr" style="margin-bottom: 0.8rem">
                  <h2>Пользователи</h2>
                  <div class="f1" />
                  <button class="btn btn-primary" @click="uploadInvited">
                    <unicon
                      name="upload-alt"
                      fill="#fff"
                      height="18"
                      width="18"
                      style="transform: translate(0, -3px)"
                    />&nbsp;&nbsp;Загрузить приглашенных
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button class="btn btn-primary" @click="exportCsv">
                    <unicon
                      name="download-alt"
                      fill="#fff"
                      height="18"
                      width="18"
                      style="transform: translate(0, -3px)"
                    />&nbsp;&nbsp;CSV
                  </button>
                </div>
                <table
                  style="min-width: 100%"
                  class="table-bordered adminTable"
                >
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>E-mail</th>
                      <!-- <th>Возраст</th>
                      <th>ВУЗ</th>
                      <th>Город</th> -->
                      <td>Команда</td>
                      <td
                        title="Подтвердил почту / Заполнил анкету / Капитан команды / Приглашен для участия / Подтвердил участие"
                      >
                        M / F / C / I / V
                      </td>
                      <td />
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="it of users"
                      :key="it.id"
                      @click="showDetails(it)"
                      style="cursor: pointer"
                    >
                      <td>
                        {{ it.fullname }}
                      </td>
                      <td>{{ it.email }}</td>
                      <!-- <td>{{ it.age }}</td>
                      <td>{{ it.university }}</td>
                      <td>{{ it.city }}</td> -->
                      <td>{{ it.team?.name }}</td>
                      <td>
                        <XTFQ :s="it.verified" title="Подтвердил почту" />
                        &nbsp;&nbsp;&nbsp;
                        <XTFQ
                          :s="it.status?.completedProfile"
                          title="Заполнил анкету"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <XTFQ
                          :s="it.teamRoles?.includes(`LEAD`)"
                          title="Капитан команды"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <XTFQ
                          :s="it.status?.admittedToParticipation"
                          title="Приглашен для участия"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <XTFQ
                          :s="it.status?.confirmedParticipation"
                          title="Подтвердил участие"
                        />
                        &nbsp;&nbsp;&nbsp;
                      </td>
                      <td style="padding: 0 !important">
                        <button
                          class="btn btn-primary"
                          style="width: 100%"
                          v-if="!it.status.admittedToParticipation"
                          @click.stop="invite(it)"
                        >
                          Пригласить
                        </button>
                        <button
                          class="btn btn-danger"
                          style="width: 100%"
                          v-else
                          @click.stop="uninvite(it)"
                        >
                          Исключить
                        </button>
                      </td>
                    </tr>
                    <tr
                      :style="hasMore ? '' : 'display:none'"
                      id="loadMoreContainer"
                    >
                      <td colspan="5">
                        <button
                          class="btn btn-primary"
                          @click.prevent="fetchMore"
                          v-text="`Загрузить еще`"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            </div>
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
  name: "Users",
  data() {
    return {
      users: [],
      page: {
        page: 0,
        size: 20,
      },
      search: {
        text: "",
        completedProfile: null,
        confirmed: null,
      },
      hadEmptyLoad: false,
      loadInProgress: false,
      observer: null,
      dets: null,
      detsProps: [
        ["Имя", "fullname"],
        ["Email", "email"],
        ["Телефон", "phoneNumber"],
        ["Дата рождения", "birthday"],
        ["ВУЗ", "university"],
        ["Год выпуска", "graduationYear"],
        ["Специальность", "major"],
        ["О себе", "essay"],
        ["Источник информации о хакатоне", "whereDidYouFindOut"],
        ["Предпочитаемая задача", "preferredTask"],
        ["Ищет ли работу", "lookingForJob"],
        ["Почему участует", "participationReason"],
        ["Резюме", "resume"],
        ["Предпочитаемый контакт", "contacts"],
        ["Страна", "country"],
        ["Регион", "state"],
        ["Город", "city"],
        ["Место работы", "companyName"],
        ["Должность", "workPosition"],
        ["Формат занятости", "employmentForm"],
        ["Стаж", "experienceYears"],
        ["Linked in", "linkedin"],
        ["Пол", "gender"],
      ],
    };
  },
  computed: {
    hasMore() {
      return (
        !this.loadInProgress &&
        !this.hadEmptyLoad &&
        (this.users?.length || 0) % this.page.size === 0
      );
    },
  },
  methods: {
    async invite(it) {
      await this.http.post(`/users/${it.id}/admit`, "", null);
      it.status.admittedToParticipation = true;
    },
    async uninvite(it) {
      await this.http.post(`/users/${it.id}/decline`, "", null);
      it.status.admittedToParticipation = false;
      it.status.confirmedParticipation = false;
    },
    uploadInvited() {
      window.root.spawnToast("Заглушка");
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("hidden", true);
      input.addEventListener(
        "change",
        async function ({
          target: {
            files: [file],
          },
        }) {
          if (file) {
            await this.http.postForm("/admin/uploadInvitedUsers", {
              file,
            });
          }
        }
      );
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
    showDetails(it) {
      this.dets = it;
      this.$root.showModal("details");
    },
    rotateFilter(name) {
      if (this.search[name] == null) {
        this.search[name] = true;
      } else if (this.search[name]) {
        this.search[name] = false;
      } else {
        this.search[name] = null;
      }
      this.fetch();
    },
    async exportCsv() {
      const res = await this.http.get("/users/export-csv", null, (res) =>
        res.text()
      );
      const blob = new Blob([res], { type: "text/csv" });
      const a = document.createElement("a");
      a.download = "Hack_users.csv";
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/csv", a.download, a.href].join(":");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 1500);
    },
    async fetchMore() {
      this.fetch(Math.ceil(this.users.length / this.page.size));
    },
    async fetch(page = 0) {
      this.loadInProgress = true;
      const params = {
        pageNumber: page,
        pageSize: this.page.size,
      };
      if (this.search.text?.length) {
        params.search = this.search.text;
      }
      if (this.search.completedProfile != null) {
        params.completedProfile = this.search.completedProfile;
      }
      if (this.search.confirmed != null) {
        params.confirmed = this.search.confirmed;
      }
      const res = (await this.http.get("/users/search", params))?.map((it) => {
        let fullname = `${it.profile.firstName || ""} ${
          it.profile.surname || ""
        } ${it.profile.patronymic || ""}`;
        if (fullname.length <= 2) {
          fullname = "Не заполнено";
        }
        let age = null;
        return {
          ...it,
          ...it.profile,
          fullname,
          age,
        };
      });
      if (res.length === 0) {
        this.hadEmptyLoad = true;
      } else {
        this.hadEmptyLoad = false;
      }
      if (page === 0) {
        this.users = res;
      } else {
        this.users = [...this.users, ...res];
      }
      this.loadInProgress = false;
      // const needTeamFetching = this.users.filter((it) => it.teamId && !it.team);
      // const teamIds = [...new Set(needTeamFetching.map((it) => it.teamId))];
    },
  },
  async mounted() {
    await this.fetch();
    this.observer = new IntersectionObserver(
      (entries) => {
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
.adminTable {
  td,
  th {
    padding: 0.6rem 0.9rem;
  }
  //th{
  //padding-bottom:1.5rem
  //}
}
#details .modal-content {
  padding-bottom: 15px !important;
}
</style>
