<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <Xmodal id="details">
      <h3 style="width: 100px; transform: translate(0, -3.3rem)">Команда</h3>
      <table
        v-if="dets"
        style="transform: translate(0, -2.3rem); min-width: 400px"
        class="table-bordered adminTable"
      >
        <tbody>
          <tr>
            <td colspan="2">
              {{ dets.name }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span v-for="it of dets.membersFetched" :key="it.id"
                >{{ it.fullname }}&nbsp;&nbsp;</span
              >
            </td>
          </tr>
          <tr>
            <th>Трек:</th>
            <td>{{ dets.trackDto?.trackName }}</td>
          </tr>
          <template v-for="it of dets.checkpoints" :key="it.number">
            <tr>
              <th colspan="2">Чекпоинт {{ it.number }}</th>
            </tr>
            <tr>
              <th>Статус:</th>
              <td>{{ it.status }}</td>
            </tr>
            <tr>
              <th>Дальнейшие планы:</th>
              <td>{{ it.todo }}</td>
            </tr>
            <tr>
              <th>Вопросы:</th>
              <td>{{ it.questions }}</td>
            </tr>
          </template>
          <tr>
            <th colspan="2">Решение</th>
          </tr>
          <tr>
            <th>Текстовое описание:</th>
            <td>{{ dets.solutionDto?.ideaDescription }}</td>
          </tr>
          <tr>
            <th>Исходный код:</th>
            <td>{{ dets.solutionDto?.codeLink }}</td>
          </tr>
          <tr>
            <th>Презентация:</th>
            <!-- :download="dets.solutionDto?.presentation?.originalFileName"
                :href="`/api/files?file=${dets.solutionDto?.presentation?.id}`" -->
            <td>
              <!-- @click="dlFile" -->
              <a
                v-if="dets.solutionDto?.presentation?.id"
                :href="`/api/files?file=${this.dets.solutionDto?.presentation?.filename}`"
                :download="
                  this.dets.solutionDto?.presentation?.originalFileName
                "
              >
                {{ dets.solutionDto?.presentation?.originalFileName }}
              </a>
            </td>
          </tr>
          <tr>
            <th>Видео-демо:</th>
            <td>{{ dets.solutionDto?.demoLink }}</td>
          </tr>
        </tbody>
      </table>
    </Xmodal>
    <div class="horizPad">
      <div />
      <div class="teamsRoot pageContentRoot">
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
                <template v-for="it of $root.tasks" :key="'x' + it.id">
                  <br />
                  <div
                    class="fr"
                    style="cursor: pointer"
                    @click="rotateFilter(it.id)"
                  >
                    <div style="width: 32px">
                      <div v-if="!search.excludeTracks.includes(it.id)">
                        <unicon
                          name="check"
                          height="1rem"
                          style="transform: scale(1.5)"
                        />
                      </div>
                    </div>
                    <div style="width: 2rem" />
                    <div>{{ it.trackName }}</div>
                  </div>
                </template>
              </div>
              <div style="width: 1rem" />
              <div class="f1">
                <div class="fr" style="margin-bottom: 0.8rem">
                  <h2>Команды</h2>
                  <div class="f1" />
                  <!--                  <button class="btn btn-primary" @click="exportCsv">-->
                  <!--                    <unicon name="download-alt" fill="#fff" height="18" width="18" style="transform:translate(0,-3px)"/>&nbsp;&nbsp;CSV-->
                  <!--                  </button>-->
                </div>
                <table
                  style="min-width: 100%"
                  class="table-bordered adminTable"
                >
                  <thead>
                    <tr>
                      <th>Команда</th>
                      <th>Тестовое</th>
                      <th>Чекпоинты</th>
                      <th>Решение<br />През / Код / Видео</th>
                      <th>Трек</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="it of teams"
                      :key="it.id"
                      @click="showDetails(it)"
                      style="cursor: pointer"
                    >
                      <td>
                        {{ it.name }}
                      </td>
                      <td>
                        <!--                      {{ it.name }}-->
                      </td>
                      <td>
                        <template
                          v-for="checkpoint of it.checkpoints"
                          :key="'x' + it.id + 'c' + checkpoint.number"
                        >
                          <unicon
                            v-if="checkpoint.status"
                            name="check-circle"
                            fill="#00ff00"
                          />
                          <unicon v-else name="times-circle" fill="#ff0000" />
                          &nbsp;&nbsp;&nbsp;
                        </template>
                      </td>
                      <td>
                        <unicon
                          v-if="it.solutionDto?.presentation?.id"
                          name="check-circle"
                          fill="#00ff00"
                        />
                        <unicon v-else name="times-circle" fill="#ff0000" />
                        &nbsp;&nbsp;&nbsp;
                        <unicon
                          v-if="it.solutionDto?.codeLink"
                          name="check-circle"
                          fill="#00ff00"
                        />
                        <unicon v-else name="times-circle" fill="#ff0000" />
                        &nbsp;&nbsp;&nbsp;
                        <unicon
                          v-if="it.solutionDto?.demoLink"
                          name="check-circle"
                          fill="#00ff00"
                        />
                        <unicon v-else name="times-circle" fill="#ff0000" />
                      </td>
                      <td>
                        {{ it.trackDto?.trackName }}
                      </td>
                    </tr>
                    <tr
                      :style="hasMore ? '' : 'display:none'"
                      id="loadMoreContainer"
                    >
                      <td colspan="1000">
                        <button
                          class="btn btn-primary"
                          @click.prevent="fetchMore"
                          v-text="`Загрузить еще`"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      teams: [],
      page: {
        page: 0,
        size: 20,
      },
      search: {
        text: "",
        excludeTracks: [],
      },
      hadEmptyLoad: false,
      loadInProgress: false,
      observer: null,
      dets: null,
      detsProps: [["Имя", "name"]],
    };
  },
  computed: {
    hasMore() {
      return (
        !this.loadInProgress &&
        !this.hadEmptyLoad &&
        (this.teams?.length || 0) % this.page.size === 0
      );
    },
    includeTracks() {
      return this.$root.tasks
        .filter((it) => !this.search.excludeTracks.includes(it.id))
        .map((it) => it.id);
    },
  },
  methods: {
    async dlFile() {
      console.log(this.dets.solutionDto?.presentation);
      const res = await this.http.get(
        `/api/files?file=${this.dets.solutionDto?.presentation?.filename}`
      );
      console.log(res);
    },
    showDetails(it) {
      if (!it.membersFetched) {
        it.membersFetched = [];
        for (let userId of it.members) {
          this.http.get(`/users/${userId}`).then((res) => {
            res.fullname = (
              (res.profile.firstName || "") +
              " " +
              (res.profile.patronymic || "") +
              " " +
              (res.profile.surname || "")
            ).trim();
            if (!res.fullname?.length) {
              res.fullname = "Не заполнено";
            }
            it.membersFetched = [...it.membersFetched, res];
          });
        }
      }
      this.dets = it;
      this.$root.showModal("details");
    },
    rotateFilter(id) {
      if (this.search.excludeTracks.includes(id)) {
        this.search.excludeTracks = this.search.excludeTracks.filter(
          (it) => it !== id
        );
      } else {
        this.search.excludeTracks = [...this.search.excludeTracks, id];
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
      let url = "/teams/search";
      let sep = "?";
      for (let it of this.includeTracks) {
        url += sep + "trackIds=" + it;
        sep = "&";
      }
      url += sep + "pageNumber=" + this.page.page;
      sep = "&";
      url += sep + "pageSize=" + this.page.size;
      if (this.search?.text?.length) {
        url += sep + "search=" + this.page.size;
      }
      const res = (await this.http.get(url))?.map((it) => {
        return {
          ...it,
        };
      });
      if (res.length === 0) {
        this.hadEmptyLoad = true;
      } else {
        this.hadEmptyLoad = false;
      }
      if (page === 0) {
        this.teams = res;
      } else {
        this.teams = [...this.users, ...res];
      }
      this.loadInProgress = false;
    },
  },
  async mounted() {
    await this.fetch();
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
</style>
